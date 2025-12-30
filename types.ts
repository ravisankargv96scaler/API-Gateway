
export enum TabType {
  WHY = 'WHY',
  FEATURES = 'FEATURES',
  LIFECYCLE = 'LIFECYCLE',
  REAL_WORLD = 'REAL_WORLD',
  CODE = 'CODE',
  SUMMARY = 'SUMMARY'
}

export interface FeatureModule {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  details: string;
}
