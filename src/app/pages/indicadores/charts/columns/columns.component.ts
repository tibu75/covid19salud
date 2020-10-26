import { ChangeDetectorRef } from "@angular/core";
import { Component, ViewChild, OnInit } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  ApexTitleSubtitle,
  ApexMarkers,
} from "ng-apexcharts";

@Component({
  selector: "app-columns",
  templateUrl: "./columns.component.html",
  styleUrls: ["./columns.component.scss"],
})
export class ColumnsComponent implements OnInit {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  markers: ApexMarkers;
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.iniChartOptions();
    this.cdr.markForCheck();
  }

  private iniChartOptions(): void {
    (this.series = [
      {
        name: "Con Sintomas",
        data: [],
      },
      {
        name: "Sin Sintomas",
        data: [],
      },
    ]),
      (this.chart = {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      }),
      (this.title = {
        text: "REGISTROS DE LLAMADAS POR DIA",
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
      }),
      (this.responsive = [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ]),
      (this.plotOptions = {
        bar: {
          horizontal: false,
        },
      }),
      (this.xaxis = {
        type: "category",
        categories: ["22/OCT", "23/OCT"],
      }),
      (this.legend = {
        position: "right",
        offsetY: 40,
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: "#fff",
          fillColors: ["#f64e60", "#1bc5bd", "#9C27B0"],
          radius: 12,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0,
        },
      }),
      (this.fill = {
        opacity: 1,
        colors: ["#f64e60", "#1bc5bd", "#9C27B0"],
      },
    };

  }
}
