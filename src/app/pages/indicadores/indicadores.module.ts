import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { IndicadoresComponent } from "./indicadores.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: IndicadoresComponent,
      },
    ]),
  ],
})
export class IndicadoresModule {}
