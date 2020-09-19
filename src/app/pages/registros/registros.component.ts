import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Form0800Service } from "../../services/form0800/form0800.service";
import { Forms } from '../models/form0800covid';

@Component({
	selector: "app-registros",
	templateUrl: "./registros.component.html",
	styleUrls: [],
})
export class RegistrosComponent implements OnInit {
	public cargando: boolean = true;
	public form: Forms[] = [];
	soloLectura: boolean;
	data: any = {};

	constructor(
		private form0800Service: Form0800Service,
		private cdr: ChangeDetectorRef,
		
		) {}

	ngOnInit(): void {
		this.cargarForms();
	}

	cargarForms() {
	this.form0800Service.getForms().subscribe((data:any) => 
		{	//debugger
			this.form=data.forms;
			this.cdr.markForCheck();});
			this.soloLectura = true;
	}
}
