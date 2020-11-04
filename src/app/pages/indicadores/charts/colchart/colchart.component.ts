import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
import { SocketService } from "src/app/services/socket/socket.service";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";

@Component({
  selector: "app-colchart",
  templateUrl: "./colchart.component.html",
  styleUrls: ["./colchart.component.scss"],
})
export class ColchartComponent implements OnInit, AfterViewInit {

  public series: ApexAxisChartSeries;
  public chart: ApexChart;
  public dataLabels: ApexDataLabels;
  public plotOptions: ApexPlotOptions;
  public yaxis: ApexYAxis;
  public xaxis: ApexXAxis;
  public fill: ApexFill;
  public title: ApexTitleSubtitle;
  @Input() labelsFec: any;
  @Input() dataFec: any;
  constructor(private srv: SocketService) { }


  ngOnInit(): void {
    this.srv.listen("dataUpdate").subscribe((res: any) => {
      console.log(res);
      this.update();
    });
  }
  ngAfterViewInit(): void {
    console.log("NGAFTERINIT ColCharts: ", this.dataFec);
    this.update();
  }

  public update(): void {
    // Only Change 3 values

    this.series = [
      {
        name: "Datos Diarios",
        data: []
      }
    ]
    this.chart = {
      height: 350,
      type: "bar"
    };
    this.plotOptions = {
      bar: {
        dataLabels: {
          position: "top" // top, center, bottom
        }
      }
    };
    this.dataLabels = {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"]
      }
    },
      this.xaxis = {
        categories: [

        ],
        position: "bottom",
        labels: {
          offsetY: 0
        },
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      };
    this.fill = {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [50, 0, 100, 100]
      }
    };
    this.yaxis = {
      axisBorder: {
        show: true
      },
      axisTicks: {
        show: true
      },
      labels: {
        show: true,
        formatter: function (val) {
          return val + "";
        }
      }
    };
    this.title = {
      text: "",
      floating: true,
      offsetY: 320,
      align: "center",
      style: {
        color: "#444"
      }
    };
    this.series[0].data = this.dataFec;
    this.xaxis.categories = this.labelsFec;
  };
  /* 
    this.barChartData[0].data = this.dataFec;
    this.barChartLabels = this.labelsFec; */
}

