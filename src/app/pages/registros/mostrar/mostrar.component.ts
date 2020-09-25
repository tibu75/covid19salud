import {
	Component,
	OnInit,
	ChangeDetectorRef,
	AfterViewInit,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MostrarService } from "src/app/services/mostrar/mostrar.service";

@Component({
	selector: "app-mostrar",
	templateUrl: "./mostrar.component.html",
	styleUrls: ["./mostrar.component.scss"],
})
export class MostrarComponent implements OnInit, AfterViewInit {
	closeResult: string;
	personaForm: FormGroup;
	data: any = {};
	edad: string = "";
	mostrarEdad: number;
	public mostrar_hisopado: boolean = false;
	public mostrar_sintomas: boolean = false;
	public cargar_datos: boolean = true;

	sololectura: boolean;

	constructor(
		private router: Router,
		private fb: FormBuilder,
		public mostrarForm: MostrarService,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.initForm();
	}
	ngAfterViewInit(): void {
		this.initForm();
	}

	initForm() {
		this.personaForm = this.fb.group({
			tipo_registro: [this.mostrarForm.registro.tipo_registro],
			motivo_consulta: [this.mostrarForm.registro.motivo_consulta],
			persona: this.fb.group({
				nombre: [this.mostrarForm.registro.persona.nombre],
				apellido: [this.mostrarForm.registro.persona.apellido],
				documento: [this.mostrarForm.registro.persona.documento],
				fechaNacimiento: [this.mostrarForm.registro.persona.fechaNacimiento],
				edad: [this.mostrarForm.registro.persona.edad],
				sexo: [this.mostrarForm.registro.persona.sexo],
				telefono: [this.mostrarForm.registro.persona.telefono],
				calle: [this.mostrarForm.registro.persona.calle],
				numero: [this.mostrarForm.registro.persona.numero],
				departamento: [this.mostrarForm.registro.persona.departamento],
				piso: [this.mostrarForm.registro.persona.piso],
				localidad: [this.mostrarForm.registro.persona.localidad],
				cpostal: [this.mostrarForm.registro.persona.cpostal],
				provincia: [this.mostrarForm.registro.persona.provincia],
				pais: [this.mostrarForm.registro.persona.pais],
				img: [this.mostrarForm.registro.persona.img],
			}),
			fecha_ini_sint: [this.mostrarForm.registro.fecha_ini_sint],
			sintomas: [this.mostrarForm.registro.sintomas],
			antencedentes_p: [this.mostrarForm.registro.antencedentes_p],
			enfermedad_pre: [this.mostrarForm.registro.enfermedad_pre],
			toma_medicamentos: [this.mostrarForm.registro.toma_medicamentos],
			vivienda_personas: [this.mostrarForm.registro.vivienda_personas],
			trabajo: this.fb.group({
				lugar: [this.mostrarForm.registro.trabajo.lugar],
				telefonol: [this.mostrarForm.registro.trabajo.telefonol],
				callel: [this.mostrarForm.registro.trabajo.callel],
				numerol: [this.mostrarForm.registro.trabajo.numerol],
				localidadl: [this.mostrarForm.registro.trabajo.localidadl],
			}),
			atencion_domiciliaria: [this.mostrarForm.registro.atencion_domiciliaria],
			cert_aislamiento: [this.mostrarForm.registro.cert_aislamiento],
			resultado_hisopado: [this.mostrarForm.registro.resultado_hisopado],
			derivacion_107: [this.mostrarForm.registro.derivacion_107],
			mov_propia: [this.mostrarForm.registro.mov_propia],
			realizo_hisopado: [this.mostrarForm.registro.realizo_hisopado],
			lugar_hisopado: [this.mostrarForm.registro.lugar_hisopado],
			fecha_hisopado: [this.mostrarForm.registro.fecha_hisopado],
			cierre_contacto: [this.mostrarForm.registro.cierre_contacto],
			usuario: [this.mostrarForm.registro.usuario],
		});
		console.log("esto se cargo");
		console.log(this.personaForm);
		this.edad = this.mostrarForm.registro.persona.fechaNacimiento;
		console.log(this.edad);
		console.log(this.mostrar_sintomas, this.mostrar_hisopado);
		this.calcularEdad();
		this.cdr.markForCheck();
	}

	calcularEdad() {
		if (this.edad) {
			const convertAge = new Date(this.edad);
			const timeDiff = Math.abs(Date.now() - convertAge.getTime());
			this.mostrarEdad = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
			this.personaForm.patchValue({ persona: { edad: this.mostrarEdad } });
		}
	}
	Volver() {
		this.router.navigate(["/registros"]);
	}
}