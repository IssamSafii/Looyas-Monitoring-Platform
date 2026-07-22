import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <div class="login-shell">
      <div class="ambient ambient-a"></div>
      <div class="ambient ambient-b"></div>

      <section class="login-panel">
        <div class="login-hero">
          <div class="brand">
            <div class="brand-mark">SS</div>
            <div>
              <div class="eyebrow">Observability Platform</div>
              <h1>Safi Stage Monitoring</h1>
              <p>Monitoring unifié pour Mimir, Loki et votre infrastructure Kubernetes.</p>
            </div>
          </div>

          <div class="hero-copy">
            <div class="hero-title">Console d’accès administrateur</div>
            <div class="hero-text">Connexion sécurisée au backend Spring Boot. Les tokens et credentials de vos sources restent côté serveur.</div>
          </div>
        </div>

        <div class="login-card app-card">
          <div class="card-header">
            <div class="card-title">Connexion</div>
            <div class="card-subtitle">Utilise le compte administrateur configuré au premier démarrage.</div>
          </div>

          <form [formGroup]="form" (ngSubmit)="submit()">
            <mat-form-field>
              <mat-label>Nom d’utilisateur</mat-label>
              <input matInput formControlName="username" autocomplete="username">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Mot de passe</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" autocomplete="current-password">
              <button mat-button matSuffix type="button" class="toggle-visibility" (click)="hidePassword = !hidePassword">
                {{ hidePassword ? 'Afficher' : 'Masquer' }}
              </button>
            </mat-form-field>

            <div class="error" *ngIf="error">{{ error }}</div>

            <button mat-flat-button color="primary" class="submit-button" type="submit" [disabled]="loading || form.invalid">
              {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
            </button>
          </form>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .login-shell {
      position: relative;
      min-height: 100vh;
      overflow: hidden;
      display: grid;
      place-items: center;
      padding: 2rem;
      background:
        radial-gradient(circle at 15% 20%, rgba(76, 201, 240, 0.16), transparent 24%),
        radial-gradient(circle at 85% 12%, rgba(124, 140, 255, 0.18), transparent 22%),
        linear-gradient(180deg, #07101d 0%, #0a1220 100%);
    }

    .ambient {
      position: absolute;
      border-radius: 999px;
      filter: blur(72px);
      opacity: 0.7;
      pointer-events: none;
    }

    .ambient-a {
      width: 300px;
      height: 300px;
      left: 8%;
      top: 10%;
      background: rgba(76, 201, 240, 0.14);
    }

    .ambient-b {
      width: 340px;
      height: 340px;
      right: 6%;
      bottom: 8%;
      background: rgba(124, 140, 255, 0.14);
    }

    .login-panel {
      position: relative;
      z-index: 1;
      width: min(1080px, 100%);
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: 1.5rem;
      align-items: stretch;
    }

    .login-hero,
    .login-card {
      padding: 2.2rem;
      border-radius: 30px;
    }

    .login-hero {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid rgba(148, 163, 184, 0.12);
      background: linear-gradient(180deg, rgba(16, 26, 45, 0.62), rgba(10, 18, 32, 0.4));
      backdrop-filter: blur(24px);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .brand-mark {
      width: 72px;
      height: 72px;
      border-radius: 24px;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, #6f86ff, #4cc9f0);
      color: white;
      font-size: 1.5rem;
      font-weight: 800;
      box-shadow: 0 16px 36px rgba(76, 201, 240, 0.22);
    }

    .eyebrow {
      color: var(--accent-2);
      font-size: 0.82rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 0.55rem;
    }

    h1 {
      margin: 0;
      font-size: clamp(2rem, 4vw, 3.3rem);
      line-height: 0.98;
      font-weight: 800;
    }

    p {
      margin: 0.85rem 0 0;
      color: var(--text-secondary);
      max-width: 36rem;
      font-size: 1.05rem;
      line-height: 1.6;
    }

    .hero-copy {
      padding-top: 2rem;
      border-top: 1px solid rgba(148, 163, 184, 0.12);
    }

    .hero-title {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 0.55rem;
    }

    .hero-text {
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .login-card {
      width: 100%;
      align-self: center;
      border: 1px solid rgba(148, 163, 184, 0.14);
    }

    .card-header {
      margin-bottom: 1.5rem;
    }

    .card-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.35rem;
    }

    .card-subtitle {
      color: var(--text-secondary);
      line-height: 1.5;
    }

    form {
      display: grid;
      gap: 1rem;
    }

    .toggle-visibility {
      min-width: auto;
      padding-inline: 0.35rem;
      color: var(--accent-2) !important;
      font-weight: 600;
    }

    .submit-button {
      width: 100%;
      min-height: 52px;
      border-radius: 16px;
      background: linear-gradient(135deg, #7c8cff, #4cc9f0) !important;
      color: white !important;
      font-weight: 700;
      box-shadow: 0 18px 36px rgba(124, 140, 255, 0.24);
    }

    .submit-button[disabled] {
      opacity: 0.72;
    }

    .error {
      color: #ff8a8a;
      background: rgba(255, 107, 107, 0.08);
      border: 1px solid rgba(255, 107, 107, 0.18);
      border-radius: 14px;
      padding: 0.85rem 1rem;
      line-height: 1.4;
    }

    @media (max-width: 960px) {
      .login-panel {
        grid-template-columns: 1fr;
      }

      .login-hero,
      .login-card {
        padding: 1.5rem;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  protected readonly form = this.formBuilder.nonNullable.group({
    username: ['admin', [Validators.required]],
    password: ['admin', [Validators.required]]
  });

  protected hidePassword = true;
  protected loading = false;
  protected error = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  protected submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.form.getRawValue())
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => void this.router.navigate(['/overview']),
        error: () => {
          this.error = 'Connexion impossible. Vérifie que le backend répond et que le mot de passe admin est correct.';
        }
      });
  }
}
