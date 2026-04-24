export type StatusType = 'Y' | 'N' | 'NA';

export type QuantitativeState = Record<string, {
  status: StatusType | '';
  score: number;
}>;

export type QualitativeItem = {
  id: string;
  remark: string;
  pic: string;
  checked: boolean;
};

export type RecommendationItem = {
  id: string;
  text: string;
  status: string;
  comment: string;
};

export type RecommendationMeta = {
  month: string;
  location: string;
};
