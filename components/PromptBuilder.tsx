// PromptBuilder.tsx - Main prompt construction interface
'use client';

import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { ExamplePairsEditor } from './ExamplePairsEditor';
import { TagInput } from './TagInput';
import { FrameworkSelector } from './FrameworkSelector';
import { SuggestionPanel } from './SuggestionPanel';
import { LivePreview } from './LivePreview';
import { ModelSelector } from './ModelSelector';

import { usePromptAnalysis } from '@/hooks/usePromptAnalysis';
import { useExecutePrompt } from '@/hooks/useExecutePrompt';
import { useDebounce } from '@/hooks/useDebounce';

import type { PromptContent, PromptFramework, OutputFormat, StyleTone, PromptExample } from '@/types/prompt.types';

// Validation schema
const promptContentSchema = z.object({
  context: z.string().max(5000).nullable(),
  objective: z.string().min(10, 'Objective must be at least 10 characters').max(2000),
  constraints: z.array(z.string()),
  examples: z.array(z.object({
    id: z.string(),
    input: z.string(),
    output: z.string(),
  })).max(10),
  outputFormat: z.enum(['plain_text', 'markdown', 'json', 'xml', 'code', 'structured_list', 'custom']),
  customFormatSchema: z.string().optional(),
  style: z.array(z.enum(['professional', 'casual', 'technical', 'creative', 'academic', 'conversational', 'formal'])),
  persona: z.string().max(1000).nullable(),
  rawPrompt: z.string().nullable().optional(), // For advanced users who want raw prompt text
  parameters: z.object({
    temperature: z.number().min(0).max(2),
    maxTokens: z.number().min(1).max(128000),
    topP: z.number().min(0).max(1),
    stopSequences: z.array(z.string()),
  }),
});

type PromptFormData = z.infer<typeof promptContentSchema>;

interface PromptBuilderProps {
  initialContent?: Partial<PromptContent>;
  onSave?: (content: PromptContent) => void;
  workspaceId: string;
}

const DEFAULT_CONTENT: PromptFormData = {
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
};

const OUTPUT_FORMAT_OPTIONS: { value: OutputFormat; label: string }[] = [
  { value: 'plain_text', label: 'Plain Text' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'json', label: 'JSON' },
  { value: 'xml', label: 'XML' },
  { value: 'code', label: 'Code Block' },
  { value: 'structured_list', label: 'Structured List' },
  { value: 'custom', label: 'Custom Schema' },
];

const STYLE_OPTIONS: { value: StyleTone; label: string; description: string }[] = [
  { value: 'professional', label: 'Professional', description: 'Formal and business-appropriate' },
  { value: 'casual', label: 'Casual', description: 'Friendly and relaxed' },
  { value: 'technical', label: 'Technical', description: 'Precise with domain terminology' },
  { value: 'creative', label: 'Creative', description: 'Imaginative and expressive' },
  { value: 'academic', label: 'Academic', description: 'Scholarly with citations style' },
  { value: 'conversational', label: 'Conversational', description: 'Natural dialogue flow' },
  { value: 'formal', label: 'Formal', description: 'Strict etiquette and structure' },
];

export function PromptBuilder({ initialContent, onSave, workspaceId }: PromptBuilderProps) {
  const [activeTab, setActiveTab] = useState<'builder' | 'raw' | 'preview'>('builder');
  const [selectedModel, setSelectedModel] = useState('claude-sonnet-4-20250514');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState<PromptFramework | null>(null);

  const form = useForm<PromptFormData>({
    resolver: zodResolver(promptContentSchema),
    defaultValues: { ...DEFAULT_CONTENT, ...initialContent },
    mode: 'onChange',
  });

  const formValues = form.watch();
  const debouncedValues = useDebounce(formValues, 500);

  // Analyze prompt for suggestions
  const { analysis, isAnalyzing } = usePromptAnalysis(debouncedValues);

  // Execute prompt mutation
  const { execute, isExecuting, result } = useExecutePrompt();

  const handleFrameworkSelect = useCallback((framework: PromptFramework) => {
    setSelectedFramework(framework);
    // Pre-populate fields based on framework
    // (actual implementation would map framework fields to form)
  }, []);

  const handleTest = useCallback(async () => {
    const content = form.getValues();
    await execute({
      promptContent: content as PromptContent,
      input: {},
      model: selectedModel,
      stream: true,
    });
  }, [form, execute, selectedModel]);

  const handleSave = useCallback(() => {
    const content = form.getValues();
    onSave?.(content as PromptContent);
  }, [form, onSave]);

  const compiledPrompt = compilePromptToText(formValues);

  return (
    <div className="flex h-full gap-6">
      {/* Main Builder Panel */}
      <div className="flex-1 overflow-auto">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <div className="sticky top-0 z-10 bg-background pb-4">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="builder">Builder</TabsTrigger>
                <TabsTrigger value="raw">Raw Prompt</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-3">
                <ModelSelector value={selectedModel} onChange={setSelectedModel} />
                <Button variant="outline" onClick={handleTest} disabled={isExecuting}>
                  {isExecuting ? 'Testing...' : 'Test'}
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </div>

            <FrameworkSelector
              selected={selectedFramework}
              onSelect={handleFrameworkSelect}
            />
          </div>

          <TabsContent value="builder" className="space-y-6">
            {/* Context Field */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Context / Background
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      Provide background information the AI needs to understand the task.
                      Include user context, domain, and prior knowledge assumptions.
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="context"
                  control={form.control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      value={field.value || ''}
                      placeholder="e.g., You are assisting a senior software engineer who is migrating a legacy Java application to TypeScript..."
                      className="min-h-[100px]"
                    />
                  )}
                />
              </CardContent>
            </Card>

            {/* Objective Field */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Objective / Task
                  <Badge variant="destructive">Required</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="objective"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div>
                      <Textarea
                        {...field}
                        placeholder="What should the AI accomplish? Be specific about the desired outcome..."
                        className="min-h-[120px]"
                      />
                      {fieldState.error && (
                        <p className="text-sm text-destructive mt-1">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />
              </CardContent>
            </Card>

            {/* Constraints */}
            <Card>
              <CardHeader>
                <CardTitle>Constraints & Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="constraints"
                  control={form.control}
                  render={({ field }) => (
                    <TagInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Add constraint and press Enter..."
                      suggestions={['max 500 words', 'use bullet points', 'avoid jargon', 'include examples']}
                    />
                  )}
                />
              </CardContent>
            </Card>

            {/* Examples (Few-shot) */}
            <Card>
              <CardHeader>
                <CardTitle>Examples (Few-shot Learning)</CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="examples"
                  control={form.control}
                  render={({ field }) => (
                    <ExamplePairsEditor
                      examples={field.value}
                      onChange={field.onChange}
                      maxExamples={10}
                    />
                  )}
                />
              </CardContent>
            </Card>

            {/* Output Format */}
            <Card>
              <CardHeader>
                <CardTitle>Expected Output Format</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Controller
                  name="outputFormat"
                  control={form.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        {OUTPUT_FORMAT_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                {formValues.outputFormat === 'custom' && (
                  <Controller
                    name="customFormatSchema"
                    control={form.control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Define your custom output schema..."
                        className="font-mono text-sm"
                      />
                    )}
                  />
                )}
              </CardContent>
            </Card>

            {/* Style & Tone */}
            <Card>
              <CardHeader>
                <CardTitle>Style & Tone</CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="style"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-2">
                      {STYLE_OPTIONS.map((opt) => (
                        <Tooltip key={opt.value}>
                          <TooltipTrigger asChild>
                            <Badge
                              variant={field.value.includes(opt.value) ? 'default' : 'outline'}
                              className="cursor-pointer"
                              onClick={() => {
                                const newValue = field.value.includes(opt.value)
                                  ? field.value.filter((v) => v !== opt.value)
                                  : [...field.value, opt.value];
                                field.onChange(newValue);
                              }}
                            >
                              {opt.label}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>{opt.description}</TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  )}
                />
              </CardContent>
            </Card>

            {/* Persona */}
            <Card>
              <CardHeader>
                <CardTitle>AI Persona / Role</CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="persona"
                  control={form.control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      value={field.value || ''}
                      placeholder="e.g., You are a senior TypeScript developer with 10 years of experience..."
                    />
                  )}
                />
              </CardContent>
            </Card>

            {/* Advanced Options */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Advanced Options</CardTitle>
                  <Switch checked={showAdvanced} onCheckedChange={setShowAdvanced} />
                </div>
              </CardHeader>
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <CardContent className="space-y-6">
                      {/* Temperature */}
                      <div>
                        <label className="text-sm font-medium">
                          Temperature: {formValues.parameters.temperature}
                        </label>
                        <Controller
                          name="parameters.temperature"
                          control={form.control}
                          render={({ field }) => (
                            <Slider
                              value={[field.value]}
                              onValueChange={([v]) => field.onChange(v)}
                              min={0}
                              max={2}
                              step={0.1}
                              className="mt-2"
                            />
                          )}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Lower = more focused, Higher = more creative
                        </p>
                      </div>

                      {/* Max Tokens */}
                      <div>
                        <label className="text-sm font-medium">Max Tokens</label>
                        <Controller
                          name="parameters.maxTokens"
                          control={form.control}
                          render={({ field }) => (
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                              className="mt-2"
                            />
                          )}
                        />
                      </div>

                      {/* Stop Sequences */}
                      <div>
                        <label className="text-sm font-medium">Stop Sequences</label>
                        <Controller
                          name="parameters.stopSequences"
                          control={form.control}
                          render={({ field }) => (
                            <TagInput
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Add stop sequence..."
                            />
                          )}
                        />
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </TabsContent>

          <TabsContent value="raw">
            <Card>
              <CardContent className="pt-6">
                <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm font-mono whitespace-pre-wrap">
                  {compiledPrompt}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <LivePreview
              promptContent={formValues as PromptContent}
              model={selectedModel}
              result={result}
              isExecuting={isExecuting}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Suggestion Panel (Right Sidebar) */}
      <aside className="w-80 shrink-0 border-l pl-6">
        <SuggestionPanel
          analysis={analysis}
          isAnalyzing={isAnalyzing}
          onApplySuggestion={(suggestion) => {
            if (suggestion.autoFix) {
              Object.entries(suggestion.autoFix).forEach(([key, value]) => {
                form.setValue(key as keyof PromptFormData, value);
              });
            }
          }}
        />
      </aside>
    </div>
  );
}

// Helper function to compile form data into raw prompt text
function compilePromptToText(content: PromptFormData): string {
  const parts: string[] = [];

  if (content.persona) {
    parts.push(`# Role\n${content.persona}`);
  }

  if (content.context) {
    parts.push(`# Context\n${content.context}`);
  }

  parts.push(`# Task\n${content.objective}`);

  if (content.constraints.length > 0) {
    parts.push(`# Constraints\n${content.constraints.map((c) => `- ${c}`).join('\n')}`);
  }

  if (content.examples.length > 0) {
    const examplesText = content.examples
      .map((ex, i) => `Example ${i + 1}:\nInput: ${ex.input}\nOutput: ${ex.output}`)
      .join('\n\n');
    parts.push(`# Examples\n${examplesText}`);
  }

  if (content.style.length > 0) {
    parts.push(`# Style\nRespond in a ${content.style.join(', ')} tone.`);
  }

  const formatMap: Record<OutputFormat, string> = {
    plain_text: 'plain text',
    markdown: 'markdown format',
    json: 'valid JSON',
    xml: 'XML format',
    code: 'code blocks with appropriate language tags',
    structured_list: 'a structured list',
    custom: content.customFormatSchema || 'the specified format',
  };

  parts.push(`# Output Format\nProvide your response in ${formatMap[content.outputFormat]}.`);

  return parts.join('\n\n');
}

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}
