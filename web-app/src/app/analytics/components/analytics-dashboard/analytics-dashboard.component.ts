import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';

interface AnalyticsData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    NgxChartsModule
  ],
  template: `
    <div class="analytics-dashboard">
      <h1>Analytics Dashboard</h1>
      <div class="grid">
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Total Scans</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <ngx-charts-pie-chart
              [results]="totalScansData"
              [legend]="true"
              [labels]="true"
            >
            </ngx-charts-pie-chart>
          </mat-card-content>
        </mat-card>

        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Scans Over Time</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <ngx-charts-line-chart
              [results]="scansOverTimeData"
              [xAxis]="true"
              [yAxis]="true"
              [showXAxisLabel]="true"
              [showYAxisLabel]="true"
              xAxisLabel="Date"
              yAxisLabel="Scans"
            >
            </ngx-charts-line-chart>
          </mat-card-content>
        </mat-card>

        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Top QR Codes</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <ngx-charts-bar-vertical
              [results]="topQRCodesData"
              [xAxis]="true"
              [yAxis]="true"
              [showXAxisLabel]="true"
              [showYAxisLabel]="true"
              xAxisLabel="QR Code"
              yAxisLabel="Scans"
            >
            </ngx-charts-bar-vertical>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .analytics-dashboard {
      padding: 20px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
    }
    .chart-card {
      height: 400px;
    }
    mat-card-content {
      height: calc(100% - 64px);
    }
  `]
})
export class AnalyticsDashboardComponent {
  totalScansData: AnalyticsData[] = [
    { name: 'QR Code 1', value: 100 },
    { name: 'QR Code 2', value: 75 },
    { name: 'QR Code 3', value: 50 }
  ];

  scansOverTimeData = [
    {
      name: 'QR Code 1',
      series: [
        { name: 'Jan 1', value: 10 },
        { name: 'Jan 2', value: 15 },
        { name: 'Jan 3', value: 12 }
      ]
    },
    {
      name: 'QR Code 2',
      series: [
        { name: 'Jan 1', value: 8 },
        { name: 'Jan 2', value: 10 },
        { name: 'Jan 3', value: 7 }
      ]
    }
  ];

  topQRCodesData: AnalyticsData[] = [
    { name: 'QR Code 1', value: 100 },
    { name: 'QR Code 2', value: 75 },
    { name: 'QR Code 3', value: 50 },
    { name: 'QR Code 4', value: 25 }
  ];
} 