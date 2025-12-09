export interface BibleVerse {
  reference: string;
  text: string;
}

export interface WordStatus {
  word: string;
  isHidden: boolean;
  originalIndex: number;
}