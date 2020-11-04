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

  constructor(private srv: SocketService) { }

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
    this.series = [];
    this.chart = {
      type: "pie"
    };
    this.labels = ["Con Sintomas", "Sin Sintomas"];
    this.responsive = [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ];
    this.series = [];
    this.series.push(this.conSintomas);
    this.series.push(this.sinSintomas);

  }
}
