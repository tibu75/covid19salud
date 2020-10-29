import { Component, ViewChild, OnInit, Input } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from "ng-apexcharts";
import { SocketService } from "src/app/services/socket/socket.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: "app-pie",
  templateUrl: "./pie.component.html",
  styleUrls: ["./pie.component.scss"],
})
export class PieComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @Input() conSintomas;
  @Input() sinSintomas;
  serieTemp: ApexNonAxisChartSeries;
  constructor(private srv: SocketService) {}
  ngOnInit(): void {
    this.chartOptions = {
      series: [],

      chart: {
        height: 350,
        type: "pie",
      },
      labels: ["Si sintomas", "Con Sintomas"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
    this.chart.updateSeries(this.serieTemp);
  }
}
