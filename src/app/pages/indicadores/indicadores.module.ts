import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { IndicadoresComponent } from "./indicadores.component";
import { ColumnsComponent } from "./charts/columns/columns.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { PieComponent } from "./charts/pie/pie.component";
import { PiechartComponent } from "./charts/piechart/piechart.component";
import { ColchartComponent } from "./charts/colchart/colchart.component";

@NgModule({
  declarations: [
    ColumnsComponent,
    PieComponent,
    PiechartComponent,
    ColchartComponent,
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    RouterModule.forChild([
      {
        path: "",
        component: IndicadoresComponent,
      },
    ]),
  ],
  exports: [
    ColumnsComponent,
    PieComponent,
    PiechartComponent,
    ColchartComponent,
  ],
})
export class IndicadoresModule {}
