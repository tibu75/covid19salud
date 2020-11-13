import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
import { SocketService } from "src/app/services/socket/socket.service";


@Component({
  selector: "app-colchart",
  templateUrl: "./colchart.component.html",
  styleUrls: ["./colchart.component.scss"],
})
export class ColchartComponent implements OnInit, AfterViewInit {
  @Input() labelsFec: any;
  @Input() dataFec: any;
  chartOptions: any = {};
  constructor(private srv: SocketService) { }


  ngOnInit(): void {
    this.srv.listen("dataUpdate").subscribe((res: any) => {
      console.log(res);
      this.chartOptions = this.update();
    });
  }
  ngAfterViewInit(): void {
    console.log("NGAFTERINIT ColCharts: ", this.dataFec);
    this.chartOptions = this.update();
  }

  public update() {
    // Only Change 3 values
    let opciones;
    opciones = {
      series: [
        {
          name: "Datos Diarios",
          data: []
        }
      ],
      chart: {
        height: 490,
        type: "bar"
      },
      plotOptions: {
        bar: {

          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 500,
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
              height: 440,
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        offsetY: 10,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      xaxis: {
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
              stops: [0, 50],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
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
      },
      yaxis: {
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
      },
      title: {
        text: "",
        floating: true,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
    }
    opciones.series[0].data = this.dataFec;
    opciones.xaxis.categories = this.labelsFec;
    return opciones;
  };
  /* 
    this.barChartData[0].data = this.dataFec;
    this.barChartLabels = this.labelsFec; */
}

