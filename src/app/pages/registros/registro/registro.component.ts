import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { RenaperService } from "../../../services/ws/renaper.service";
import {PersonaService} from "../../../services/persona/persona.service"
import { Subscription, Observable, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LocalidadesService } from "./../../../services/localidades/localidades.service";
import { Form0800Service } from "./../../../services/form0800/form0800.service";
import { Localidades } from "../../models/localidades";

import * as moment from "moment";
import { debounce, debounceTime } from "rxjs/operators";


@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
})
export class RegistroComponent implements OnInit {
  //Formulario
  personaForm: FormGroup;
  sintomas = "No";
  con_caso_sos = "No";
  enf_actual = "No";
  convivientes = "No";
  intervencion = "No";
  cri_hisopado = "No";
  mov_propia = "Si";
  der_enfermeria = "No";
  sol_hisopado = "No";
  cer_5dias = "No";
  cer_contacto = "No";
  cas_positivo = "No";
  laboratorio = "Privado";
  whatsapp = "No";

  fecha_ini_sint = "";
  antencedentes_p = "No";
  toma_medicamentos = "";
  vivienda_personas = "";

  sexo = "M";
  tipo_registro = "Sin Sintomas";
  realizo_hisopado = "No";

  atencion_domiciliaria = "No";
  cert_aislamiento = "No";
  resultado_hisopado = "No";
  derivacion_107 = "No";
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
  data: any = {};
  public cargar_datos: boolean = false;
  public buscar_datos: boolean = true;
  public guardar: boolean = false;
  public sololectura: boolean;
  private unsubscribe: Subscription[] = [];
  public localidades: Localidades[] = [];

  constructor(
    public _renaperService: RenaperService,
    public _personaService: PersonaService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private toast: ToastrService,
    private formService: Form0800Service,
    private localidadesService: LocalidadesService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
    this.initForm();
  }

  ngOnInit(): void {
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
      persona: this.fb.group({
        nombre: [datos ? datos.nombres : ""],
        apellido: [datos ? datos.apellido : ""],
        documento: [datos ? datos.documento : "",[Validators.required, Validators.maxLength(8)]],
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
        localidad: ["", Validators.required],
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
      llamada: this.fb.group({
        nroForm: ["", Validators.required],
        fecha: ["", Validators.required],
        motivo: ["", Validators.required],
        sintomas: ["No", Validators.required],
        fec_sintomas: ["", Validators.required],
        sin_actuales: ["", Validators.required],
        con_caso_sos: ["No", Validators.required],
        ant_personales: ["", Validators.required],
        enf_actual: ["No", Validators.required],
        tratamiento: ["No", Validators.required],
        convivientes: ["No", Validators.required],
        cant_convivientes: ["", Validators.required],
        obs_convivientes: ["", Validators.required],
        sit_social: ["", Validators.required],
        intervencion: ["No", Validators.required],
        obs_intervencion: ["", Validators.required],
        cri_hisopado: ["No", Validators.required],
        com_hisopado: ["No", Validators.required],
        mov_propia: ["Si", Validators.required],
        der_enfermeria: ["No", Validators.required],
        disp_contacto: ["", Validators.required],
        sol_hisopado: ["No", Validators.required],
        lug_hisopado: ["", Validators.required],
        fec_hisopado: ["", Validators.required],
        req_extender: ["No", Validators.required],
        cer_aislamiento: ["", Validators.required],
        cer_5dias: ["", Validators.required],
        cer_contacto: ["No", Validators.required],
        tip_contacto: ["Social", Validators.required],
        tip_contacto_obs: ["", Validators.required],
        cas_positivo: ["No", Validators.required],
        dat_positivo: ["", Validators.required],
        otro_certificado: ["", Validators.required],
        seg_domiciliario: ["No", Validators.required],
        laboratorio: ["Privado", Validators.required],
        whatsapp: ["No", Validators.required],
        det_requerimiento: ["", Validators.required],
        fec_salud: ["", Validators.required],
        usuario: ["", Validators.required],
        cierre_contacto: ["", Validators.required],
      }),
      trabajo: this.fb.group({
        lugar: ["", [Validators.required, Validators.maxLength(50)]],
        telefono: [
          "",
          [
            Validators.required,
            Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
          ],
        ],
        calle: ["", [Validators.required, Validators.maxLength(25)]],
        numero: ["", [Validators.required, Validators.maxLength(4)]],
        localidad: ["", [Validators.required, Validators.maxLength(25)]],
      }),
    });
    this.personaForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      console.log(value);
    });
    //  //console.log(this.personaForm);
  }

  renaper() {
    this.isLoadingSubject.next(true);
    let params = `documento=${
      this.personaForm.get("persona.documento").value
    }&sexo=${this.personaForm.get("persona.sexo").value}`;

    this._personaService.getPersona(params).subscribe((data: any) => {
     // console.log("Datos Renaper", data);
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
  get campoDocumento() {
    return this.personaForm.get("persona.documento");
  }
  get campoTelefono() {
    return this.personaForm.get("persona.telefono");
  }
  get campoMotivo() {
    return this.personaForm.get("llamada.motivo");
  }
  get campoFecha() {
    return this.personaForm.get("llamada.fec_sintomas");
  }
  get campoLocalidad() {
    return this.personaForm.get("persona.localidad");
  }
 

  guardarForm(event: Event) {
    event.preventDefault();
    // Acá están todos los datos del formulario para guardar en la BD
    this.personaForm.patchValue({ usuario: sessionStorage.getItem("ID") });

    let datosPersona = this.personaForm.value;
    console.log("Datos de la Persona: ", datosPersona);

    if (this.personaForm.valid) {
      this.formService.crearForm(datosPersona).subscribe((data) => {
        /* 
				let pepe = data; // Eliminar esta línea si anda todo bien */
      });
      this.router.navigate(["/registros"]);
    } else {
      this.personaForm.markAllAsTouched();
      //console.log(this.personaForm);
    }
    // this.router.navigateByUrl('/registros');
  }
}
