import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ExportarComponent } from "./exportar.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",

        component: ExportarComponent,
      },
    ]),
  ],
})
export class ExportarModule {}
