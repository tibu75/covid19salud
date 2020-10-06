import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LlamadaComponent } from "./llamada.component";
import { RouterModule } from "@angular/router";

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: "",
				component: LlamadaComponent,
			},
		]),
	],
})
export class LlamadaModule {}
