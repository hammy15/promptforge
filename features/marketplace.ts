// marketplace.ts - Prompt marketplace for sharing and discovering prompts
// Browse, purchase, publish, and rate prompts

// ============================================
// Types
// ============================================

export interface MarketplacePrompt {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: MarketplaceCategory;
  tags: string[];
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  price: number; // 0 for free
  currency: 'USD';
  rating: number; // 0-5
  reviewCount: number;
  downloadCount: number;
  previewImage?: string;
  screenshots: string[];
  features: string[];
  requirements?: string[];
  supportedModels: string[];
  version: string;
  lastUpdated: string;
  createdAt: string;
  status: 'published' | 'draft' | 'under_review' | 'rejected';
  verified: boolean;
  featured: boolean;
}

export type MarketplaceCategory =
  | 'writing'
  | 'coding'
  | 'marketing'
  | 'data'
  | 'customer-service'
  | 'education'
  | 'creative'
  | 'business'
  | 'productivity'
  | 'other';

export interface Review {
  id: string;
  promptId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  createdAt: string;
  verified: boolean;
  response?: {
    content: string;
    createdAt: string;
  };
}

export interface Purchase {
  id: string;
  userId: string;
  promptId: string;
  price: number;
  currency: string;
  createdAt: string;
  downloadedAt?: string;
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio: string;
  website?: string;
  twitter?: string;
  github?: string;
  totalPrompts: number;
  totalDownloads: number;
  avgRating: number;
  joinedAt: string;
  verified: boolean;
}

// ============================================
// Category Definitions
// ============================================

export const MARKETPLACE_CATEGORIES: {
  id: MarketplaceCategory;
  name: string;
  description: string;
  icon: string;
}[] = [
  { id: 'writing', name: 'Writing', description: 'Content creation and copywriting', icon: 'pen-tool' },
  { id: 'coding', name: 'Coding', description: 'Programming and development', icon: 'code' },
  { id: 'marketing', name: 'Marketing', description: 'Marketing and advertising', icon: 'megaphone' },
  { id: 'data', name: 'Data', description: 'Data analysis and processing', icon: 'bar-chart' },
  { id: 'customer-service', name: 'Customer Service', description: 'Support and communication', icon: 'headphones' },
  { id: 'education', name: 'Education', description: 'Learning and teaching', icon: 'book-open' },
  { id: 'creative', name: 'Creative', description: 'Art and creative projects', icon: 'palette' },
  { id: 'business', name: 'Business', description: 'Business operations', icon: 'briefcase' },
  { id: 'productivity', name: 'Productivity', description: 'Task management and efficiency', icon: 'zap' },
  { id: 'other', name: 'Other', description: 'Miscellaneous prompts', icon: 'grid' },
];

// ============================================
// Search and Discovery
// ============================================

export interface SearchFilters {
  query?: string;
  category?: MarketplaceCategory;
  tags?: string[];
  priceRange?: { min: number; max: number };
  minRating?: number;
  author?: string;
  sortBy?: 'popular' | 'newest' | 'rating' | 'price_low' | 'price_high';
  verified?: boolean;
  featured?: boolean;
}

export interface SearchResult {
  prompts: MarketplacePrompt[];
  total: number;
  page: number;
  pageSize: number;
  facets: {
    categories: { id: string; count: number }[];
    tags: { tag: string; count: number }[];
    priceRanges: { range: string; count: number }[];
  };
}

/**
 * Search marketplace prompts
 */
export function searchMarketplace(
  prompts: MarketplacePrompt[],
  filters: SearchFilters,
  page: number = 1,
  pageSize: number = 20
): SearchResult {
  let filtered = prompts.filter((p) => p.status === 'published');

  // Apply filters
  if (filters.query) {
    const query = filters.query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  if (filters.category) {
    filtered = filtered.filter((p) => p.category === filters.category);
  }

  if (filters.tags?.length) {
    filtered = filtered.filter((p) =>
      filters.tags!.some((t) => p.tags.includes(t))
    );
  }

  if (filters.priceRange) {
    filtered = filtered.filter(
      (p) => p.price >= filters.priceRange!.min && p.price <= filters.priceRange!.max
    );
  }

  if (filters.minRating) {
    filtered = filtered.filter((p) => p.rating >= filters.minRating!);
  }

  if (filters.author) {
    filtered = filtered.filter((p) => p.authorId === filters.author);
  }

  if (filters.verified) {
    filtered = filtered.filter((p) => p.verified);
  }

  if (filters.featured) {
    filtered = filtered.filter((p) => p.featured);
  }

  // Sort
  switch (filters.sortBy) {
    case 'popular':
      filtered.sort((a, b) => b.downloadCount - a.downloadCount);
      break;
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'price_low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price_high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    default:
      filtered.sort((a, b) => b.downloadCount - a.downloadCount);
  }

  // Calculate facets
  const facets = calculateFacets(prompts);

  // Paginate
  const start = (page - 1) * pageSize;
  const paginatedPrompts = filtered.slice(start, start + pageSize);

  return {
    prompts: paginatedPrompts,
    total: filtered.length,
    page,
    pageSize,
    facets,
  };
}

function calculateFacets(prompts: MarketplacePrompt[]): SearchResult['facets'] {
  const categoryCounts = new Map<string, number>();
  const tagCounts = new Map<string, number>();
  const priceRangeCounts = { free: 0, under_10: 0, under_50: 0, over_50: 0 };

  for (const prompt of prompts) {
    // Categories
    categoryCounts.set(prompt.category, (categoryCounts.get(prompt.category) || 0) + 1);

    // Tags
    for (const tag of prompt.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    }

    // Price ranges
    if (prompt.price === 0) priceRangeCounts.free++;
    else if (prompt.price < 10) priceRangeCounts.under_10++;
    else if (prompt.price < 50) priceRangeCounts.under_50++;
    else priceRangeCounts.over_50++;
  }

  return {
    categories: Array.from(categoryCounts.entries())
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count),
    tags: Array.from(tagCounts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20),
    priceRanges: [
      { range: 'Free', count: priceRangeCounts.free },
      { range: 'Under $10', count: priceRangeCounts.under_10 },
      { range: '$10 - $50', count: priceRangeCounts.under_50 },
      { range: 'Over $50', count: priceRangeCounts.over_50 },
    ],
  };
}

// ============================================
// Publishing
// ============================================

export interface PublishRequest {
  name: string;
  description: string;
  longDescription: string;
  category: MarketplaceCategory;
  tags: string[];
  price: number;
  promptContent: {
    systemPrompt: string;
    userPrompt: string;
    variables: string[];
    model: string;
    temperature?: number;
    maxTokens?: number;
  };
  previewImage?: string;
  screenshots: string[];
  features: string[];
  requirements?: string[];
  supportedModels: string[];
}

/**
 * Create a marketplace listing
 */
export function createListing(
  request: PublishRequest,
  authorId: string,
  authorName: string
): MarketplacePrompt {
  return {
    id: `mp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: request.name,
    description: request.description,
    longDescription: request.longDescription,
    category: request.category,
    tags: request.tags,
    authorId,
    authorName,
    price: request.price,
    currency: 'USD',
    rating: 0,
    reviewCount: 0,
    downloadCount: 0,
    previewImage: request.previewImage,
    screenshots: request.screenshots,
    features: request.features,
    requirements: request.requirements,
    supportedModels: request.supportedModels,
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    status: request.price > 0 ? 'under_review' : 'published',
    verified: false,
    featured: false,
  };
}

/**
 * Validate listing before publish
 */
export function validateListing(
  request: PublishRequest
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!request.name || request.name.length < 3) {
    errors.push('Name must be at least 3 characters');
  }

  if (!request.description || request.description.length < 20) {
    errors.push('Description must be at least 20 characters');
  }

  if (!request.longDescription || request.longDescription.length < 100) {
    errors.push('Long description must be at least 100 characters');
  }

  if (!request.category) {
    errors.push('Category is required');
  }

  if (!request.tags.length) {
    errors.push('At least one tag is required');
  }

  if (request.price < 0) {
    errors.push('Price cannot be negative');
  }

  if (!request.promptContent.systemPrompt && !request.promptContent.userPrompt) {
    errors.push('Prompt content is required');
  }

  if (!request.supportedModels.length) {
    errors.push('At least one supported model is required');
  }

  return { valid: errors.length === 0, errors };
}

// ============================================
// Reviews
// ============================================

/**
 * Submit a review
 */
export function createReview(
  promptId: string,
  userId: string,
  userName: string,
  rating: number,
  title: string,
  content: string
): Review {
  return {
    id: `review_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    promptId,
    userId,
    userName,
    rating: Math.max(1, Math.min(5, rating)),
    title,
    content,
    helpful: 0,
    createdAt: new Date().toISOString(),
    verified: false, // Set to true if user has purchased
  };
}

/**
 * Calculate average rating from reviews
 */
export function calculateRating(reviews: Review[]): { rating: number; count: number } {
  if (reviews.length === 0) {
    return { rating: 0, count: 0 };
  }

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    rating: Math.round((sum / reviews.length) * 10) / 10,
    count: reviews.length,
  };
}

/**
 * Get rating distribution
 */
export function getRatingDistribution(reviews: Review[]): Record<number, number> {
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  for (const review of reviews) {
    distribution[Math.round(review.rating)]++;
  }

  return distribution;
}

// ============================================
// Purchases
// ============================================

/**
 * Record a purchase
 */
export function createPurchase(
  userId: string,
  promptId: string,
  price: number
): Purchase {
  return {
    id: `purchase_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    userId,
    promptId,
    price,
    currency: 'USD',
    createdAt: new Date().toISOString(),
  };
}

/**
 * Check if user has purchased a prompt
 */
export function hasPurchased(
  purchases: Purchase[],
  userId: string,
  promptId: string
): boolean {
  return purchases.some((p) => p.userId === userId && p.promptId === promptId);
}

/**
 * Get user's purchased prompts
 */
export function getUserPurchases(purchases: Purchase[], userId: string): Purchase[] {
  return purchases.filter((p) => p.userId === userId);
}

// ============================================
// Author Analytics
// ============================================

export interface AuthorAnalytics {
  totalRevenue: number;
  totalDownloads: number;
  avgRating: number;
  promptPerformance: {
    promptId: string;
    name: string;
    downloads: number;
    revenue: number;
    rating: number;
  }[];
  revenueByMonth: { month: string; revenue: number }[];
  downloadsByMonth: { month: string; downloads: number }[];
}

/**
 * Calculate author analytics
 */
export function calculateAuthorAnalytics(
  authorId: string,
  prompts: MarketplacePrompt[],
  purchases: Purchase[]
): AuthorAnalytics {
  const authorPrompts = prompts.filter((p) => p.authorId === authorId);
  const promptIds = new Set(authorPrompts.map((p) => p.id));
  const authorPurchases = purchases.filter((p) => promptIds.has(p.promptId));

  const totalRevenue = authorPurchases.reduce((sum, p) => sum + p.price, 0);
  const totalDownloads = authorPrompts.reduce((sum, p) => sum + p.downloadCount, 0);

  const ratingSum = authorPrompts.reduce((sum, p) => sum + p.rating * p.reviewCount, 0);
  const reviewSum = authorPrompts.reduce((sum, p) => sum + p.reviewCount, 0);
  const avgRating = reviewSum > 0 ? ratingSum / reviewSum : 0;

  const promptPerformance = authorPrompts.map((p) => ({
    promptId: p.id,
    name: p.name,
    downloads: p.downloadCount,
    revenue: authorPurchases.filter((pur) => pur.promptId === p.id).reduce((sum, pur) => sum + pur.price, 0),
    rating: p.rating,
  }));

  // Revenue by month
  const revenueByMonth = new Map<string, number>();
  for (const purchase of authorPurchases) {
    const month = purchase.createdAt.slice(0, 7); // YYYY-MM
    revenueByMonth.set(month, (revenueByMonth.get(month) || 0) + purchase.price);
  }

  return {
    totalRevenue,
    totalDownloads,
    avgRating,
    promptPerformance,
    revenueByMonth: Array.from(revenueByMonth.entries())
      .map(([month, revenue]) => ({ month, revenue }))
      .sort((a, b) => a.month.localeCompare(b.month)),
    downloadsByMonth: [], // Would need download history to calculate
  };
}

// ============================================
// Featured & Collections
// ============================================

export interface Collection {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  promptIds: string[];
  createdBy: string;
  featured: boolean;
  createdAt: string;
}

/**
 * Get featured prompts
 */
export function getFeaturedPrompts(
  prompts: MarketplacePrompt[],
  limit: number = 6
): MarketplacePrompt[] {
  return prompts
    .filter((p) => p.featured && p.status === 'published')
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, limit);
}

/**
 * Get trending prompts (high recent downloads)
 */
export function getTrendingPrompts(
  prompts: MarketplacePrompt[],
  limit: number = 10
): MarketplacePrompt[] {
  // In a real implementation, this would use recent download data
  return prompts
    .filter((p) => p.status === 'published')
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, limit);
}

/**
 * Get prompts similar to a given prompt
 */
export function getSimilarPrompts(
  promptId: string,
  prompts: MarketplacePrompt[],
  limit: number = 5
): MarketplacePrompt[] {
  const target = prompts.find((p) => p.id === promptId);
  if (!target) return [];

  return prompts
    .filter((p) => p.id !== promptId && p.status === 'published')
    .map((p) => ({
      prompt: p,
      score: calculateSimilarityScore(target, p),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((p) => p.prompt);
}

function calculateSimilarityScore(a: MarketplacePrompt, b: MarketplacePrompt): number {
  let score = 0;

  // Same category
  if (a.category === b.category) score += 10;

  // Shared tags
  const sharedTags = a.tags.filter((t) => b.tags.includes(t));
  score += sharedTags.length * 5;

  // Similar price range
  const priceDiff = Math.abs(a.price - b.price);
  if (priceDiff < 5) score += 5;
  else if (priceDiff < 20) score += 2;

  // High rated
  if (b.rating >= 4) score += 3;

  return score;
}
