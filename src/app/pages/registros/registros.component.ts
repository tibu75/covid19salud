import { Component, OnInit } from "@angular/core";
import { Form0800 } from "../../interfaces/form0800Interface";
import { Form0800Service } from "../../services/form0800/form0800.service";

@Component({
	selector: "app-registros",
	templateUrl: "./registros.component.html",
	styleUrls: [],
})
export class RegistrosComponent implements OnInit {
	public cargando: boolean = true;
	public form0800: Form0800[] = [];
	soloLectura: boolean;
	data: any = {};

	constructor(private form0800Service: Form0800Service) {}

	ngOnInit(): void {
		this.cargarForms();
	}

	cargarForms() {
		this.form0800Service.getForms().subscribe((data) => (this.form0800 = data));
		this.soloLectura = true;
		console.log(this.form0800);
	}
}
