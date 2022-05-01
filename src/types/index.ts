export interface IResponse {
  message: string;
}

export interface PResponse<T> {
  data: T[];
  meta: {
    itemCount: number;
    pageCount: number;
  };
}

export interface PracticeResults {
  [key: string]: {
    word: string;
    guess: string;
    genera: string[];
    success: boolean;
  };
}
