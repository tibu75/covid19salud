import { Component, ViewChild } from "@angular/core";
import {
  ApexFill,
  ApexLegend,
  ApexTitleSubtitle,
  ChartComponent,
} from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  fill: ApexFill;
};
@Component({
  selector: "app-pie",
  templateUrl: "./pie.component.html",
  styleUrls: ["./pie.component.scss"],
})
export class PieComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      title: {
        text: "REGISTRO TOTAL DE LLAMADAS",
        align: "center",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      series: [1050, 533],
      chart: {
        width: 520,
        type: "pie",
      },
      labels: ["Con Sintomas", "Sin Sintomas"],
      legend: {
        position: "right",
        offsetY: 40,

        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: "#fff",
          fillColors: ["#E91E63", "#1de9b6", "#9C27B0"],
          radius: 12,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0,
        },
      },
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
      fill: {
        opacity: 1,
        colors: ["#E91E63", "#1de9b6", "#9C27B0"],
      },
    };
  }
}
