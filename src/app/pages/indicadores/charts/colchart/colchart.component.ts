import { Component, Input, OnInit } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { Label } from "ng2-charts";
import { SocketService } from "src/app/services/socket/socket.service";
@Component({
  selector: "app-colchart",
  templateUrl: "./colchart.component.html",
  styleUrls: ["./colchart.component.scss"],
})
export class ColchartComponent implements OnInit {
  @Input() labelsFec: any;
  @Input() dataFec: any;
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

  public barChartData: ChartDataSets[] = [];
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

  constructor(private srv: SocketService) {}

  ngAfterViewInit(): void {
    this.update();
  }

  ngOnInit(): void {
    console.log("Datos ingresados al ngOnInit Columns: ", this.dataFec);

    this.srv.listen("dataUpdate").subscribe((res: any) => {
      console.log(res);
      this.update();
    });
  }

  public update(): void {
    // Only Change 3 values
    this.barChartData[0].data = this.dataFec;
    this.barChartLabels = this.labelsFec;
  }
}
