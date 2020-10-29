import { Component, OnInit } from "@angular/core";
import * as Chart from "chart.js";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { SocketService } from "src/app/services/socket/socket.service";
import { Label } from "ng2-charts";
import ChartDataLabels from "chartjs-plugin-datalabels";
@Component({
  selector: "app-piechart",
  templateUrl: "./piechart.component.html",
  styleUrls: ["./piechart.component.scss"],
})
export class PiechartComponent implements OnInit {
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
      let sin = res[0][0] + res[0][1] + res[0][2] + res[0][3] + res[0][4];
      let con = res[1][0] + res[1][1] + res[1][2] + res[1][3] + res[1][4];
      this.chart.data.datasets[0].data = [sin, con];
      this.chart.update();
    });

    this.chart = new Chart("baseChart", {
      type: "pie",
      plugins: [ChartDataLabels],
      options: {
        responsive: true,

        animation: {
          duration: 2000,
          animateRotate: true,
          animateScale: true,
        },
        plugins: {
          datalabels: {
            color: "black",
            display: function (context) {
              return context.dataset.data[context.dataIndex] > 1;
            },
            font: {
              weight: "bold",
              size: 16,
            },
            formatter: Math.round,
          },
        },
      },
      data: {
        labels: ["Sin Sintomas", "Con Sintomas"],
        datasets: [
          {
            type: "pie",
            data: [],
            backgroundColor: ["rgba(27,197,189, 0.2)", "rgba(246,78,96, 0.2)"],
            borderColor: ["rgb(27,197,189)", "rgb(246,78,96)"],
            fill: false,
          },
        ],
      },
    });
  }
}
