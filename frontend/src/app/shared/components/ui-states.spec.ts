import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyStateComponent } from './empty-state.component';
import { ErrorStateComponent } from './error-state.component';
import { LoadingSkeletonComponent } from './loading-skeleton.component';

describe('UI state components', () => {
  it('should render loading skeleton', async () => {
    await TestBed.configureTestingModule({ imports: [LoadingSkeletonComponent] }).compileComponents();
    const fixture: ComponentFixture<LoadingSkeletonComponent> = TestBed.createComponent(LoadingSkeletonComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.skeleton-line').length).toBeGreaterThan(0);
  });

  it('should render empty state message', async () => {
    await TestBed.configureTestingModule({ imports: [EmptyStateComponent] }).compileComponents();
    const fixture: ComponentFixture<EmptyStateComponent> = TestBed.createComponent(EmptyStateComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Aucune donnée');
  });

  it('should render error state message', async () => {
    await TestBed.configureTestingModule({ imports: [ErrorStateComponent] }).compileComponents();
    const fixture: ComponentFixture<ErrorStateComponent> = TestBed.createComponent(ErrorStateComponent);
    fixture.componentInstance.message = 'Erreur';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Impossible de récupérer les données');
  });
});
