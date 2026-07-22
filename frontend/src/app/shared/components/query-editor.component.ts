import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-query-editor',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="editor-actions">
      <mat-form-field class="editor-field" subscriptSizing="dynamic" appearance="outline">
        <mat-label>{{ label }}</mat-label>
        <textarea matInput rows="4" [formControl]="control" spellcheck="false"></textarea>
      </mat-form-field>

      <div class="actions">
        <button mat-stroked-button type="button" (click)="copy.emit(control.getRawValue())">Copier</button>
        <button mat-flat-button color="primary" type="button" (click)="execute.emit(control.getRawValue())">Executer</button>
      </div>
    </div>
  `,
  styles: [`
    .editor-actions {
      display: grid;
      gap: 0.85rem;
    }
    .editor-field {
      width: 100%;
    }
    .editor-field textarea {
      min-height: 108px;
      font-family: Consolas, "Courier New", monospace;
      font-size: 0.88rem;
      line-height: 1.5;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: flex-end;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryEditorComponent {
  @Input() label = 'Query';
  @Input() set value(value: string) {
    this.control.setValue(value, { emitEvent: false });
  }
  @Output() execute = new EventEmitter<string>();
  @Output() copy = new EventEmitter<string>();

  protected readonly control = new FormControl('', { nonNullable: true });
}
