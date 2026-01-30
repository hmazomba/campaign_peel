
export type AssetType = 'LinkedIn Post' | 'Twitter Thread' | 'Instagram Caption' | 'Facebook Ad' | 'Google Search Ad';

export interface MarketingAsset {
  id: string;
  type: AssetType;
  content: string;
  hashtags?: string[];
  headline?: string;
}

export interface GenerationParams {
  sourceText: string;
  tone: string;
  targetAudience: string;
}
