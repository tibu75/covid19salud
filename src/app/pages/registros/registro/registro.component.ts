import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import {
	FormArray,
	FormControl,
	FormGroup,
	FormBuilder,
	Validators,
} from "@angular/forms";
import { RenaperService } from "../../../services/ws/renaper.service";
import { Subscription, Observable } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
	selector: "app-registro",
	templateUrl: "./registro.component.html",
	styleUrls: ["./registro.component.scss"],
})
export class RegistroComponent implements OnInit {
	sintomas: any = {
		fecha_ini_sint: "",
		sintomas: "",
		antencedentes_p: "",
		enfermedad_pre: "",
		toma_medicamentos: "",
		vivienda_personas: "",
	};

	closeResult: string;
	personaForm: FormGroup;
	data: any = {};
	public cargar_datos: boolean = false;
	public buscar_datos: boolean = true;
	sololectura: boolean;

	private unsubscribe: Subscription[] = [];
	constructor(
		public _renaperService: RenaperService,
		private router: Router,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private toast: ToastrService
	) {}

	ngOnInit(): void {
		this.initForm();
	}

	initForm(datos?) {
		this.personaForm = this.fb.group({
			nroRegistro: ["", Validators.required],
			fecha: ["", Validators.required],
			tipo_registro: ["", Validators.required],
			motivo_consulta: [
				"",
				[Validators.required, Validators.maxLength(500)],
			],
			persona: this.fb.group({
				nombre: [datos ? datos.nombres : "", Validators.required],
				apellido: [datos ? datos.apellido : "", Validators.required],
				documento: [datos ? datos.documento : "", Validators.required],
				fechaNacimiento: [
					datos ? datos.fechaNacimiento : "",
					Validators.required,
				],
				sexo: [datos ? datos.sexo : "", Validators.required],
				telefono: ["", [Validators.required, Validators.maxLength(10)]],
				telefono2: [
					"",
					[Validators.required, Validators.maxLength(10)],
				],
				calle: [
					datos ? datos.calle : "",
					[Validators.required, Validators.maxLength(20)],
				],
				numero: [
					datos ? datos.numero : "",
					[Validators.required, Validators.maxLength(4)],
				],
				departamento: [
					datos ? datos.departamento : "",
					[Validators.required, Validators.maxLength(5)],
				],
				piso: [
					datos ? datos.pais : "",
					[Validators.required, Validators.maxLength(2)],
				],
				localidad: [
					datos ? datos.localidad : "",
					[Validators.required, Validators.maxLength(50)],
				],
				cpostal: [
					datos ? datos.cpostal : "",
					[Validators.required, Validators.maxLength(4)],
				],
				provincia: [
					datos ? datos.provincia : "",
					[Validators.required, Validators.maxLength(25)],
				],
				pais: [
					datos ? datos.pais : "",
					[Validators.required, Validators.maxLength(25)],
				],
				img: [datos ? datos.foto : "", Validators.required],
			}),
			fecha_ini_sint: [this.sintomas.fecha_ini_sint, Validators.required],
			sintomas: [datos ? datos.sintomas : "", Validators.required],
			antencedentes_p: [
				datos ? datos.antencedentes_p : "",
				Validators.required,
			],
			enfermedad_pre: [
				datos ? datos.enfermedad_pre : "",
				Validators.required,
			],
			toma_medicamentos: [
				datos ? datos.toma_medicamentos : "",
				Validators.required,
			],
			vivienda_personas: [
				datos ? datos.vivienda_personas : "",
				[Validators.required],
			],
			trabajo: this.fb.array([this.buildTrabajo()]),
			usuario: new FormControl(datos ? datos.usuario : "", [
				Validators.required,
			]),
		});
		console.log(this.personaForm);
	}

	buildTrabajo() {
		return this.fb.group({
			lugar: ["", Validators.required, Validators.maxLength(50)],
			telefonol: ["", Validators.required, Validators.maxLength(10)],
			callel: ["", Validators.required, Validators.maxLength(25)],
			numerol: ["", Validators.required, Validators.maxLength(4)],
			localidadl: ["", Validators.required, Validators.maxLength(25)],
		});
	}

	async renaper() {
		let params = `documento=${
			this.personaForm.get("persona.documento").value
		}&sexo=${this.personaForm.get("persona.sexo").value}`;

		this._renaperService.getPersona(params).subscribe((data: any) => {
			console.log(data.datos);
			if (data.datos.ID_TRAMITE_PRINCIPAL !== 0) {
				this.buscar_datos = false;
				this.cargar_datos = true;
				data.datos.documento = this.personaForm.get(
					"persona.documento"
				).value;
				data.datos.sexo = this.personaForm.get("persona.sexo").value;
				this.initForm(data.datos);
				this.cdr.markForCheck();
			} else {
				this.toast.error(
					"Persona No encontrada, por favor Verifique los datos ingresados."
				);
			}
		});
	}

	submit() {
		// Acá están todos los datos del formulario para guardar en la BD
		let datosPersona = this.personaForm.value;

		console.log(datosPersona);
		this.router.navigateByUrl("/registros");
	}
}
