import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { IndicadoresComponent } from "./indicadores.component";
import { ColumnsComponent } from "./charts/columns/columns.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { PieComponent } from "./charts/pie/pie.component";

@NgModule({
  declarations: [ColumnsComponent, PieComponent],
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
  exports: [ColumnsComponent, PieComponent],
})
export class IndicadoresModule {}
