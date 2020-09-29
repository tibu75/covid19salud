import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RenaperService } from "../../../services/ws/renaper.service";
import { Subscription, Observable, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LocalidadesService } from "./../../../services/localidades/localidades.service";
import { Form0800Service } from "./../../../services/form0800/form0800.service";
import { Localidades } from "../../models/localidades";

import * as moment from "moment";

@Component({
	selector: "app-registro",
	templateUrl: "./registro.component.html",
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

	atencion_domiciliaria = "No";
	cert_aislamiento = "No";
	resultado_hisopado = "No";
	derivacion_107 = "No";
	mov_propia = "No";
	obs_atencion_domiciliaria = "";
	obs_cert_aislamiento = "";
	obs_resultado_hisopado = "";
	obs_derivacion_107 = "";
	obs_mov_propia = "";
	
	edad;
	mostrarEdad;
	private isLoadingSubject: BehaviorSubject<boolean>;
	public isLoading$: Observable<boolean>;
	public fechahoy: string = moment().format("YYYY-MM-DD");
	public fechamin: string = "2020-03-01";
	closeResult: string;
	personaForm: FormGroup;
	data: any = {};
	public cargar_datos: boolean = true;
	public buscar_datos: boolean = true;
	public guardar: boolean = false;
	sololectura: boolean;
	private unsubscribe: Subscription[] = [];
	public localidades: Localidades[] = [];

	constructor(
		public _renaperService: RenaperService,
		private router: Router,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private toast: ToastrService,
		private formService: Form0800Service,
		private localidadesService: LocalidadesService
	) {
		this.isLoadingSubject = new BehaviorSubject<boolean>(false);
		this.isLoading$ = this.isLoadingSubject.asObservable();
	}

	ngOnInit(): void {
		this.initForm();
		this.cargarLocalidades();
	}

	cargarLocalidades() {
		this.localidadesService.getLocalidades().subscribe((data: any) => {
			this.localidades = data;
			this.cdr.markForCheck();
		});
	}

	calcularEdad() {
		if (this.edad) {
			const convertAge = new Date(this.edad);
			const timeDiff = Math.abs(Date.now() - convertAge.getTime());
			this.mostrarEdad = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
			this.personaForm.patchValue({ persona: { edad: this.mostrarEdad } });
			//console.log(this.personaForm);
		}
	}

	initForm(datos?) {
		this.personaForm = this.fb.group({
			tipo_registro: ["Sin Sintomas", Validators.required],
			motivo_consulta: ["", [Validators.required, Validators.maxLength(500)]],
			persona: this.fb.group({
				nombre: [datos ? datos.nombres : ""],
				apellido: [datos ? datos.apellido : ""],
				documento: [datos ? datos.documento : ""],
				fechaNacimiento: [
					datos ? datos.fechaNacimiento : "",
					Validators.required,
				],
				edad: ["", Validators.required],
				sexo: [datos ? datos.sexo : "M"],
				telefono: [
					"",
					[
						Validators.required,
						Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
					],
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
					datos ? datos.piso : "",
					[Validators.required, Validators.maxLength(2)],
				],
				localidad: [datos ? datos.ciudad : ["", Validators.required]],
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
				img: [datos ? datos.foto : ""],
			}),
			fecha_ini_sint: ["", Validators.required],
			sintomas: ["", Validators.required],
			antencedentes_p: ["", Validators.required],
			enfermedad_pre: ["", Validators.required],
			toma_medicamentos: ["", Validators.required],
			vivienda_personas: ["", [Validators.required]],
			trabajo: this.fb.group({
				lugar: ["", [Validators.required, Validators.maxLength(50)]],
				telefonol: [
					"",
					[
						Validators.required,
						Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
					],
				],
				callel: ["", [Validators.required, Validators.maxLength(25)]],
				numerol: ["", [Validators.required, Validators.maxLength(4)]],
				localidadl: ["", [Validators.required, Validators.maxLength(25)]],
			}),
			atencion_domiciliaria: ["No", Validators.required],
			obs_atencion_domiciliaria: ["", Validators.required],
			cert_aislamiento: ["No", Validators.required],
			obs_cert_aislamiento: ["", Validators.required],
			resultado_hisopado: ["No", Validators.required],
			obs_resultado_hisopado: ["", Validators.required],
			derivacion_107: ["No", Validators.required],
			obs_derivacion_107: ["", Validators.required],
			mov_propia: ["No", Validators.required],
			obs_mov_propia: ["", Validators.required],
			realizo_hisopado: ["No", Validators.required],
			lugar_hisopado: ["", Validators.required],
			fecha_hisopado: ["", Validators.required],
			cierre_contacto: ["", [Validators.required, Validators.maxLength(500)]],
			usuario: ["", Validators.required],
		});
		//  //console.log(this.personaForm);
	}

	renaper() {
		this.isLoadingSubject.next(true);
		let params = `documento=${
			this.personaForm.get("persona.documento").value
		}&sexo=${this.personaForm.get("persona.sexo").value}`;

		this._renaperService.getPersona(params).subscribe((data: any) => {
			// //console.log("Datos Renaper");
			////console.log(data.datos);
			if (data.datos.ID_TRAMITE_PRINCIPAL !== 0) {
				this.buscar_datos = false;
				this.cargar_datos = true;
				this.isLoadingSubject.next(false);
				this.cdr.markForCheck();
				data.datos.documento = this.personaForm.get("persona.documento").value;
				data.datos.sexo = this.personaForm.get("persona.sexo").value;
				this.initForm(data.datos);
				this.edad = this.personaForm.get("persona.fechaNacimiento").value;
				this.calcularEdad();
			} else {
				this.toast.error(
					"Persona No encontrada, por favor Verifique los datos ingresados."
				);
				this.isLoadingSubject.next(false);
			}
		});
	}
	get telNoValido() {
		return (
			this.personaForm.get("persona.telefono").invalid &&
			this.personaForm.get("persona.telefono").enabled
		);
	}
	get motivoNoValido() {
		return (
			this.personaForm.get("motivo_consulta").invalid &&
			this.personaForm.get("motivo_consulta").enabled
		);
	}
	get fechaNoValido() {
		return this.personaForm.get("fecha_ini_sint").invalid;
	}
	get fechahisoNoValido() {
		return this.personaForm.get("fecha_hisopado").invalid;
	}
	get conviveNoValido() {
		return this.personaForm.get("vivienda_personas").invalid;
	}
	get lugarhisoNoValido() {
		return this.personaForm.get("lugar_hisopado").invalid;
	}
	get cierreNoValido() {
		return this.personaForm.get("cierre_contacto").invalid;
	}
	get sintomaNoValido() {
		return this.personaForm.get("sintomas").invalid;
	}
	get medicamentoNoValido() {
		return this.personaForm.get("toma_medicamentos").invalid;
	}
	get enfermedadNoValido() {
		return this.personaForm.get("enfermedad_pre").invalid;
	}
	get antecedentesNoValido() {
		return this.personaForm.get("antencedentes_p").invalid;
	}

	validar() {
		if (
			this.tipo_registro === "Sin Sintomas" &&
			this.realizo_hisopado === "No" &&
			this.personaForm.get("motivo_consulta").value !== "" &&
			this.personaForm.get("cierre_contacto").value !== "" &&
			this.personaForm.get("persona.telefono").value !== ""
		) {
			this.submit();
		} else if (
			this.tipo_registro === "Sintomas" &&
			this.realizo_hisopado === "No" &&
			this.personaForm.get("motivo_consulta").value !== "" &&
			this.personaForm.get("cierre_contacto").value !== "" &&
			this.personaForm.get("persona.telefono").value !== "" &&
			this.personaForm.get("fecha_ini_sint").value !== "" &&
			this.personaForm.get("sintomas").value !== "" &&
			this.personaForm.get("antencedentes_p").value !== "" &&
			this.personaForm.get("enfermedad_pre").value !== "" &&
			this.personaForm.get("toma_medicamentos").value !== "" &&
			this.personaForm.get("vivienda_personas").value !== ""
		) {
			this.submit();
		} else if (
			this.tipo_registro === "Sintomas" &&
			this.realizo_hisopado === "Si" &&
			this.personaForm.get("motivo_consulta").value !== "" &&
			this.personaForm.get("cierre_contacto").value !== "" &&
			this.personaForm.get("persona.telefono").value !== "" &&
			this.personaForm.get("fecha_ini_sint").value !== "" &&
			this.personaForm.get("sintomas").value !== "" &&
			this.personaForm.get("antencedentes_p").value !== "" &&
			this.personaForm.get("enfermedad_pre").value !== "" &&
			this.personaForm.get("toma_medicamentos").value !== "" &&
			this.personaForm.get("vivienda_personas").value !== "" &&
			this.personaForm.get("lugar_hisopado").value !== "" &&
			this.personaForm.get("fecha_hisopado").value !== ""
		) {
			this.submit();
		} else if (
			this.tipo_registro === "Sin Sintomas" &&
			this.realizo_hisopado === "Si" &&
			this.personaForm.get("motivo_consulta").value !== "" &&
			this.personaForm.get("cierre_contacto").value !== "" &&
			this.personaForm.get("persona.telefono").value !== "" &&
			this.personaForm.get("lugar_hisopado").value !== "" &&
			this.personaForm.get("fecha_hisopado").value !== ""
		) {
			this.submit();
		} else {
			this.toast.error(
				"Faltan algunos datos por completar, por favor Verifique los datos ingresados."
			);
		}
	}

	submit() {
		// Acá están todos los datos del formulario para guardar en la BD
		this.personaForm.patchValue({ usuario: sessionStorage.getItem("ID") });

		let datosPersona = this.personaForm.value;
		console.log(datosPersona);

		/* if (this.personaForm.valid) { */
		this.formService.crearForm(datosPersona).subscribe((data) => {
			/* 
				let pepe = data; // Eliminar esta línea si anda todo bien */
		});
		this.router.navigate(["/registros"]);
		/* } else {
			//console.log(this.personaForm);
		} */
		// this.router.navigateByUrl('/registros');
	}
}
