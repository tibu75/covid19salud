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

import { Subscription, Observable, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LocalidadesService } from "./../../../services/localidades/localidades.service";
import { Localidades } from "../../models/localidades";
import { debounceTime } from "rxjs/operators";
import { Reg0800Service } from "src/app/services/reg0800/reg0800.service";
import { MostrarService } from "src/app/services/mostrar/mostrar.service";
import { opc_form } from "../../../interfaces/opc_form.interface";
import * as moment from "moment";

@Component({
  selector: "app-llamada",
  templateUrl: "./llamada.component.html",
})
export class LlamadaComponent implements OnInit {
  //Formulario

  reg = this._MostrarService.ultimoReg;
  opc_Forms: opc_form = { op1: "covid", op2: "vacuna" };
  llamadaForm: FormGroup;
  vacunaForm: FormGroup;
  sintomas: string;
  con_caso_sos: string;
  enf_actual: string;
  convivientes: string;
  intervencion: string;
  cri_hisopado: string;
  mov_propia: string;
  der_enfermeria: string;
  sol_hisopado: string;
  cer_5dias: string;
  cer_contacto: string;
  cas_positivo: string;
  req_seguimiento: string;
  laboratorio: string;
  whatsapp: string;

  vac_factor_riesgo_patologias: string;
  vac_obs_factor: string;
  vac_especificar: string;
  vac_tratamiento: string;
  vac_tratamiento_plasma: string;
  vac_medicacion: string;
  vac_estudios_rutina: string;
  vac_obs_est_rut: string;
  vac_gripe_camp_ant: string;
  vac_enfermedad_covid: string;
  vac_covid_cuando: string;
  vac_suministro_vac: string;
  vac_efector: string;
  vac_que_dosis: string;
  vac_sintomas_adm_vac: string;

  private isLoadingSubject: BehaviorSubject<boolean>;
  public isLoading$: Observable<boolean>;
  public fechahoy: string = moment().format("YYYY-MM-DD");
  public fechamin: string = "2020-03-01";
  closeResult: string;
  data: any = {};
  public cargar_form: string;
  public cargar_datos: boolean = true;
  public buscar_datos: boolean = true;
  public guardar: boolean = false;
  public sololectura: boolean;
  private unsubscribe: Subscription[] = [];
  public localidades: Localidades[] = [];
  public errorMessage: string;
  idForm: string;
  constructor(
    public _MostrarService: MostrarService,
    public _registroService: Reg0800Service,
    private toast: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private localidadesService: LocalidadesService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
    this.activarInicio();
    this.initForm();
    this.vacForm();
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    // console.info("Objeto", this._MostrarService.registro);
    this.cargarLocalidades();
    this.idForm = this._MostrarService.registro._id;
    this.cdr.markForCheck();
    //  console.log("Id form", this.idForm);
  }

  show_form(opciones) {
    let op = opciones;
    if (op === this.opc_Forms.op1) {
      this.cargar_form = op;
      /* this.sintomas = this._MostrarService.registro.llamada[this.reg].sintomas;
      this.con_caso_sos = this._MostrarService.registro.llamada[
        this.reg
      ].con_caso_sos;
      this.enf_actual = this._MostrarService.registro.llamada[
        this.reg
      ].enf_actual;
      this.convivientes = this._MostrarService.registro.llamada[
        this.reg
      ].convivientes;
      this.intervencion = this._MostrarService.registro.llamada[
        this.reg
      ].intervencion;
      this.cri_hisopado = this._MostrarService.registro.llamada[
        this.reg
      ].cri_hisopado;
      this.mov_propia = this._MostrarService.registro.llamada[
        this.reg
      ].mov_propia;
      this.der_enfermeria = this._MostrarService.registro.llamada[
        this.reg
      ].der_enfermeria;
      this.sol_hisopado = this._MostrarService.registro.llamada[
        this.reg
      ].sol_hisopado;
      this.cer_5dias = this._MostrarService.registro.llamada[
        this.reg
      ].cer_5dias;
      this.cer_contacto = this._MostrarService.registro.llamada[
        this.reg
      ].cer_contacto;
      this.cas_positivo = this._MostrarService.registro.llamada[
        this.reg
      ].cas_positivo;
      this.req_seguimiento = this._MostrarService.registro.llamada[
        this.reg
      ].req_seguimiento; */
      this.laboratorio = "Privado";
      this.whatsapp = "No";

      this.cdr.markForCheck();
    } else {
      this.cargar_form = op;
      console.log(this.cargar_form);
      console.log(this._MostrarService.registro.llamada);

      /* this.vac_factor_riesgo_patologias = this._MostrarService.registro.llamada[0].vacuna_form.vac_factor_riesgo_patologias;
      this.vac_obs_factor = this._MostrarService.registro.llamada[0].vacuna_form.vac_obs_factor;
      this.vac_especificar = this._MostrarService.registro.llamada[0].vacuna_form.vac_especificar;
      this.vac_medicacion = this._MostrarService.registro.llamada[0].vacuna_form.vac_medicacion;
      this.vac_tratamiento = this._MostrarService.registro.llamada[0].vacuna_form.vac_tratamiento;
      this.vac_tratamiento_plasma = this._MostrarService.registro.llamada[0].vacuna_form.vac_tratamiento_plasma;
      this.vac_estudios_rutina = this._MostrarService.registro.llamada[0].vacuna_form.vac_estudios_rutina;
      this.vac_gripe_camp_ant = this._MostrarService.registro.llamada[0].vacuna_form.vac_gripe_camp_ant;
      this.vac_obs_est_rut = this._MostrarService.registro.llamada[0].vacuna_form.vac_obs_est_rut;
      this.vac_enfermedad_covid = this._MostrarService.registro.llamada[0].vacuna_form.vac_enfermedad_covid;
      this.vac_covid_cuando = this._MostrarService.registro.llamada[0].vacuna_form.vac_covid_cuando; */

      this.cdr.markForCheck();
    }
    console.log(this.cargar_form);
    console.log(this._MostrarService.registro.llamada);
  }

  cargarLocalidades() {
    this.localidadesService.getLocalidades().subscribe((data: any) => {
      this.localidades = data;
      this.cdr.markForCheck();
    });
  }

  initForm() {
    this.llamadaForm = this.fb.group({
      nroForm: [null],
      fecha: [""],
      opc_form: [this._MostrarService.opc_form],
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
      cant_convivientes: [{ value: "", disabled: true }, [Validators.required]],
      obs_convivientes: [{ value: "", disabled: true }, [Validators.required]],
      sit_social: ["", [Validators.required]],
      intervencion: ["No"],
      obs_intervencion: [{ value: "", disabled: true }, [Validators.required]],
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
      obs_tip_contacto: [{ value: "", disabled: true }, [Validators.required]],
      cas_positivo: ["No"],
      dat_positivo: [{ value: "", disabled: true }, [Validators.required]],
      otro_certificado: [""],
      seg_domiciliario: ["No"],
      req_seguimiento: ["No"],
      laboratorio: [{ value: "Privado", disabled: true }],
      whatsapp: [{ value: "No", disabled: true }],
      det_requerimiento: [{ value: "", disabled: true }, [Validators.required]],
      fec_salud: [{ value: "", disabled: true }, [Validators.required]],

      cierre_contacto: ["", [Validators.required]],
      usuario: [""],
    });
    this.llamadaForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      //  console.log(value);
    });
    //  //console.log(this.llamadaForm);
  }

  get campoMotivo() {
    return this.llamadaForm.get("motivo");
  }
  get campoCierre() {
    return this.llamadaForm.get("cierre_contacto");
  }
  get campoFecha() {
    return this.llamadaForm.get("fec_sintomas");
  }
  get campoSintomas() {
    return this.llamadaForm.get("sin_actuales");
  }
  get campoContacto() {
    return this.llamadaForm.get("con_caso_sos");
  }
  get campoObsContacto() {
    return this.llamadaForm.get("obs_contacto");
  }
  get campoObraSocial() {
    return this.llamadaForm.get("obra_social");
  }
  get campoEnfermedad() {
    return this.llamadaForm.get("enf_actual");
  }
  get campoObsEnfermedad() {
    return this.llamadaForm.get("obs_enfermedad");
  }
  get campoTratamiento() {
    return this.llamadaForm.get("tratamiento");
  }
  get campoConvivientes() {
    return this.llamadaForm.get("convivientes");
  }
  get campoCantConvivientes() {
    return this.llamadaForm.get("cant_convivientes");
  }
  get campoObsCantConvivientes() {
    return this.llamadaForm.get("obs_convivientes");
  }
  get campoSituacion() {
    return this.llamadaForm.get("sit_social");
  }
  get campoIntervencion() {
    return this.llamadaForm.get("intervencion");
  }
  get campoObsIntervencion() {
    return this.llamadaForm.get("obs_intervencion");
  }
  get campoHisopado() {
    return this.llamadaForm.get("cri_hisopado");
  }
  get campoComHisopado() {
    return this.llamadaForm.get("com_hisopado");
  }
  get campoMovilidad() {
    return this.llamadaForm.get("mov_propia");
  }
  get campoEnfermeria() {
    return this.llamadaForm.get("der_enfermeria");
  }
  get campoDisContacto() {
    return this.llamadaForm.get("dis_contacto");
  }
  get campoSolHisopado() {
    return this.llamadaForm.get("sol_hisopado");
  }
  get campoLugHisopa() {
    return this.llamadaForm.get("lug_hisopado");
  }
  get campoFecHisopado() {
    return this.llamadaForm.get("fec_hisopado");
  }
  get campoReqExtender() {
    return this.llamadaForm.get("req_extender");
  }
  get campoCer5Dias() {
    return this.llamadaForm.get("cer_5dias");
  }
  get campoCerContacto() {
    return this.llamadaForm.get("cer_contacto");
  }
  get campoTiContacto() {
    return this.llamadaForm.get("tip_contacto");
  }
  get campoObsTipoContacto() {
    return this.llamadaForm.get("obs_tip_contacto");
  }
  get campoCasPositivo() {
    return this.llamadaForm.get("cas_positivo");
  }
  get campoDatPositivo() {
    return this.llamadaForm.get("dat_positivo");
  }
  get campoOtroCert() {
    return this.llamadaForm.get("otro_certificado");
  }
  get campoSegDom() {
    return this.llamadaForm.get("seg_domiciliario");
  }
  get campoLaboratorio() {
    return this.llamadaForm.get("laboratorio");
  }
  get campoWhatsapp() {
    return this.llamadaForm.get("whatsapp");
  }
  get campoDetRequerimiento() {
    return this.llamadaForm.get("det_requerimiento");
  }
  get campoFecSalud() {
    return this.llamadaForm.get("fec_salud");
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
  ////////////////////////////////////////////////////
  // Funciones de Form Vacuna//////////////////////
  //////////////////////////////////////////////////
  vacForm() {
    this.vacunaForm = this.fb.group({
      tipo_llamada: [this._MostrarService.tipo_llamada],
      opc_form: [this._MostrarService.opc_form],
      vacuna_form: this.fb.group({
        vac_motivo: ["", [Validators.required]],
        vac_factor_riesgo_patologias: ["No"],
        vac_obs_factor: [{ value: "", disabled: true }, [Validators.required]],
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
        vac_obs_est_rut: [{ value: "", disabled: true }, [Validators.required]],
        vac_gripe_camp_ant: ["No"],
        vac_enfermedad_covid: [{ value: "No" }, [Validators.required]],
        vac_covid_cuando: [
          { value: "No", disabled: true },
          [Validators.required],
        ],
        vac_suministro_vac: [{ value: "No" }, [Validators.required]],
        vac_fec_adm_vac: [{ value: "", disabled: true }, [Validators.required]],
        vac_efector: [{ value: "", disabled: true }, [Validators.required]],
        vac_que_dosis: [{ value: "", disabled: true }, [Validators.required]],
        vac_sintomas_adm_vac: [
          { value: "", disabled: true },
          [Validators.required],
        ],
        vac_cierre_contacto: ["", [Validators.required]],
      }),

      usuario: [""],
    });
    this.vacunaForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      console.log(value);
    });
  }

  get campoVacMotivo() {
    return this.vacunaForm.get("vacuna_form.vac_motivo");
  }
  get campoVacCierre() {
    return this.vacunaForm.get("vacuna_form.vac_cierre_contacto");
  }

  get campo_Obs_fac_patologias() {
    return this.vacunaForm.get("vacuna_form.vac_obs_factor");
  }
  get campo_vac_especificar() {
    return this.vacunaForm.get("vacuna_form.vac_especificar");
  }
  get campo_vac_medicacion() {
    return this.vacunaForm.get("vacuna_form.vac_medicacion");
  }
  get campo_vac_obs_est_rut() {
    return this.vacunaForm.get("vacuna_form.vac_obs_est_rut");
  }

  get campo_vac_enfermedad_covid() {
    return this.vacunaForm.get("");
  }
  get campo_vac_covid_cuando() {
    return this.vacunaForm.get("vacuna_form.vac_covid_cuando");
  }

  get campo_vac_efector() {
    return this.vacunaForm.get("vacuna_form.vac_efector");
  }
  get campo_vac_que_dosis() {
    return this.vacunaForm.get("vacuna_form.vac_que_dosis");
  }
  get campo_vac_sintomas_adm_vac() {
    return this.vacunaForm.get("vacuna_form.vac_sintomas_adm_vac");
  }
  get campo_vac_fec_adm_vac() {
    return this.vacunaForm.get("vacuna_form.vac_fec_adm_vac");
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

  ////////////////////////////////////////////////////
  // Funciones de Form Vacuna//////////////////////
  //////////////////////////////////////////////////

  get valido() {
    if (this.cargar_form === this.opc_Forms.op1) {
      this.llamadaForm.patchValue({ opc_form: this.cargar_form });
      return this.llamadaForm.valid;
    } else {
      this.vacunaForm.patchValue({ opc_form: this.cargar_form });
      return this.vacunaForm.valid;
    }
  }

  get novalido() {
    if (this.cargar_form === this.opc_Forms.op1) {
      return this.llamadaForm.invalid;
    } else {
      return this.vacunaForm.invalid;
    }
  }

  submit() {
    if (this.cargar_form === this.opc_Forms.op1) {
      // Acá están todos los datos del formulario para guardar en la BD
      this.llamadaForm.patchValue({ usuario: sessionStorage.getItem("ID") });

      let datosPersona = this.llamadaForm.value;
      ////console.log(datosPersona);

      /* if (this.llamadaForm.valid) { */
      this._registroService.createRegistro(datosPersona).subscribe((data) => {
        /* 
                let pepe = data; // Eliminar esta línea si anda todo bien */
      });
      this.router.navigate(["/registros"]);
      /* } else {
              //console.log(this.llamadaForm);
            } */
      // this.router.navigateByUrl('/registros');
    } else {
      // Acá están todos los datos del formulario para guardar en la BD
      this.llamadaForm.patchValue({ usuario: sessionStorage.getItem("ID") });

      let datosPersona = this.vacunaForm.value;
      ////console.log(datosPersona);

      /* if (this.llamadaForm.valid) { */
      this._registroService.createRegistro(datosPersona).subscribe((data) => {
        /* 
           let pepe = data; // Eliminar esta línea si anda todo bien */
      });
      this.router.navigate(["/registros"]);
      /* } else {
         //console.log(this.llamadaForm);
       } */
      // this.router.navigateByUrl('/registros');
    }
  }

  guardarForm(event: Event) {
    console.log(this.cargar_form);
    if (this.cargar_form === this.opc_Forms.op1) {
      event.preventDefault();
      // Acá están todos los datos del formulario para guardar en la BD
      this.llamadaForm.patchValue({
        llamada: { usuario: sessionStorage.getItem("ID") },
      });
      this.llamadaForm.patchValue({ usuario: sessionStorage.getItem("ID") });

      let datosPersona = this.llamadaForm.value;
      console.log("Datos de la Persona: ", datosPersona);

      if (this.llamadaForm.valid) {
        this._registroService
          .newCall(datosPersona, this.idForm)
          .subscribe((data: any) => {
            this.toast.success(data.msg, "Generado correctamente!");
          });
        this.router.navigateByUrl("/registros");
      } else {
        this.llamadaForm.markAllAsTouched();
        //console.log(this.llamadaForm);
      }
      // this.router.navigateByUrl('/registros');
    } else {
      event.preventDefault();
      // Acá están todos los datos del formulario para guardar en la BD
      this.vacunaForm.patchValue({ usuario: sessionStorage.getItem("ID") });
      this.vacunaForm.patchValue({ usuario: sessionStorage.getItem("ID") });
      let datosPersona = this.vacunaForm.value;
      console.log("Datos de la Persona: ", datosPersona);

      if (this.vacunaForm.valid) {
        console.log("Formulario", this.vacunaForm);
        this._registroService
          .newCall(datosPersona, this.idForm)
          .subscribe((data: any) => {
            this.toast.success(data.msg, "Generado correctamente!");
          });
        this.router.navigateByUrl("/registros");
      } else {
        this.vacunaForm.markAllAsTouched();
      }
      // this.router.navigateByUrl('/registros');
    }
  }
}
