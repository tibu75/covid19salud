import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { SocketService } from "src/app/services/socket/socket.service";
import color from '../../../../../assets/plugins/formvalidation/src/js/validators/color';

@Component({
  selector: "app-colchart",
  templateUrl: "./colchart.component.html",
  styleUrls: ["./colchart.component.scss"],
})
export class ColchartComponent implements OnInit, AfterViewInit {
  @Input() labelsFec: any;
  @Input() dataFec: any;
  @Input() color: any;
  chartOptions: any = {};
  constructor(private srv: SocketService, private cdr: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.srv.listen("dataUpdate").subscribe((res: any) => {
      console.log("////////////////////// Init Chart", res);
      this.chartOptions = this.update();
      this.cdr.markForCheck();
    });
  }
  ngAfterViewInit(): void {
    console.log("/////NGAFTERINIT ColCharts: ", this.dataFec);
    this.chartOptions = this.update();
    this.cdr.markForCheck();
  }

  public update() {
    // Only Change 3 values
    let opciones;
    opciones = {
      series: [
        {
          name: "Datos Diarios",
          data: [],
        },
      ],
      chart: {
        height: 490,
        type: "bar",
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
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
              position: "bottom",
            },
          },
        },
        {
          breakpoint: 1366,
          options: {
            chart: {
              height: 440,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        offsetY: 10,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      xaxis: {
        categories: [],
        position: "bottom",
        labels: {
          offsetY: 0,
        },
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 50],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      fill: {
        type: "solid",
        colors: []
      },
      yaxis: {
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
        labels: {
          show: true,
          formatter: function (val) {
            return val + "";
          },
        },
      },
      title: {
        text: "",
        floating: true,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444",
        },
      },
    };
    opciones.series[0].data = this.dataFec;
    opciones.xaxis.categories = this.labelsFec;
    opciones.fill.colors[0] = this.color;
    return opciones;
  }
  /* 
    this.barChartData[0].data = this.dataFec;
    this.barChartLabels = this.labelsFec; */
}
