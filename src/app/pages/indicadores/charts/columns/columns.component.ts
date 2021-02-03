import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { SocketService } from "src/app/services/socket/socket.service";

@Component({
  selector: "app-columns",
  templateUrl: "./columns.component.html",
  styleUrls: ["./columns.component.scss"],
})
export class ColumnsComponent implements OnInit, AfterViewInit {
  @Input() labelsLoc: any[];
  @Input() dataLoc: any[];
  chartOptions: any = {};
  constructor(private srv: SocketService) {
    console.log("Datos ingresados al CONSTRUCTOR Columns: ", this.dataLoc);
    /* if (this.data === undefined) {
      this.update();
    } */
  }
  ngAfterViewInit(): void {
    console.log("AfterInit Localidades");
    this.chartOptions = this.update();
  }

  ngOnInit(): void {
    console.log("Datos ingresados al ngOnInit Columns: ", this.dataLoc);

    /* this.srv.listen("dataUpdate").subscribe((res: any) => {
      console.log(res);
      this.chartOptions = this.update();
    }); */
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  update() {
    // Only Change 3 values public update(): void {
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
        height: 680,
        type: "bar",
      },
      plotOptions: {
        bar: {
          horizontal: true,
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
              height: 500,
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
        offsetY: 0,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
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
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
        },
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
    opciones.series[0].data = this.dataLoc;
    opciones.xaxis.categories = this.labelsLoc;
    return opciones;
  }
}
