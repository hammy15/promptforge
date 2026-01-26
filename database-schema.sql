-- PromptForge Database Schema
-- PostgreSQL with Neon Serverless

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    avatar_url TEXT,
    tier VARCHAR(50) DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'team', 'enterprise')),
    api_keys_encrypted TEXT,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);

-- Workspaces table
CREATE TABLE workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_workspaces_slug ON workspaces(slug);
CREATE INDEX idx_workspaces_owner ON workspaces(owner_id);

-- Workspace members junction table
CREATE TABLE workspace_members (
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('owner', 'editor', 'tester', 'viewer')),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (workspace_id, user_id)
);

CREATE INDEX idx_workspace_members_user ON workspace_members(user_id);

-- Template categories
CREATE TABLE template_categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    sort_order INTEGER DEFAULT 0
);

-- Seed default categories
INSERT INTO template_categories (id, name, description, icon, sort_order) VALUES
    ('coding', 'Code Generation & Review', 'Prompts for writing, reviewing, and debugging code', 'code', 1),
    ('writing', 'Content & Creative Writing', 'Prompts for articles, stories, and creative content', 'pen', 2),
    ('analysis', 'Data Analysis & Research', 'Prompts for analyzing data and conducting research', 'chart', 3),
    ('business', 'Business & Marketing', 'Prompts for business documents and marketing', 'briefcase', 4),
    ('education', 'Education & Learning', 'Prompts for teaching and learning materials', 'book', 5),
    ('automation', 'Workflow Automation', 'Prompts for automating repetitive tasks', 'zap', 6),
    ('agents', 'AI Agents & Chains', 'Complex multi-step prompts and agent systems', 'bot', 7);

-- Prompts table
CREATE TABLE prompts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    content JSONB NOT NULL,
    framework VARCHAR(50),
    tags TEXT[] DEFAULT '{}',
    is_template BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT FALSE,
    parent_template_id UUID REFERENCES prompts(id) ON DELETE SET NULL,
    current_version INTEGER DEFAULT 1,
    performance_score DECIMAL(3,2),
    usage_count INTEGER DEFAULT 0,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_prompts_workspace ON prompts(workspace_id);
CREATE INDEX idx_prompts_author ON prompts(author_id);
CREATE INDEX idx_prompts_template ON prompts(is_template) WHERE is_template = TRUE;
CREATE INDEX idx_prompts_public ON prompts(is_public) WHERE is_public = TRUE;
CREATE INDEX idx_prompts_tags ON prompts USING GIN(tags);

-- Full-text search index
CREATE INDEX idx_prompts_search ON prompts USING GIN(
    to_tsvector('english', COALESCE(name, '') || ' ' || COALESCE(description, ''))
);

-- Prompt versions table
CREATE TABLE prompt_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    content JSONB NOT NULL,
    change_summary TEXT,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    performance_snapshot JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(prompt_id, version_number)
);

CREATE INDEX idx_prompt_versions_prompt ON prompt_versions(prompt_id);

-- Experiments table
CREATE TABLE experiments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'running', 'completed', 'archived')),
    variants JSONB NOT NULL DEFAULT '[]',
    test_inputs JSONB DEFAULT '[]',
    evaluation_criteria JSONB DEFAULT '{}',
    results JSONB,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_experiments_workspace ON experiments(workspace_id);
CREATE INDEX idx_experiments_status ON experiments(status);
CREATE INDEX idx_experiments_author ON experiments(author_id);

-- Experiment runs table
CREATE TABLE experiment_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id UUID REFERENCES experiments(id) ON DELETE CASCADE,
    variant_id UUID NOT NULL,
    input JSONB NOT NULL,
    output TEXT,
    model VARCHAR(100) NOT NULL,
    latency_ms INTEGER,
    token_usage JSONB,
    manual_rating JSONB,
    automated_scores JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_experiment_runs_experiment ON experiment_runs(experiment_id);
CREATE INDEX idx_experiment_runs_variant ON experiment_runs(variant_id);
CREATE INDEX idx_experiment_runs_created ON experiment_runs(created_at);

-- Prompt executions table (partitioned by month for performance)
CREATE TABLE prompt_executions (
    id UUID DEFAULT gen_random_uuid(),
    prompt_id UUID REFERENCES prompts(id) ON DELETE SET NULL,
    prompt_version INTEGER,
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    model VARCHAR(100) NOT NULL,
    input JSONB,
    output TEXT,
    latency_ms INTEGER,
    input_tokens INTEGER,
    output_tokens INTEGER,
    cost_usd DECIMAL(10,6),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Create partitions for next 12 months
CREATE TABLE prompt_executions_2026_01 PARTITION OF prompt_executions
    FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
CREATE TABLE prompt_executions_2026_02 PARTITION OF prompt_executions
    FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
-- ... continue for remaining months

CREATE INDEX idx_executions_prompt ON prompt_executions(prompt_id);
CREATE INDEX idx_executions_workspace ON prompt_executions(workspace_id);
CREATE INDEX idx_executions_user ON prompt_executions(user_id);
CREATE INDEX idx_executions_model ON prompt_executions(model);

-- Style presets table
CREATE TABLE style_presets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    config JSONB NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_style_presets_workspace ON style_presets(workspace_id);

-- API keys table
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    key_hash VARCHAR(255) NOT NULL,
    key_prefix VARCHAR(10) NOT NULL,
    scopes TEXT[] DEFAULT '{}',
    last_used_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_api_keys_user ON api_keys(user_id);
CREATE INDEX idx_api_keys_hash ON api_keys(key_hash);

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workspaces_updated_at BEFORE UPDATE ON workspaces
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_prompts_updated_at BEFORE UPDATE ON prompts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experiments_updated_at BEFORE UPDATE ON experiments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_style_presets_updated_at BEFORE UPDATE ON style_presets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security policies
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_executions ENABLE ROW LEVEL SECURITY;

-- Prompt access policy (workspace members can access)
CREATE POLICY prompts_workspace_access ON prompts
    FOR ALL
    USING (
        workspace_id IN (
            SELECT workspace_id FROM workspace_members WHERE user_id = current_setting('app.current_user_id')::UUID
        )
        OR is_public = TRUE
    );

-- Useful views
CREATE VIEW prompt_stats AS
SELECT
    p.id,
    p.name,
    p.workspace_id,
    COUNT(pe.id) as total_executions,
    AVG(pe.latency_ms) as avg_latency_ms,
    AVG(pe.rating) as avg_rating,
    SUM(pe.cost_usd) as total_cost,
    SUM(pe.input_tokens + pe.output_tokens) as total_tokens
FROM prompts p
LEFT JOIN prompt_executions pe ON p.id = pe.prompt_id
GROUP BY p.id, p.name, p.workspace_id;
