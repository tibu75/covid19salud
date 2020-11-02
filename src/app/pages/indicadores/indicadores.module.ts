import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { IndicadoresComponent } from "./indicadores.component";
import { ColumnsComponent } from "./charts/columns/columns.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { PiechartComponent } from "./charts/piechart/piechart.component";
import { ColchartComponent } from "./charts/colchart/colchart.component";
import { ChartsModule } from "ng2-charts";

@NgModule({
  declarations: [ColumnsComponent, PiechartComponent, ColchartComponent],
  imports: [
    CommonModule,
    NgApexchartsModule,
    ChartsModule,
    RouterModule.forChild([
      {
        path: "",
        component: IndicadoresComponent,
      },
    ]),
  ],
  exports: [ColumnsComponent, PiechartComponent, ColchartComponent],
})
export class IndicadoresModule {}
