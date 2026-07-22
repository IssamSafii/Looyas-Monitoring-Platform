import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="skeleton-wrapper">
      <div *ngFor="let _ of rowsArray" class="skeleton-line"></div>
    </div>
  `,
  styles: [`
    .skeleton-wrapper { display: grid; gap: 0.8rem; }
    .skeleton-line {
      height: 18px;
      border-radius: 999px;
      background: linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.12), rgba(255,255,255,0.05));
      background-size: 200% 100%;
      animation: shimmer 1.3s infinite linear;
    }
    @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSkeletonComponent {
  @Input() rows = 5;

  get rowsArray(): number[] {
    return Array.from({ length: this.rows }, (_, index) => index);
  }
}
