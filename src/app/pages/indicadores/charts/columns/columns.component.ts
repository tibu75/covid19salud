import { Component, Input, OnInit, AfterViewInit } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { Label } from "ng2-charts";
import { SocketService } from "src/app/services/socket/socket.service";

@Component({
  selector: "app-columns",
  templateUrl: "./columns.component.html",
  styleUrls: ["./columns.component.scss"],
})
export class ColumnsComponent implements OnInit, AfterViewInit {
  @Input() labelsLoc: any[];
  @Input() dataLoc: any[];
  paso: number = 0;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = "bar";
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];
  public chartColors: any[] = [
    {
      backgroundColor: [
        "#90caf9",
        "#64b5f6",
        "#42a5f5",
        "#2196f3",
        "#1e88e5",
        "#90caf9",
        "#64b5f6",
        "#42a5f5",
        "#2196f3",
        "#1e88e5",
        "#90caf9",
        "#64b5f6",
        "#42a5f5",
        "#2196f3",
        "#1e88e5",
        "#90caf9",
        "#64b5f6",
        "#42a5f5",
        "#2196f3",
        "#1e88e5",
      ],
    },
  ];

  public barChartData: ChartDataSets[] = [];

  constructor(private srv: SocketService) {
    console.log("Datos ingresados al CONSTRUCTOR Columns: ", this.dataLoc);
    /* if (this.data === undefined) {
      this.update();
    } */
  }
  ngAfterViewInit(): void {
    console.log("AfterInit Localidades");
    this.update();
  }

  ngOnInit(): void {
    console.log("Datos ingresados al ngOnInit Columns: ", this.dataLoc);

    this.srv.listen("dataUpdate").subscribe((res: any) => {
      console.log(res);
      this.paso = this.paso + 1;
      this.update();
    });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }

  update(): void {
    // Only Change 3 values
    console.log("Los datos llegan a Update asi: ", this.dataLoc);
    this.barChartData[0].data = this.dataLoc;
    this.barChartLabels = this.labelsLoc;
  }
}
