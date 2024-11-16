import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Chart, ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  confidenceScore: number = 0.85;
  importantFeatures = [
    { name: 'Age', weight: 0.4 },
    { name: 'Credit Score', weight: 0.35 },
    { name: 'Income', weight: 0.25 },
  ];

  feedbackForm: FormGroup;

  // Chart Configuration
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.importantFeatures.map((f) => f.name),
    datasets: [
      {
        data: this.importantFeatures.map((f) => f.weight * 100),
        label: 'Feature Weight'
      }
    ]
  };

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  barChartType: ChartType = 'bar';

  constructor(private fb: FormBuilder, private snackbar: SnackbarService) {
    this.feedbackForm = this.fb.group({
      feedback: ['']
    });
  }

  submitFeedback() {
    const feedback = this.feedbackForm.value.feedback;
    if (feedback) {
      this.snackbar.openSnackBar('Feedback submitted successfully!', 'Close');
      this.feedbackForm.reset();
    }
  }
}