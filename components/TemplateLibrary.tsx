// TemplateLibrary.tsx - Browse, search, add, and manage prompt templates
// Hammy Design System: Turquoise, Neumorphism, Dark Mode

'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Filter, Grid, List, Star,
  Copy, Trash2, Edit3, FolderPlus, MoreVertical,
  Code, PenTool, BarChart2, Briefcase, GraduationCap,
  Zap, Cpu, Heart, ChevronRight, X
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { CATEGORIES, PROMPT_LIBRARY, type Category, type PromptTemplate } from '@/data/prompt-library';
import { usePromptLibrary } from '@/hooks/usePromptLibrary';
import { useToast } from '@/hooks/useToast';

// Icon mapping for categories
const CATEGORY_ICONS: Record<string, typeof Code> = {
  coding: Code,
  writing: PenTool,
  analysis: BarChart2,
  business: Briefcase,
  education: GraduationCap,
  productivity: Zap,
  agents: Cpu,
  personal: Heart,
};

// Category colors for the Hammy design system
const CATEGORY_COLORS: Record<string, string> = {
  coding: 'from-turquoise-500/20 to-turquoise-600/10 border-turquoise-500/30',
  writing: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
  analysis: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
  business: 'from-orange-500/20 to-orange-600/10 border-orange-500/30',
  education: 'from-green-500/20 to-green-600/10 border-green-500/30',
  productivity: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30',
  agents: 'from-pink-500/20 to-pink-600/10 border-pink-500/30',
  personal: 'from-red-500/20 to-red-600/10 border-red-500/30',
};

interface TemplateLibraryProps {
  workspaceId: string;
  onSelectTemplate: (template: PromptTemplate) => void;
  onForkTemplate: (template: PromptTemplate) => void;
}

export function TemplateLibrary({ workspaceId, onSelectTemplate, onForkTemplate }: TemplateLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'popular' | 'recent'>('popular');

  const { toast } = useToast();
  const {
    templates,
    customCategories,
    addTemplate,
    deleteTemplate,
    addCategory,
    deleteCategory,
    isLoading
  } = usePromptLibrary(workspaceId);

  // Combine built-in and custom categories
  const allCategories = useMemo(() => [
    ...CATEGORIES,
    ...customCategories,
  ], [customCategories]);

  // Combine built-in and custom templates
  const allTemplates = useMemo(() => [
    ...PROMPT_LIBRARY,
    ...templates,
  ], [templates]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    let result = allTemplates;

    // Filter by category
    if (selectedCategory) {
      result = result.filter((t) => t.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.includes(query))
      );
    }

    // Sort
    switch (sortBy) {
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'popular':
        // In real app, sort by usage count
        break;
      case 'recent':
        // In real app, sort by created date
        break;
    }

    return result;
  }, [allTemplates, selectedCategory, searchQuery, sortBy]);

  const handleDeleteTemplate = useCallback(async (templateId: string) => {
    try {
      await deleteTemplate(templateId);
      toast({ title: 'Template deleted', variant: 'success' });
    } catch (error) {
      toast({ title: 'Failed to delete template', variant: 'error' });
    }
  }, [deleteTemplate, toast]);

  const handleCopyTemplate = useCallback((template: PromptTemplate) => {
    navigator.clipboard.writeText(JSON.stringify(template.content, null, 2));
    toast({ title: 'Template copied to clipboard', variant: 'success' });
  }, [toast]);

  return (
    <div className="h-full flex flex-col bg-surface dark:bg-surface">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Prompt Library</h1>
            <p className="text-gray-400 mt-1">Browse and manage prompt templates</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowCategoryDialog(true)}
              variant="outline"
              className="neu-button border-turquoise-500/30 text-turquoise-400 hover:bg-turquoise-500/10"
            >
              <FolderPlus className="w-4 h-4 mr-2" />
              New Category
            </Button>
            <Button
              onClick={() => setShowAddDialog(true)}
              className="bg-gradient-turquoise text-white shadow-glow-turquoise hover:shadow-glow-turquoise-lg transition-shadow"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="pl-10 neu-input bg-surface-sunken border-none text-white placeholder:text-gray-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
            <SelectTrigger className="w-40 neu-button bg-surface-elevated border-none text-gray-300">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-surface-elevated border-white/10">
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="recent">Recently Added</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1 p-1 rounded-lg bg-surface-sunken">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'grid'
                  ? 'bg-turquoise-500/20 text-turquoise-400'
                  : 'text-gray-500 hover:text-gray-300'
              )}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'list'
                  ? 'bg-turquoise-500/20 text-turquoise-400'
                  : 'text-gray-500 hover:text-gray-300'
              )}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Categories Sidebar */}
        <aside className="w-64 border-r border-white/5 p-4 overflow-y-auto">
          <div className="space-y-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-neu-sm text-left transition-all',
                selectedCategory === null
                  ? 'bg-turquoise-500/20 text-turquoise-400 shadow-neu-pressed'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              )}
            >
              <Filter className="w-5 h-5" />
              <span>All Templates</span>
              <span className="ml-auto text-sm opacity-60">{allTemplates.length}</span>
            </button>

            <div className="h-px bg-white/10 my-4" />

            {allCategories.map((category) => {
              const Icon = CATEGORY_ICONS[category.id] || FolderPlus;
              const count = allTemplates.filter((t) => t.category === category.id).length;
              const isCustom = !CATEGORIES.find((c) => c.id === category.id);

              return (
                <div key={category.id} className="group relative">
                  <button
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-neu-sm text-left transition-all',
                      selectedCategory === category.id
                        ? 'bg-turquoise-500/20 text-turquoise-400 shadow-neu-pressed'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="truncate">{category.name}</span>
                    <span className="ml-auto text-sm opacity-60">{count}</span>
                  </button>

                  {isCustom && (
                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Templates Grid/List */}
        <main className="flex-1 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            {filteredTemplates.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full text-gray-500"
              >
                <Search className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-lg">No templates found</p>
                <p className="text-sm mt-1">Try adjusting your search or filters</p>
              </motion.div>
            ) : viewMode === 'grid' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filteredTemplates.map((template, index) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    index={index}
                    onSelect={() => onSelectTemplate(template)}
                    onFork={() => onForkTemplate(template)}
                    onCopy={() => handleCopyTemplate(template)}
                    onDelete={() => handleDeleteTemplate(template.id)}
                    isCustom={!PROMPT_LIBRARY.find((t) => t.id === template.id)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {filteredTemplates.map((template, index) => (
                  <TemplateListItem
                    key={template.id}
                    template={template}
                    index={index}
                    onSelect={() => onSelectTemplate(template)}
                    onFork={() => onForkTemplate(template)}
                    onCopy={() => handleCopyTemplate(template)}
                    onDelete={() => handleDeleteTemplate(template.id)}
                    isCustom={!PROMPT_LIBRARY.find((t) => t.id === template.id)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Add Template Dialog */}
      <AddTemplateDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        categories={allCategories}
        onAdd={addTemplate}
      />

      {/* Add Category Dialog */}
      <AddCategoryDialog
        open={showCategoryDialog}
        onOpenChange={setShowCategoryDialog}
        onAdd={addCategory}
      />
    </div>
  );
}

// ============================================
// Template Card Component (Grid View)
// ============================================

interface TemplateCardProps {
  template: PromptTemplate;
  index: number;
  onSelect: () => void;
  onFork: () => void;
  onCopy: () => void;
  onDelete: () => void;
  isCustom: boolean;
}

function TemplateCard({ template, index, onSelect, onFork, onCopy, onDelete, isCustom }: TemplateCardProps) {
  const Icon = CATEGORY_ICONS[template.category] || Code;
  const colorClass = CATEGORY_COLORS[template.category] || CATEGORY_COLORS.coding;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        'group relative neu-card p-5 cursor-pointer transition-all hover:shadow-neu-hover',
        'bg-gradient-to-br border',
        colorClass
      )}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          'p-2.5 rounded-lg bg-surface-elevated/80',
          template.category === 'coding' && 'text-turquoise-400',
          template.category === 'writing' && 'text-purple-400',
          template.category === 'analysis' && 'text-blue-400',
          template.category === 'business' && 'text-orange-400',
          template.category === 'education' && 'text-green-400',
          template.category === 'productivity' && 'text-yellow-400',
          template.category === 'agents' && 'text-pink-400',
          template.category === 'personal' && 'text-red-400',
        )}>
          <Icon className="w-5 h-5" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 text-gray-500 hover:text-white hover:bg-white/10 transition-all">
              <MoreVertical className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-surface-elevated border-white/10">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onFork(); }}>
              <Copy className="w-4 h-4 mr-2" />
              Fork Template
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onCopy(); }}>
              <Copy className="w-4 h-4 mr-2" />
              Copy JSON
            </DropdownMenuItem>
            {isCustom && (
              <>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  onClick={(e) => { e.stopPropagation(); onDelete(); }}
                  className="text-red-400 focus:text-red-400"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Title & Description */}
      <h3 className="font-semibold text-white mb-2 group-hover:text-turquoise-400 transition-colors">
        {template.name}
      </h3>
      <p className="text-sm text-gray-400 line-clamp-2 mb-4">
        {template.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {template.tags.slice(0, 3).map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-white/5 text-gray-400 text-xs border-none"
          >
            {tag}
          </Badge>
        ))}
        {template.tags.length > 3 && (
          <Badge variant="secondary" className="bg-white/5 text-gray-400 text-xs border-none">
            +{template.tags.length - 3}
          </Badge>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="capitalize">{template.difficulty}</span>
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-yellow-500" />
          <span>4.8</span>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-neu opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-glow" />
    </motion.div>
  );
}

// ============================================
// Template List Item Component (List View)
// ============================================

interface TemplateListItemProps {
  template: PromptTemplate;
  index: number;
  onSelect: () => void;
  onFork: () => void;
  onCopy: () => void;
  onDelete: () => void;
  isCustom: boolean;
}

function TemplateListItem({ template, index, onSelect, onFork, onCopy, onDelete, isCustom }: TemplateListItemProps) {
  const Icon = CATEGORY_ICONS[template.category] || Code;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group flex items-center gap-4 p-4 neu-card hover:shadow-neu-hover cursor-pointer transition-all"
      onClick={onSelect}
    >
      <div className="p-2.5 rounded-lg bg-turquoise-500/10 text-turquoise-400">
        <Icon className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-white group-hover:text-turquoise-400 transition-colors">
          {template.name}
        </h3>
        <p className="text-sm text-gray-500 truncate">{template.description}</p>
      </div>

      <div className="flex items-center gap-2">
        {template.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} variant="secondary" className="bg-white/5 text-gray-400 text-xs border-none">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center gap-1 text-sm text-gray-500">
        <Star className="w-4 h-4 text-yellow-500" />
        4.8
      </div>

      <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-turquoise-400 transition-colors" />
    </motion.div>
  );
}

// ============================================
// Add Template Dialog
// ============================================

interface AddTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  onAdd: (template: Omit<PromptTemplate, 'id'>) => Promise<void>;
}

function AddTemplateDialog({ open, onOpenChange, categories, onAdd }: AddTemplateDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name || !category) return;

    setIsSubmitting(true);
    try {
      await onAdd({
        name,
        description,
        category,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        difficulty: 'beginner',
        useCases: [],
        modelCompatibility: ['claude-sonnet-4-20250514', 'gpt-4o'],
        content: {
          context: null,
          objective: '',
          constraints: [],
          examples: [],
          outputFormat: 'markdown',
          style: ['professional'],
          persona: null,
          rawPrompt: null,
          parameters: {
            temperature: 0.7,
            maxTokens: 2048,
            topP: 1,
            stopSequences: [],
          },
        },
      });
      onOpenChange(false);
      // Reset form
      setName('');
      setDescription('');
      setCategory('');
      setTags('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-surface-elevated border-white/10 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Template</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium text-gray-300">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Custom Template"
              className="mt-1.5 neu-input bg-surface-sunken border-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does this template do?"
              className="mt-1.5 neu-input bg-surface-sunken border-none min-h-[80px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1.5 neu-input bg-surface-sunken border-none">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-surface-elevated border-white/10">
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300">Tags (comma-separated)</label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="react, typescript, frontend"
              className="mt-1.5 neu-input bg-surface-sunken border-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!name || !category || isSubmitting}
              className="bg-gradient-turquoise text-white"
            >
              {isSubmitting ? 'Creating...' : 'Create Template'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ============================================
// Add Category Dialog
// ============================================

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (category: Omit<Category, 'subcategories'>) => Promise<void>;
}

function AddCategoryDialog({ open, onOpenChange, onAdd }: AddCategoryDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('folder');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name) return;

    setIsSubmitting(true);
    try {
      await onAdd({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        description,
        icon,
        color: 'turquoise',
      });
      onOpenChange(false);
      setName('');
      setDescription('');
      setIcon('folder');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-surface-elevated border-white/10 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Category</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium text-gray-300">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Category"
              className="mt-1.5 neu-input bg-surface-sunken border-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What prompts belong in this category?"
              className="mt-1.5 neu-input bg-surface-sunken border-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!name || isSubmitting}
              className="bg-gradient-turquoise text-white"
            >
              {isSubmitting ? 'Creating...' : 'Create Category'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
