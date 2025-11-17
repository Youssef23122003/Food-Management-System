import { Component, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexLegend,
  ApexPlotOptions
} from 'ng-apexcharts';

@Component({
  selector: 'app-donut-apex',
  templateUrl: './donut-apex.component.html'
})
export class DonutApexComponent {
  public series: ApexNonAxisChartSeries = [44, 55, 41, 17];
  public chart: ApexChart = { type: 'candlestick', height: 250 };
  public labels = ['A','B','C','D'];
  public plotOptions: ApexPlotOptions = {
    pie: { donut: { size: '65%' } }
  };
  public legend: ApexLegend = { position: 'bottom' , };
}
