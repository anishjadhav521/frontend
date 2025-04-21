import { Component } from '@angular/core';

@Component({
  selector: 'app-insights',
  standalone: false,
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css'
})
export class InsightsComponent {

  data = [
    { name: 'female', value: 8940000 },
    { name: 'male', value: 5000000 },
  ];

}
