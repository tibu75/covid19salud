import { Component, OnInit } from "@angular/core";
import * as Chart from "chart.js";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { SocketService } from "src/app/services/socket/socket.service";
import { Label } from "ng2-charts";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Localidades } from "src/app/pages/models/localidades";
import { LocalidadesService } from "src/app/services/localidades/localidades.service";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-columns",
  templateUrl: "./columns.component.html",
  styleUrls: ["./columns.component.scss"],
})
export class ColumnsComponent implements OnInit {
  chart;
  public barChartOptions: ChartOptions;
  public barChartLabels: Label[];
  public barChartType: ChartType;
  public barChartLegend: boolean;
  public barChartPlugins: [];
  public barChartData: ChartDataSets[];
  public localidades: Localidades[] = [];
  constructor(
    private srv: SocketService,
    private localidadesService: LocalidadesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarLocalidades();
    this.srv.listen("dataUpdate").subscribe((res: any) => {
      console.log(res);
      this.chart.data.labels = [
        "11 de Octubre",
        "Aguada San Roque",
        "Aluminé",
        "Andacollo",
        "Añelo",
        "Arroyito",
        "Bajada del Agrio",
        "Barrancas",
        "Barrio Ruca Luhé",
        "Buta Ranquil",
        "Caviahue",
        "Centenario",
        "Chorriaca",
        "Chos Malal",
        "Copahue",
        "Cutral Có",
        "El Chocón (Barrio Llequen)",
        "El Cholar",
        "El Huecú",
        "El Sauce",
        "Huinganco",
        "Junín de los Andes",
        "La Buitrera",
        "Las Coloradas",
        "Las Lajas",
        "Las Ovejas",
        "Loncopué",
        "Los Catutos",
        "Los Miches",
        "Manzano Amargo",
        "Mariano Moreno",
        "Mari Menuco",
        "Moquehue",
        "Neuquén",
        "Octavio Pico",
        "Paso Aguerre",
        "Picún Leufú",
        "Piedra del Águila",
        "Plaza Huincul",
        "Plottier",
        "Quili Malal",
        "Ramón M. Castro",
        "Rincón de los Sauces",
        "San Martín de los Andes",
        "San Patricio del Chañar",
        "Santo Tomás",
        "Senillosa",
        "Taquimilán",
        "Tricao Malal",
        "Varvarco",
        "Villa del Curi Leuvú",
        "Villa El Chocón",
        "Villa La Angostura",
        "Villa Lago Meliquina",
        "Villa Nahueve",
        "Villa Pehuenia",
        "Villa Traful",
        "Vista Alegre Norte",
        "Vista Alegre Sur",
        "Zapala",
      ];
      this.chart.data.datasets[0].data = res[0];
      this.chart.data.datasets[1].data = res[1];

      this.chart.update();
    });

    this.chart = new Chart("columnChart", {
      type: "bar",
      plugins: [ChartDataLabels],
      data: {
        labels: [],

        datasets: [
          {
            label: "Sin Sintomas",
            data: [],
            fill: false,
            backgroundColor: [
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
            ],
            borderColor: [
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
              "rgba(27,197,189)",
            ],
            borderWidth: 1,

            datalabels: {
              align: "center",
              anchor: "center",
            },
          },
          {
            label: "Con Sintomas",
            data: [],
            fill: false,
            backgroundColor: [
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
            ],
            borderColor: [
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
              "rgba(246,78,96)",
            ],
            borderWidth: 1,
            datalabels: {
              align: "center",
              anchor: "center",
            },
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontSize: 16,
          },
        },
        plugins: {
          datalabels: {
            color: "black",
            display: function (context) {
              return context.dataset.data[context.dataIndex] > 1;
            },
            font: {
              weight: "bold",
              size: 8,
            },
            formatter: Math.round,
          },
        },
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
    }); /* {
      type: "bar",
      data: {
        labels: ["22/10", "23/10", "24/10", "25/10", "26/10"],
        datasets: [
          {
            label: "Sin Sintomas",
            data: [],
            fill: false,
            backgroundColor: [
              "rgba(246,78,96, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
              "rgba(27,197,189, 0.2)",
            ],
            borderColor: [
              "rgb(27,197,189)",
              "rgb(27,197,189)",
              "rgb(27,197,189)",
              "rgb(27,197,189)",
              "rgb(27,197,189)",
            ],
            borderWidth: 1,
          },
          {
            label: "Con Sintomas",
            data: [],
            fill: false,
            backgroundColor: [
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
              "rgba(246,78,96, 0.2)",
            ],
            borderColor: [
              "rgb(246,78,96)",
              "rgb(246,78,96)",
              "rgb(246,78,96)",
              "rgb(246,78,96)",
              "rgb(246,78,96)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } },
    }); */
  }
  cargarLocalidades() {
    this.localidadesService.getLocalidades().subscribe((data: any) => {
      this.localidades = data;
      this.cdr.markForCheck();
    });
  }
}

/* import { ChangeDetectorRef } from "@angular/core";
import { Component, ViewChild, OnInit } from "@angular/core";
import format from '../../../../../../dist/assets/plugins/formvalidation/src/js/utils/format';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  ApexTitleSubtitle,
  ApexMarkers,
} from "ng-apexcharts";

@Component({
  selector: "app-columns",
  templateUrl: "./columns.component.html",
  styleUrls: ["./columns.component.scss"],
})
export class ColumnsComponent implements OnInit {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  markers: ApexMarkers;
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.iniChartOptions();
    this.cdr.markForCheck();
  }

  private iniChartOptions(): void {
    (this.series = [
      {
        name: "Con Sintomas",
        data: [],
      },
      {
        name: "Sin Sintomas",
        data: [],
      },
    ]),
      (this.chart = {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      }),
      (this.title = {
        text: "REGISTROS DE LLAMADAS POR DIA",
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
      (this.responsive = [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ]),
      (this.plotOptions = {
        bar: {
          horizontal: false,
        },
      }),
      (this.xaxis = {
        type: "category",
        categories: ["22/OCT", "23/OCT"],
      }),
      (this.legend = {
        position: "right",
        offsetY: 40,
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: "#fff",
          fillColors: ["#E91E63", "#1de9b6", "#9C27B0"],
          radius: 12,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0,
        },
      }),
      (this.fill = {
        opacity: 1,
        colors: ["#E91E63", "#1de9b6", "#9C27B0"],
      });
  }
}
 */
