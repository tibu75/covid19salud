import { Component, Input, OnInit } from "@angular/core";
import { ChartType, ChartOptions } from "chart.js";
import { Label } from "ng2-charts";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { SocketService } from "src/app/services/socket/socket.service";
@Component({
  selector: "app-piechart",
  templateUrl: "./piechart.component.html",
  styleUrls: ["./piechart.component.scss"],
})
export class PiechartComponent implements OnInit {
  @Input() conSintomas: any;
  @Input() sinSintomas: any;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "top",
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };
  public pieChartLabels: Label[] = [["Con Sintomas"], ["Sin Sintomas"]];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public chartColors: any[] = [
    {
      backgroundColor: ["#f64e60", "#1bc5bd"],
    },
  ];
  constructor(private srv: SocketService) {}

  ngAfterViewInit(): void {
    this.update();
  }

  ngOnInit(): void {
    this.srv.listen("dataUpdate").subscribe((res: any) => {
      console.log(res);
      this.update();
    });
  }
  update(): void {
    this.pieChartData = [];
    this.pieChartData.push(this.conSintomas);
    this.pieChartData.push(this.sinSintomas);
  }
}
