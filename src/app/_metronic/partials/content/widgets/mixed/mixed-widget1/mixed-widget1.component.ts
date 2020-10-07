import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { LayoutService } from "../../../../../core";
import { AuthService } from "../../../../../../modules/auth/_services/auth.service";

@Component({
  selector: "app-mixed-widget1",
  templateUrl: "./mixed-widget1.component.html",
})
export class MixedWidget1Component implements OnInit {
  chartOptions: any = {};
  fontFamily = "";
  colorsGrayGray500 = "";
  colorsGrayGray200 = "";
  colorsGrayGray300 = "";
  colorsThemeBaseDanger = "";
  public mostrar: boolean = true;
  public mostrarUs: boolean;
  buttons: any;

  constructor(
    private layout: LayoutService,
    private userService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.fontFamily = this.layout.getProp("js.fontFamily");
    this.colorsGrayGray500 = this.layout.getProp("js.colors.gray.gray500");
    this.colorsGrayGray200 = this.layout.getProp("js.colors.gray.gray200");
    this.colorsGrayGray300 = this.layout.getProp("js.colors.gray.gray300");
    this.colorsThemeBaseDanger = this.layout.getProp(
      "js.colors.theme.base.danger"
    );
  }

  ngOnInit(): void {
    //this.chartOptions = this.getChartOptions();
    this.ShowButtons();
  }

  ShowButtons() {
    this.mostrar = false;
    if (this.userService.role === "ADMIN_ROLE") {
      //  console.log("pas1`", this.mostrar);
      this.mostrar = true;
      this.cdr.markForCheck();
    } else if (this.userService.role === "SYSTEM_ROLE") {
      //console.log("pas2`");
      this.mostrar = true;
      this.mostrarUs = true;
      this.cdr.markForCheck();
    }
  }

  /* getChartOptions() {
    const strokeColor = "#97EEE9";
    return {
      series: [
        {
          name: "Llamadas en el dia",
          data: [60, 55, 65, 0, 0, 0, 0],
        },
      ],
      chart: {
        type: "area",
        height: 200,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          enabledOnSeries: undefined,
          top: 5,
          left: 0,
          blur: 3,
          color: strokeColor,
          opacity: 0.5,
        },
      },
      plotOptions: {},
      legend: {
        show: true,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "solid",
        opacity: 0,
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 3,
        colors: [strokeColor],
      },
      xaxis: {
        categories: [
          "Domingo 13",
          "Lunes 14",
          "Martes 15",
          "Miercoles 16",
          "Jueves 17",
          "Viernes 18",
          "Sabado 19",
        ],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: "12px",
            fontFamily: this.fontFamily,
          },
        },
        crosshairs: {
          show: false,
          position: "front",
          stroke: {
            color: this.colorsGrayGray300,
            width: 1,
            dashArray: 3,
          },
        },
      },
      yaxis: {
        min: 0,
        max: 80,
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: "12px",
            fontFamily: this.fontFamily,
          },
        },
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: "12px",
          fontFamily: this.fontFamily,
        },
        y: {
          // tslint:disable-next-line
          formatter: function (val) {
            return val + " Registros";
          },
        },
        marker: {
          show: false,
        },
      },
      colors: ["transparent"],
      markers: {
        colors: this.colorsThemeBaseDanger,
        strokeColor: [strokeColor],
        strokeWidth: 3,
      },
    };
  } */
}
