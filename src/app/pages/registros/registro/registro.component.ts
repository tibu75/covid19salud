import {
  Component,
  OnInit,
  ChangeDetectorRef,
  NgModule,
  ViewChild,
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";

import { RenaperService } from "../../../services/ws/renaper.service";
import { PersonaService } from "../../../services/persona/persona.service";
import { Subscription, Observable, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LocalidadesService } from "./../../../services/localidades/localidades.service";

import { Localidades } from "../../models/localidades";
import { opc_form } from "../../../interfaces/opc_form.interface";

import * as moment from "moment";
import { debounceTime } from "rxjs/operators";
import { Reg0800Service } from "src/app/services/reg0800/reg0800.service";

import { GeolocationService } from "../../../services/geomap/geolocation.service";
import { reduceTicks } from "@swimlane/ngx-charts";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
})
export class RegistroComponent implements OnInit {
  //Formulario
  opc_Forms: opc_form = { op1: "covid", op2: "vacuna" };
  personaForm: FormGroup;
  vacunaForm: FormGroup;

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
  req_seguimiento = "No";
  laboratorio = "Privado";
  whatsapp = "No";
  antencedentes_p = "No";
  toma_medicamentos = "";
  vivienda_personas = "";
  nombre = "";
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

  vac_factor_riesgo_patologias = "No";
  vac_obs_factor = "";
  vac_tratamiento = "No";
  vac_especificar = "";
  vac_medicacion = "";
  vac_tratamiento_plasma = "No";
  vac_estudios_rutina = "No";
  vac_obs_est_rut = "";
  vac_gripe_camp_ant = "No";
  vac_enfermedad_covid = "No";
  vac_covid_cuando;
  vac_suministro_vac = "No";
  vac_efector;
  vac_que_dosis = "primera";
  vac_sintomas_adm_vac;
  vac_cierre_contacto;

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
  public errorMessage: string;
  public cargar_form: string;

  constructor(
    public _renaperService: RenaperService,
    public _personaService: PersonaService,
    public _registroService: Reg0800Service,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private toast: ToastrService,
    private localidadesService: LocalidadesService,
    private geolocationService: GeolocationService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
    this.initForm();
    this.vacForm();
    this.activarInicio();
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.cargarLocalidades();
    this.cdr.markForCheck();
    this.toast.warning(
      "Usted esta por modificar una Base de Datos de Provincia. Tenga precaución con los datos consultados.",
      "AVISO IMPORTANTE",
      {
        timeOut: 7000,
        positionClass: "toast-top-center",
      }
    );
  }
  show_form(opciones) {
    let op = opciones;
    if (op === this.opc_Forms.op1) {
      this.cargar_form = op;
    } else if (op === this.opc_Forms.op2) {
      this.cargar_form = op;
    }
    console.log("show_Form", this.cargar_form);
  }
  cargarGeolocation(personaForm) {
    // console.log(personaForm);
    this.geolocationService.openGeolocation();
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
      this.vacunaForm.patchValue({ persona: { edad: this.mostrarEdad } });
      //console.log(this.personaForm);
    }
  }

  initForm(datos?) {
    this.personaForm = this.fb.group({
      persona: this.fb.group({
        nombre: [datos ? datos.nombres : ""],
        apellido: [datos ? datos.apellido : ""],
        documento: [
          datos ? datos.documento : "",
          [Validators.required, Validators.maxLength(8)],
        ],
        fechaNacimiento: [datos ? datos.fechaNacimiento : ""],
        edad: [""],
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
          [Validators.required, Validators.maxLength(50)],
        ],
        numero: [
          datos ? datos.numero : "-",
          [Validators.required, Validators.maxLength(4)],
        ],
        departamento: [
          datos ? datos.departamento : "-",
          [Validators.required, Validators.maxLength(5)],
        ],
        piso: [
          datos ? datos.piso : "-",
          [Validators.required, Validators.maxLength(5)],
        ],
        cpostal: [
          datos ? datos.cpostal : "",
          [Validators.required, Validators.maxLength(4)],
        ],
        localidad: ["", [Validators.required]],
        provincia: [
          datos ? datos.provincia : "",
          [Validators.required, Validators.maxLength(30)],
        ],
        pais: [
          datos ? datos.pais : "",
          [Validators.required, Validators.maxLength(30)],
        ],
        img: [datos ? datos.foto : ""],
      }),
      llamada: this.fb.group({
        nroForm: [null],
        fecha: [""],
        opc_form: [""],
        tipo_llamada: ["Entrada"],
        motivo: ["", [Validators.required]],
        sintomas: ["No"],
        fec_sintomas: [{ value: "", disabled: true }, [Validators.required]],
        sin_actuales: [{ value: "", disabled: true }, [Validators.required]],
        con_caso_sos: ["No"],
        obs_contacto: [{ value: "", disabled: true }, [Validators.required]],
        obra_social: ["", [Validators.required]],
        enf_actual: ["No"],
        obs_enfermedad: [{ value: "", disabled: true }, [Validators.required]],
        tratamiento: [{ value: "No", disabled: true }, [Validators.required]],
        convivientes: ["No"],
        cant_convivientes: [
          { value: "", disabled: true },
          [Validators.required],
        ],
        obs_convivientes: [
          { value: "", disabled: true },
          [Validators.required],
        ],
        sit_social: ["", [Validators.required]],
        intervencion: ["No"],
        obs_intervencion: [
          { value: "", disabled: true },
          [Validators.required],
        ],
        cri_hisopado: ["No"],
        com_hisopado: ["No"],
        mov_propia: ["Si"],
        der_enfermeria: [""],
        dis_contacto: [""],
        sol_hisopado: ["No"],
        lug_hisopado: [{ value: "", disabled: true }, [Validators.required]],
        fec_hisopado: [{ value: "", disabled: true }, [Validators.required]],
        req_extender: [{ value: "", disabled: true }, [Validators.required]],
        cer_5dias: ["No"],
        cer_contacto: ["No"],
        tip_contacto: ["Social"],
        obs_tip_contacto: [
          { value: "", disabled: true },
          [Validators.required],
        ],
        cas_positivo: ["No"],
        dat_positivo: [{ value: "", disabled: true }, [Validators.required]],
        otro_certificado: [""],
        seg_domiciliario: ["No"],
        req_seguimiento: ["No"],
        laboratorio: [{ value: "Privado", disabled: true }],
        whatsapp: [{ value: "No", disabled: true }],
        det_requerimiento: [
          { value: "", disabled: true },
          [Validators.required],
        ],
        fec_salud: [{ value: "", disabled: true }, [Validators.required]],

        cierre_contacto: ["", [Validators.required]],
        usuario: [""],
      }),
      trabajo: this.fb.group({
        lugar: ["", [Validators.maxLength(50)]],
        telefono: ["", [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        calle: ["", [Validators.maxLength(50)]],
        numero: ["", [Validators.maxLength(4)]],
        localidad: ["", [Validators.maxLength(30)]],
      }),
      usuario: [null],
      fecha: [""],
      nroForm: [null],
    });
    this.personaForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      console.log("covid", value);
    });
    //  //console.log(this.personaForm);
  }

  renaper() {
    this.isLoadingSubject.next(true);
    let params = `documento=${
      this.personaForm.get("persona.documento").value
    }&sexo=${this.personaForm.get("persona.sexo").value}`;

    this._registroService
      // Busca primero que no tenga un registro cargado
      .getOneRegistro(this.personaForm.get("persona.documento").value)
      .subscribe((data: any) => {
        console.log("data", data);
        if (data.ok === false) {
          //Si no existe registro busca en renaper y guarda los datos. en la bd de persona.
          this._personaService.getPersona(params).subscribe((data: any) => {
            console.log(data);
            if (data.datos.ID_TRAMITE_PRINCIPAL !== 0) {
              this.buscar_datos = false;
              this.cargar_datos = true;
              this.isLoadingSubject.next(false);
              this.cdr.markForCheck();
              data.datos.documento = this.personaForm.get(
                "persona.documento"
              ).value;
              data.datos.sexo = this.personaForm.get("persona.sexo").value;
              this.initForm(data.datos);
              this.vacForm(data.datos);
              this.edad = this.personaForm.get("persona.fechaNacimiento").value;
              this.calcularEdad();

              //console.log(this.nombre);
            } else {
              this.toast.error(
                "Persona No encontrada, por favor Verifique los datos ingresados."
              );
              this.isLoadingSubject.next(false);
            }
          });
        } else {
          this.toast.error(
            "La persona ya existe en la Base de datos!!, por favor vuelva a la grilla de registros."
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
  get campoCalle() {
    return this.personaForm.get("persona.calle");
  }
  get campoNumero() {
    return this.personaForm.get("persona.numero");
  }
  get campoPiso() {
    return this.personaForm.get("persona.piso");
  }
  get campoDepto() {
    return this.personaForm.get("persona.departamento");
  }
  get campoLocalidad() {
    return this.personaForm.get("persona.localidad");
  }
  get campoMotivo() {
    return this.personaForm.get("llamada.motivo");
  }
  get campoCierre() {
    return this.personaForm.get("llamada.cierre_contacto");
  }
  get campoFecha() {
    return this.personaForm.get("llamada.fec_sintomas");
  }
  get campoSintomas() {
    return this.personaForm.get("llamada.sin_actuales");
  }
  get campoContacto() {
    return this.personaForm.get("llamada.con_caso_sos");
  }
  get campoObsContacto() {
    return this.personaForm.get("llamada.obs_contacto");
  }
  get campoObraSocial() {
    return this.personaForm.get("llamada.obra_social");
  }
  get campoEnfermedad() {
    return this.personaForm.get("llamada.enf_actual");
  }
  get campoObsEnfermedad() {
    return this.personaForm.get("llamada.obs_enfermedad");
  }
  get campoTratamiento() {
    return this.personaForm.get("llamada.tratamiento");
  }
  get campoConvivientes() {
    return this.personaForm.get("llamada.convivientes");
  }
  get campoCantConvivientes() {
    return this.personaForm.get("llamada.cant_convivientes");
  }
  get campoObsCantConvivientes() {
    return this.personaForm.get("llamada.obs_convivientes");
  }
  get campoSituacion() {
    return this.personaForm.get("llamada.sit_social");
  }
  get campoIntervencion() {
    return this.personaForm.get("llamada.intervencion");
  }
  get campoObsIntervencion() {
    return this.personaForm.get("llamada.obs_intervencion");
  }
  get campoHisopado() {
    return this.personaForm.get("llamada.cri_hisopado");
  }
  get campoComHisopado() {
    return this.personaForm.get("llamada.com_hisopado");
  }
  get campoMovilidad() {
    return this.personaForm.get("llamada.mov_propia");
  }
  get campoEnfermeria() {
    return this.personaForm.get("llamada.der_enfermeria");
  }
  get campoDisContacto() {
    return this.personaForm.get("llamada.dis_contacto");
  }
  get campoSolHisopado() {
    return this.personaForm.get("llamada.sol_hisopado");
  }
  get campoLugHisopa() {
    return this.personaForm.get("llamada.lug_hisopado");
  }
  get campoFecHisopado() {
    return this.personaForm.get("llamada.fec_hisopado");
  }
  get campoReqExtender() {
    return this.personaForm.get("llamada.req_extender");
  }
  get campoCer5Dias() {
    return this.personaForm.get("llamada.cer_5dias");
  }
  get campoCerContacto() {
    return this.personaForm.get("llamada.cer_contacto");
  }
  get campoTiContacto() {
    return this.personaForm.get("llamada.tip_contacto");
  }
  get campoObsTipoContacto() {
    return this.personaForm.get("llamada.obs_tip_contacto");
  }
  get campoCasPositivo() {
    return this.personaForm.get("llamada.cas_positivo");
  }
  get campoDatPositivo() {
    return this.personaForm.get("llamada.dat_positivo");
  }
  get campoOtroCert() {
    return this.personaForm.get("llamada.otro_certificado");
  }
  get campoSegDom() {
    return this.personaForm.get("llamada.seg_domiciliario");
  }
  get campoLaboratorio() {
    return this.personaForm.get("llamada.laboratorio");
  }
  get campoWhatsapp() {
    return this.personaForm.get("llamada.whatsapp");
  }
  get campoDetRequerimiento() {
    return this.personaForm.get("llamada.det_requerimiento");
  }
  get campoFecSalud() {
    return this.personaForm.get("llamada.fec_salud");
  }

  get valido() {
    if (this.cargar_form === this.opc_Forms.op1) {
      this.personaForm.patchValue({ llamada: { opc_form: this.cargar_form } });
      return this.personaForm.valid;
    } else {
      this.vacunaForm.patchValue({
        persona: { telefono: this.personaForm.get("persona.telefono").value },
      });
      this.vacunaForm.patchValue({
        persona: { localidad: this.personaForm.get("persona.localidad").value },
      });
      this.vacunaForm.patchValue({
        persona: { piso: this.personaForm.get("persona.piso").value },
      });
      this.vacunaForm.patchValue({
        persona: {
          departamento: this.personaForm.get("persona.departamento").value,
        },
      });
      this.vacunaForm.patchValue({
        persona: { numero: this.personaForm.get("persona.numero").value },
      });
      this.vacunaForm.patchValue({ llamada: { opc_form: this.cargar_form } });
      return this.vacunaForm.valid;
    }
  }

  get novalido() {
    if (this.cargar_form === this.opc_Forms.op1) {
      return this.personaForm.invalid;
    } else {
      return this.vacunaForm.invalid;
    }
  }

  activarSintomas() {
    if (this.sintomas === "Si") {
      this.campoFecha.enable();
    } else {
      this.campoFecha.disable();
      this.campoFecha.reset();
    }
    if (this.sintomas === "Si") {
      this.campoSintomas.enable();
    } else {
      this.campoSintomas.disable();
      this.campoSintomas.reset();
    }
  }
  activarConSos() {
    if (this.con_caso_sos === "Si") {
      this.campoObsContacto.enable();
    } else {
      this.campoObsContacto.disable();
      this.campoObsContacto.reset();
    }
  }
  activarEnfermedad() {
    if (this.enf_actual === "Si") {
      this.campoObsEnfermedad.enable();
    } else {
      this.campoObsEnfermedad.disable();
      this.campoObsEnfermedad.reset();
    }
    if (this.enf_actual === "Si") {
      this.campoTratamiento.enable();
    } else {
      this.campoTratamiento.disable();
      this.campoTratamiento.reset("No");
    }
  }
  activarConviviente() {
    if (this.convivientes === "Si") {
      this.campoCantConvivientes.enable();
    } else {
      this.campoCantConvivientes.disable();
      this.campoCantConvivientes.reset();
    }
    if (this.convivientes === "Si") {
      this.campoObsCantConvivientes.enable();
    } else {
      this.campoObsCantConvivientes.disable();
      this.campoObsCantConvivientes.reset();
    }
  }

  activarIntervencion() {
    if (this.intervencion === "Si") {
      this.campoObsIntervencion.enable();
    } else {
      this.campoObsIntervencion.disable();
      this.campoObsIntervencion.reset();
    }
  }

  activarSolHisopado() {
    if (this.sol_hisopado === "Si") {
      this.campoLugHisopa.enable();
    } else {
      this.campoLugHisopa.disable();
      this.campoLugHisopa.reset();
    }
    if (this.sol_hisopado === "Si") {
      this.campoFecHisopado.enable();
    } else {
      this.campoFecHisopado.disable();
      this.campoFecHisopado.reset();
    }
    if (this.sol_hisopado === "Si") {
      this.campoReqExtender.enable();
    } else {
      this.campoReqExtender.disable();
      this.campoReqExtender.reset();
    }
  }

  activarCerAislamiento() {
    if (this.cer_contacto === "Si") {
      this.campoObsTipoContacto.enable();
    } else {
      this.campoObsTipoContacto.disable();
      this.campoObsTipoContacto.reset();
    }
  }
  activarCasoPositivo() {
    if (this.cas_positivo === "Si") {
      this.campoDatPositivo.enable();
    } else {
      this.campoDatPositivo.disable();
      this.campoDatPositivo.reset();
    }
  }

  activarInicio() {
    if (this.req_seguimiento === "Si" && this.laboratorio === "Privado") {
      this.campoLaboratorio.enable();
      this.campoWhatsapp.enable();
      this.whatsapp = "No";
      this.campoDetRequerimiento.enable();
      this.campoFecSalud.disable();
    }
    if (this.req_seguimiento === "Si" && this.laboratorio === "Publico") {
      this.campoLaboratorio.enable();
      this.campoWhatsapp.disable();
      this.campoDetRequerimiento.enable();
      this.campoFecSalud.enable();
    }
    if (this.req_seguimiento === "No") {
      this.campoLaboratorio.disable();
      this.campoWhatsapp.disable();
      this.campoDetRequerimiento.disable();
      this.campoFecSalud.disable();
    }
  }

  activarSector() {
    if (this.req_seguimiento === "Si" && this.laboratorio === "Privado") {
      this.campoLaboratorio.enable();
      this.campoWhatsapp.enable();
      this.campoWhatsapp.reset("No");
      this.whatsapp = "No";
      this.campoDetRequerimiento.enable();
      this.campoDetRequerimiento.reset("");
      this.campoFecSalud.reset("");
      this.campoFecSalud.disable();
    }
    if (this.req_seguimiento === "Si" && this.laboratorio === "Publico") {
      this.campoLaboratorio.enable();
      this.campoWhatsapp.disable();
      this.campoDetRequerimiento.enable();
      this.campoDetRequerimiento.reset("");
      this.campoFecSalud.enable();
      this.campoFecSalud.reset("");
    }
    if (this.req_seguimiento === "No") {
      this.campoLaboratorio.reset("Privado");
      this.campoLaboratorio.disable();
      this.campoWhatsapp.disable();
      this.campoDetRequerimiento.reset("");
      this.campoDetRequerimiento.disable();
      this.campoFecSalud.reset("");
      this.campoFecSalud.disable();
    }
  }

  ///////////////////////////
  /// VacunaForm//////

  vacForm(datos?) {
    this.vacunaForm = this.fb.group({
      persona: this.fb.group({
        nombre: [datos ? datos.nombres : ""],
        apellido: [datos ? datos.apellido : ""],
        documento: [
          datos ? datos.documento : "",
          [Validators.required, Validators.maxLength(8)],
        ],
        fechaNacimiento: [datos ? datos.fechaNacimiento : ""],
        edad: [""],
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
          [Validators.required, Validators.maxLength(50)],
        ],
        numero: [
          datos ? datos.numero : "-",
          [Validators.required, Validators.maxLength(4)],
        ],
        departamento: [
          datos ? datos.departamento : "-",
          [Validators.required, Validators.maxLength(5)],
        ],
        piso: [
          datos ? datos.piso : "-",
          [Validators.required, Validators.maxLength(5)],
        ],
        cpostal: [
          datos ? datos.cpostal : "",
          [Validators.required, Validators.maxLength(4)],
        ],
        localidad: ["", [Validators.required]],
        provincia: [
          datos ? datos.provincia : "",
          [Validators.required, Validators.maxLength(30)],
        ],
        pais: [
          datos ? datos.pais : "",
          [Validators.required, Validators.maxLength(30)],
        ],
        img: [datos ? datos.foto : ""],
      }),
      llamada: this.fb.group({
        nroForm: [null],
        fecha: [""],
        opc_form: [""],
        tipo_llamada: ["Entrada"],
        usuario: [""],
        vacuna_form: this.fb.group({
          vac_motivo: ["", [Validators.required]],
          vac_factor_riesgo_patologias: ["No"],
          vac_obs_factor: [
            { value: "", disabled: true },
            [Validators.required],
          ],
          vac_tratamiento: ["No"],
          vac_especificar: [
            { value: "No", disabled: true },
            [Validators.required],
          ],
          vac_medicacion: [
            { value: "No", disabled: true },
            [Validators.required],
          ],
          vac_tratamiento_plasma: ["No"],
          vac_estudios_rutina: ["No"],
          vac_obs_est_rut: [
            { value: "", disabled: true },
            [Validators.required],
          ],
          vac_gripe_camp_ant: ["No"],
          vac_enfermedad_covid: [{ value: "No" }, [Validators.required]],
          vac_covid_cuando: [
            { value: "No", disabled: true },
            [Validators.required],
          ],
          vac_suministro_vac: [{ value: "No" }, [Validators.required]],
          vac_fec_adm_vac: [
            { value: "", disabled: true },
            [Validators.required],
          ],
          vac_efector: [{ value: "", disabled: true }, [Validators.required]],
          vac_que_dosis: [{ value: "", disabled: true }, [Validators.required]],
          vac_sintomas_adm_vac: [
            { value: "", disabled: true },
            [Validators.required],
          ],
          vac_cierre_contacto: ["", [Validators.required]],
        }),
      }),
      usuario: [null],
      fecha: [""],
      nroForm: [null],
    });
    this.vacunaForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => console.log("Vacuna Form", value));
  }

  ////////////////////////////////////////////////////
  // Funciones de Form Vacuna//////////////////////
  //////////////////////////////////////////////////

  get campo_vac_Telefono() {
    return this.vacunaForm.get("persona.telefono");
  }
  get campo_vac_Calle() {
    return this.vacunaForm.get("persona.calle");
  }
  get campo_vac_Numero() {
    return this.vacunaForm.get("persona.numero");
  }
  get campo_vac_Piso() {
    return this.vacunaForm.get("persona.piso");
  }
  get campo_vac_Depto() {
    return this.vacunaForm.get("persona.departamento");
  }
  get campo_vac_Localidad() {
    return this.vacunaForm.get("persona.localidad");
  }
  get campoVacMotivo() {
    return this.vacunaForm.get("llamada.vacuna_form.vac_motivo");
  }
  get campoVacCierre() {
    return this.vacunaForm.get("llamada.vacuna_form.vac_cierre_contacto");
  }

  get campo_Obs_fac_patologias() {
    return this.vacunaForm.get("llamada.vacuna_form.vac_obs_factor");
  }
  get campo_vac_especificar() {
    return this.vacunaForm.get("llamada.vacuna_form.vac_especificar");
  }
  get campo_vac_medicacion() {
    return this.vacunaForm.get("llamada.vacuna_form.vac_medicacion");
  }
  get campo_vac_obs_est_rut() {
    return this.vacunaForm.get("llamada.vacuna_form.vac_obs_est_rut");
  }

  get campo_vac_enfermedad_covid() {
    return this.vacunaForm.get("");
  }
  get campo_vac_covid_cuando() {
    return this.vacunaForm.get("llamada.vacuna_form.vac_covid_cuando");
  }

  get campo_vac_efector() {
    return this.vacunaForm.get("llamada.vacuna_form.vac_efector");
  }
  get campo_vac_que_dosis() {
    return this.vacunaForm.get("llamada.vacuna_form.vac_que_dosis");
  }
  get campo_vac_sintomas_adm_vac() {
    return this.vacunaForm.get("llamada.vacuna_form.vac_sintomas_adm_vac");
  }
  get campo_vac_fec_adm_vac() {
    return this.vacunaForm.get("llamada.vacuna_form.vac_fec_adm_vac");
  }

  activarFactorRiesgo() {
    if (this.vac_factor_riesgo_patologias === "Si") {
      this.campo_Obs_fac_patologias.enable();
    } else {
      this.campo_Obs_fac_patologias.disable();
      this.campo_Obs_fac_patologias.reset();
    }
  }

  activarVac_Tratamiento() {
    if (this.vac_tratamiento === "Si") {
      this.campo_vac_especificar.enable();
      this.campo_vac_medicacion.enable();
    } else {
      this.campo_vac_especificar.disable();
      this.campo_vac_especificar.reset();
      this.campo_vac_medicacion.disable();
      this.campo_vac_medicacion.reset();
    }
  }
  activar_Vac_estudios_rutina() {
    if (this.vac_estudios_rutina === "Si") {
      this.campo_vac_obs_est_rut.enable();
    } else {
      this.campo_vac_obs_est_rut.disable();
      this.campo_vac_obs_est_rut.reset();
    }
  }
  activar_vac_enfermedad_covid() {
    if (this.vac_enfermedad_covid === "Si") {
      this.campo_vac_covid_cuando.enable();
    } else {
      this.campo_vac_covid_cuando.disable();
      this.campo_vac_covid_cuando.reset();
    }
  }

  activar_campos_vacunas() {
    if (this.vac_suministro_vac === "Si") {
      this.campo_vac_efector.enable();
      this.campo_vac_que_dosis.enable();
      this.campo_vac_sintomas_adm_vac.enable();
      this.campo_vac_fec_adm_vac.enable();
    } else {
      this.campo_vac_efector.disable();
      this.campo_vac_efector.reset();
      this.campo_vac_que_dosis.disable();
      this.campo_vac_que_dosis.reset();
      this.campo_vac_sintomas_adm_vac.disable();
      this.campo_vac_sintomas_adm_vac.reset();
      this.campo_vac_fec_adm_vac.disable();
      this.campo_vac_fec_adm_vac.reset();
    }
  }

  submit() {
    // Acá están todos los datos del formulario para guardar en la BD
    this.personaForm.patchValue({ usuario: sessionStorage.getItem("ID") });

    let datosPersona = this.personaForm.value;
    ////console.log(datosPersona);

    /* if (this.personaForm.valid) { */
    this._registroService.createRegistro(datosPersona).subscribe((data) => {
      /* 
				let pepe = data; // Eliminar esta línea si anda todo bien */
    });
    this.router.navigate(["/registros"]);
    /* } else {
			//console.log(this.personaForm);
		} */
    // this.router.navigateByUrl('/registros');
  }

  guardarForm(event: Event) {
    if (this.cargar_form === this.opc_Forms.op1) {
      event.preventDefault();
      // Acá están todos los datos del formulario para guardar en la BD
      this.personaForm.patchValue({
        llamada: { usuario: sessionStorage.getItem("ID") },
      });
      this.personaForm.patchValue({ usuario: sessionStorage.getItem("ID") });

      let datosPersona = this.personaForm.value;
      //console.log("Datos de la Persona: ", datosPersona);

      if (this.personaForm.valid) {
        this._registroService.createRegistro(datosPersona).subscribe((data) => {
          /* 
				let pepe = data; // Eliminar esta línea si anda todo bien */
        });
        this.router.navigate(["/registros"]);
      } else {
        this.personaForm.markAllAsTouched();
        //console.log(this.personaForm);
      }
      // this.router.navigateByUrl('/registros');
    } else {
      event.preventDefault();
      // Acá están todos los datos del formulario para guardar en la BD
      this.vacunaForm.patchValue({
        usuario: sessionStorage.getItem("ID"),
      });
      this.vacunaForm.patchValue({
        llamada: { usuario: sessionStorage.getItem("ID") },
      });

      let datosPersona = this.vacunaForm.value;

      console.log("Datos de la Persona form vacuna: ", datosPersona);

      if (this.vacunaForm.valid) {
        this._registroService.createRegistro(datosPersona).subscribe((data) => {
          /* 
				let pepe = data; // Eliminar esta línea si anda todo bien */
        });
        this.router.navigate(["/registros"]);
      } else {
        this.vacunaForm.markAllAsTouched();
        //console.log(this.personaForm);
      }
      // this.router.navigateByUrl('/registros');
    }
  }
}
