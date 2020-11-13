import { Component, Input, OnInit } from "@angular/core";
import { SocketService } from "src/app/services/socket/socket.service";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import color from 'src/assets/plugins/formvalidation/src/js/validators/color';

@Component({
  selector: "app-piechart",
  templateUrl: "./piechart.component.html",
  styleUrls: ["./piechart.component.scss"],
})
export class PiechartComponent implements OnInit {
  @Input() conSintomas: any;
  @Input() sinSintomas: any;
  public series: ApexNonAxisChartSeries;
  public chart: ApexChart;
  public responsive: ApexResponsive[];
  public labels: any;
  chartOptions: any = {};
  constructor(private srv: SocketService) { }


  ngOnInit(): void {
    this.srv.listen("dataUpdate").subscribe((res: any) => {
      console.log(res);
      this.chartOptions = this.update();
    });
  }
  ngAfterViewInit(): void {
    this.chartOptions = this.update();
  }

  update() {
    let options;
    options = {
      series: [],
      chart: {
        height: 490,
        type: "pie"
      },
      labels: ["Con Sintomas", "Sin Sintomas"],
      legend: {
        position: "bottom"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 340,
              width: 300,
            },
            legend: {
              position: "bottom"
            }
          }
        },
        {
          breakpoint: 1366,
          options: {
            chart: {
              height: 460,
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    options.series = [];
    options.series.push(this.conSintomas);
    options.series.push(this.sinSintomas);
    console.log("Estas son las options Pie: ", options);
    return options
  }
}
