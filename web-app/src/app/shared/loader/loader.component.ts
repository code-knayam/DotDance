import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="loader-overlay">
      <div class="loader-container">
        <mat-spinner diameter="48" color="primary"></mat-spinner>
      </div>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(7, 7, 7, 0.7);
      backdrop-filter: blur(4px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .loader-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    ::ng-deep {
      .mat-mdc-progress-spinner {
        --mdc-circular-progress-active-indicator-color: #1a73e8;
      }
    }
  `]
})
export class LoaderComponent {} 