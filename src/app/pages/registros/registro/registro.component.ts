import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RenaperService } from "../../../services/ws/renaper.service";
import { Subscription, Observable } from "rxjs";

import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { Form0800Service } from "./../../../services/form0800/form0800.service";

@Component({
	selector: "app-registro",
	templateUrl: "./registro.component.html",
	styleUrls: ["./registro.component.scss"],
})
export class RegistroComponent implements OnInit {
	fecha_ini_sint = "";
	sintomas = "";
	antencedentes_p = "No";
	enfermedad_pre = "";
	toma_medicamentos = "";
	vivienda_personas = "";

	sexo = "M";
	tipo_registro = "Sin Sintomas";
	realizo_hisopado = "No";
	edad;
	mostrarEdad;

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
		private toast: ToastrService,
		private formService: Form0800Service
	) {}

	ngOnInit(): void {
		this.initForm();
	}

	calcularEdad() {
		if (this.edad) {
			const convertAge = new Date(this.edad);
			const timeDiff = Math.abs(Date.now() - convertAge.getTime());
			this.mostrarEdad = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
		}
	}

	initForm(datos?) {
		this.personaForm = this.fb.group({
			nroRegistro: ["", Validators.required],
			fecha: ["", Validators.required],
			tipo_registro: ["Sin Sintomas", Validators.required],
			motivo_consulta: ["", [Validators.required, Validators.maxLength(500)]],
			persona: this.fb.group({
				nombre: [datos ? datos.nombres : "", Validators.required],
				apellido: [datos ? datos.apellido : "", Validators.required],
				documento: [datos ? datos.documento : "", Validators.required],
				fechaNacimiento: [
					datos ? datos.fechaNacimiento : "",
					Validators.required,
				],
				sexo: [datos ? datos.sexo : "M", Validators.required],
				telefono: ["", [Validators.required, Validators.maxLength(10)]],
				telefono2: ["", [Validators.required, Validators.maxLength(10)]],
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
					datos ? datos.piso : "",
					[Validators.required, Validators.maxLength(2)],
				],
				localidad: [
					datos ? datos.ciudad : "",
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
			fecha_ini_sint: [datos ? datos.fecha_ini_sint : "", Validators.required],
			antencedentes_p: [
				datos ? datos.antencedentes_p : "",
				Validators.required,
			],
			enfermedad_pre: [datos ? datos.enfermedad_pre : "", Validators.required],
			toma_medicamentos: [
				datos ? datos.toma_medicamentos : "No",
				Validators.required,
			],
			vivienda_personas: [
				datos ? datos.vivienda_personas : "",
				[Validators.required],
			],
			trabajo: this.fb.group({
				lugar: ["", [Validators.required, Validators.maxLength(50)]],
				telefonol: ["", [Validators.required, Validators.maxLength(10)]],
				callel: ["", [Validators.required, Validators.maxLength(25)]],
				numerol: ["", [Validators.required, Validators.maxLength(4)]],
				localidadl: ["", [Validators.required, Validators.maxLength(25)]],
			}),

			atencion_domiciliaria: [
				datos ? datos.atencion_domiciliaria : "",
				Validators.required,
			],
			cert_aislamiento: [
				datos ? datos.cert_aislamiento : "",
				Validators.required,
			],
			resultado_hisopado: [
				datos ? datos.resultado_hisopado : "",
				Validators.required,
			],
			derivacion_107: [datos ? datos.derivacion_107 : "", Validators.required],
			mov_propia: [datos ? datos.mov_propia : "", Validators.required],
			realizo_hisopado: ["No", Validators.required],
			lugar_hisopado: [""],
			fecha_hisopado: [""],
			cierre_contacto: [
				datos ? datos.cierre_contacto : "",
				Validators.required,
			],
			usuario: [datos ? datos.usuario : "", Validators.required],
		});
		console.log(this.personaForm);
	}

	renaper() {
		let params = `documento=${
			this.personaForm.get("persona.documento").value
		}&sexo=${this.personaForm.get("persona.sexo").value}`;

		this._renaperService.getPersona(params).subscribe((data: any) => {
			console.log("Datos Renaper");
			console.log(data.datos);
			if (data.datos.ID_TRAMITE_PRINCIPAL !== 0) {
				this.buscar_datos = false;
				this.cargar_datos = true;
				data.datos.documento = this.personaForm.get("persona.documento").value;
				data.datos.sexo = this.personaForm.get("persona.sexo").value;
				this.initForm(data.datos);
				this.edad = this.personaForm.get("persona.fechaNacimiento").value;
				this.calcularEdad();
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
		this.personaForm.patchValue({ usuario: sessionStorage.getItem("ID") });
		if (this.personaForm.get("atencion_domiciliaria").value) {
			this.personaForm.patchValue({ atencion_domiciliaria: "Si" });
		} else {
			this.personaForm.patchValue({ atencion_domiciliaria: "No" });
		}
		if (this.personaForm.get("cert_aislamiento").value) {
			this.personaForm.patchValue({ cert_aislamiento: "Si" });
		} else {
			this.personaForm.patchValue({ cert_aislamiento: "No" });
		}
		if (this.personaForm.get("resultado_hisopado").value) {
			this.personaForm.patchValue({ resultado_hisopado: "Si" });
		} else {
			this.personaForm.patchValue({ resultado_hisopado: "No" });
		}
		if (this.personaForm.get("derivacion_107").value) {
			this.personaForm.patchValue({ derivacion_107: "Si" });
		} else {
			this.personaForm.patchValue({ derivacion_107: "No" });
		}
		if (this.personaForm.get("mov_propia").value) {
			this.personaForm.patchValue({ mov_propia: "Si" });
		} else {
			this.personaForm.patchValue({ mov_propia: "No" });
		}
		let datosPersona = this.personaForm.value;
		console.log(datosPersona);
		this.formService.crearForm(datosPersona).subscribe((data) => {
			let pepe = data; // Eliminar esta línea si anda todo bien
		});
		this.router.navigate(["/registros"]);
		console.log(datosPersona);
		// this.router.navigateByUrl('/registros');
	}
}
