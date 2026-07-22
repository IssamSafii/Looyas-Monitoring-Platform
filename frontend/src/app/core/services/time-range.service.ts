import { Injectable, signal } from '@angular/core';

export interface TimeRangeOption {
  label: string;
  value: string;
  seconds: number;
}

@Injectable({ providedIn: 'root' })
export class TimeRangeService {
  readonly options: TimeRangeOption[] = [
    { label: '15 min', value: '15m', seconds: 900 },
    { label: '1 heure', value: '1h', seconds: 3600 },
    { label: '6 heures', value: '6h', seconds: 21600 },
    { label: '24 heures', value: '24h', seconds: 86400 }
  ];

  readonly selected = signal<TimeRangeOption>(this.options[1]);
  readonly refreshInterval = signal<number>(30000);
}
