import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, PanelContainerComponent],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Settings</h1>
        <div class="page-subtitle">Modification du mot de passe administrateur.</div>
      </div>
    </div>

    <div class="section-grid">
      <div class="span-6">
        <app-panel-container title="Changer le mot de passe">
          <form [formGroup]="form" (ngSubmit)="submit()" class="form-grid">
            <mat-form-field><mat-label>Mot de passe actuel</mat-label><input matInput type="password" formControlName="currentPassword"></mat-form-field>
            <mat-form-field><mat-label>Nouveau mot de passe</mat-label><input matInput type="password" formControlName="newPassword"></mat-form-field>
            <button mat-flat-button color="primary" type="submit">Mettre à jour</button>
          </form>
        </app-panel-container>
      </div>
    </div>
  `,
  styles: ['.form-grid { display:grid; gap:0.75rem; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
  protected readonly form = this.formBuilder.nonNullable.group({
    currentPassword: ['', [Validators.required, Validators.minLength(4)]],
    newPassword: ['', [Validators.required, Validators.minLength(4)]]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {}

  protected submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.authService.changePassword(this.form.getRawValue()).subscribe();
  }
}
