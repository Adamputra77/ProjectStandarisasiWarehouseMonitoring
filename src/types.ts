export type StatusType = 'Y' | 'N' | 'NA';

export type QuantitativeState = Record<string, {
  status: StatusType | '';
  score: number;
  notes?: string;
}>;

export type RecommendationItem = {
  id: string;
  text: string;
  status: string;
  comment: string;
  beforePic?: string;
  afterPic?: string;
};

export type RecommendationMeta = {
  month: string;
  location: string;
};
