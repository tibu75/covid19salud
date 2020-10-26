import {
  Component,
  ViewChild,
  Input,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import {
  ApexFill,
  ApexLegend,
  ApexTitleSubtitle,
  ChartComponent,
} from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from "ng-apexcharts";
import { FormsLlamada } from "src/app/pages/models/form0800covid2";
import { Reg0800Service } from "src/app/services/reg0800/reg0800.service";
import { Form0800Service } from "../../../../services/form0800/form0800.service";

@Component({
  selector: "app-pie",
  templateUrl: "./pie.component.html",
  styleUrls: ["./pie.component.scss"],
})
export class PieComponent implements OnInit {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  public cargando: boolean = true;
  public formtemp: FormsLlamada[] = [];
  public form: FormsLlamada[] = [];
  public totalForm: number = 0;
  public cantRegistros: number = 0;
  soloLectura: boolean;
  data: any = [];
  dni: any = [];
  @Input() conSintomas: number;
  @Input() sinSintomas: number;

  constructor(
    public reg0800Service: Reg0800Service,
    private cdr: ChangeDetectorRef,
    public f: Form0800Service
  ) {
    console.log(this.f.conSintomas, this.f.sinSintomas);
  }
  ngOnInit(): void {
    /* this.cargarForms(); */
    this.iniChartOptions();
    this.cdr.markForCheck();
  }
  /*   cargarForms() {
    this.cargando = true;
    this.reg0800Service
      .getRegistrosTodos(1000)
      .subscribe(({ total, registros }) => {
        console.log(registros);
        console.log("Total de Personas: ", total);
        this.form = registros;
        this.BuscarRegSintomas();
        this.totalForm = total;
        this.cdr.markForCheck();

        this.cargando = false;
        this.soloLectura = true;
      });
    this.cdr.markForCheck();
  }

  BuscarRegSintomas() {
    this.form.forEach((x) => {
      x.llamada.forEach((y) => {
        if (y.sintomas === "No") {
          this.sinSintomas = this.sinSintomas + 1;
        }
        this.cantRegistros = this.cantRegistros + 1;
      });
    });
    this.f.conSintomas = this.cantRegistros - this.sinSintomas;
    this.f.sinSintomas = this.sinSintomas;
    console.log("Registros totales: ", this.cantRegistros);
    console.log("Registros con sintomas: ", this.f.conSintomas);
    console.log("Registros sin sintomas: ", this.f.sinSintomas);
    this.iniChartOptions();
  } */

  private iniChartOptions(): void {
    (this.title = {
      text: "REGISTRO TOTAL DE LLAMADAS",
      align: "center",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: undefined,
        color: "#263238",
      },
    }),
      (this.series = []),
      (this.chart = {
        width: 520,
        type: "pie",
      }),
      (this.labels = ["Con Sintomas", "Sin Sintomas"]),
      (this.legend = {
        position: "right",
        offsetY: 40,

        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: "#fff",
          fillColors: ["#f64e60", "#1bc5bd", "#9C27B0"],
          radius: 12,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0,
        },
      }),
      (this.responsive = [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ]),
      (this.fill = {
        opacity: 1,

        colors: ["#f64e60", "#1bc5bd", "#9C27B0"],
      },
    };

  }
}
