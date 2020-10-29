import { Component, OnInit } from "@angular/core";
import * as Chart from "chart.js";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { SocketService } from "src/app/services/socket/socket.service";
import { Label } from "ng2-charts";
import ChartDataLabels from "chartjs-plugin-datalabels";

@Component({
  selector: "app-colchart",
  templateUrl: "./colchart.component.html",
  styleUrls: ["./colchart.component.scss"],
})
export class ColchartComponent implements OnInit {
  chart;
  public barChartOptions: ChartOptions;
  public barChartLabels: Label[];
  public barChartType: ChartType;
  public barChartLegend: boolean;
  public barChartPlugins: [];
  public barChartData: ChartDataSets[];

  constructor(private srv: SocketService) {}

  ngOnInit() {
    this.srv.listen("dataUpdate").subscribe((res: any) => {
      console.log(res);
      this.chart.data.datasets[0].data = res[0];
      this.chart.data.datasets[1].data = res[1];

      this.chart.update();
    });

    this.chart = new Chart("colChart", {
      type: "bar",
      plugins: [ChartDataLabels],
      data: {
        labels: ["22/10", "23/10", "24/10", "25/10", "26/10", "27/10", "28/10"],
        datasets: [
          {
            label: "Sin Sintomas",
            data: [],
            fill: false,
            backgroundColor: [
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
            ],
            borderColor: [
              "rgb(27,197,189)",
              "rgb(27,197,189)",
              "rgb(27,197,189)",
              "rgb(27,197,189)",
              "rgb(27,197,189)",
              "rgb(27,197,189)",
              "rgb(27,197,189)",
            ],
            borderWidth: 1,

            datalabels: {
              align: "center",
              anchor: "center",
            },
          },
          {
            label: "Con Sintomas",
            data: [],
            fill: false,
            backgroundColor: [
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
            ],
            borderColor: [
              "rgb(246,78,96)",
              "rgb(246,78,96)",
              "rgb(246,78,96)",
              "rgb(246,78,96)",
              "rgb(246,78,96)",
              "rgb(246,78,96)",
              "rgb(246,78,96)",
            ],
            borderWidth: 1,
            datalabels: {
              align: "center",
              anchor: "center",
            },
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            color: "black",
            display: function (context) {
              return context.dataset.data[context.dataIndex] > 5;
            },
            font: {
              weight: "bold",
            },
            formatter: Math.round,
          },
        },
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
    }); /* {
      type: "bar",
      data: {
        labels: ["22/10", "23/10", "24/10", "25/10", "26/10"],
        datasets: [
          {
            label: "Sin Sintomas",
            data: [],
            fill: false,
            backgroundColor: [
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
            ],
            borderColor: [
              "rgb(27,197,189)",
              "rgb(27,197,189)",
              "rgb(27,197,189)",
              "rgb(27,197,189)",
              "rgb(27,197,189)",
            ],
            borderWidth: 1,
          },
          {
            label: "Con Sintomas",
            data: [],
            fill: false,
            backgroundColor: [
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
            ],
            borderColor: [
              "rgb(246,78,96)",
              "rgb(246,78,96)",
              "rgb(246,78,96)",
              "rgb(246,78,96)",
              "rgb(246,78,96)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } },
    }); */
  }
}
