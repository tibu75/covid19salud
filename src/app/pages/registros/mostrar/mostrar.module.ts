import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MostrarComponent } from "./mostrar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegllamadaComponent } from "./regllamada/regllamada.component";
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: MostrarComponent,
      },
    ]),
  ],

  entryComponents: [RegllamadaComponent],
})
export class MostrarModule {}
