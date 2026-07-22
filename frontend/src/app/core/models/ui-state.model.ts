export type LoadState = 'loading' | 'ready' | 'empty' | 'error';

export interface AsyncState<T> {
  state: LoadState;
  data?: T;
  error?: string;
}
