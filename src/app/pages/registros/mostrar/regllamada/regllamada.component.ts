import { AfterViewInit } from "@angular/core";
import {
  Component,
  OnInit,
  Inject,
  Input,
  ChangeDetectorRef,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { opc_form } from "../../../../interfaces/opc_form.interface";
import * as moment from "moment";

@Component({
  selector: "app-regllamada",
  templateUrl: "./regllamada.component.html",
  styleUrls: ["./regllamada.component.scss"],
})
export class RegllamadaComponent implements OnInit, AfterViewInit {
  opc_Forms: opc_form = { op1: "covid", op2: "vacuna" };
  vacunaForm: FormGroup;
  personaForm: FormGroup;

  // variables del formulario covid
  tipoLlamada: string;
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
  antencedentes_p: string;
  toma_medicamentos: string;
  vivienda_personas: string;
  nombre: string;
  sexo: string;
  tipo_registro: string;
  realizo_hisopado: string;
  laboratorio: string;
  whatsapp: string;
  atencion_domiciliaria: string;
  cert_aislamiento: string;
  resultado_hisopado: string;
  derivacion_107: string;
  obs_atencion_domiciliaria: string;
  obs_cert_aislamiento: string;
  obs_resultado_hisopado: string;
  obs_derivacion_107: string;
  obs_mov_propia: string;

  /// variables del formulario vacunas
  vac_tipoLlamada: string;
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

  edad;
  mostrarEdad;
  public fechahoy: string = moment().format("YYYY-MM-DD");
  public fechamin: string = "2020-03-01";
  closeResult: string;
  data: any = {};
  public cargar_datos: boolean = false;
  public buscar_datos: boolean = true;
  public guardar: boolean = false;
  public sololectura: boolean;
  public errorMessage: string;
  cargar_form: any;
  opcion: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegllamadaComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: any,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log("FORMMMMM", this.datos.vacuna_form);
    this.opcion = this.datos.opc_form;
    this.show_form();

    this.cdr.markForCheck();
  }

  ngAfterViewInit(): void {
    this.show_form();
  }

  initForm() {
    this.personaForm = this.fb.group({
      llamada: this.fb.group({
        nroForm: [this.datos.nroForm],
        fecha: [this.datos.fecha],
        tipo_llamada: [this.datos.tipo_llamada],
        motivo: [this.datos.motivo],
        sintomas: [this.datos.sintomas],
        fec_sintomas: [this.datos.fec_sintomas],
        sin_actuales: [this.datos.sin_actuales],
        con_caso_sos: [this.datos.con_caso_sos],
        obs_contacto: [this.datos.obs_contacto],
        obra_social: [this.datos.obra_social],
        enf_actual: [this.datos.enf_actual],
        obs_enfermedad: [this.datos.obs_enfermedad],
        tratamiento: [this.datos.tratamiento],
        convivientes: [this.datos.convivientes],
        cant_convivientes: [this.datos.cant_convivientes],
        obs_convivientes: [this.datos.obs_convivientes],
        sit_social: [this.datos.sit_social],
        intervencion: [this.datos.intervencion],
        obs_intervencion: [this.datos.obs_intervencion],
        cri_hisopado: [this.datos.cri_hisopado],
        com_hisopado: [this.datos.com_hisopado],
        mov_propia: [this.datos.mov_propia],
        der_enfermeria: [this.datos.der_enfermeria],
        dis_contacto: [this.datos.dis_contacto],
        sol_hisopado: [this.datos.sol_hisopado],
        lug_hisopado: [this.datos.lug_hisopado],
        fec_hisopado: [this.datos.fec_hisopado],
        req_extender: [this.datos.req_extender],
        cer_aislamiento: [this.datos.cer_aislamiento],
        cer_5dias: [this.datos.cer_5dias],
        cer_contacto: [this.datos.cer_contacto],
        tip_contacto: [this.datos.tip_contacto],
        obs_tip_contacto: [this.datos.obs_tip_contacto],
        cas_positivo: [this.datos.cas_positivo],
        dat_positivo: [this.datos.dat_positivo],
        otro_certificado: [this.datos.otro_certificado],
        seg_domiciliario: [this.datos.seg_domiciliario],
        req_seguimiento: [this.datos.req_seguimiento],
        laboratorio: [this.datos.laboratorio],
        whatsapp: [this.datos.whatsapp],
        det_requerimiento: [this.datos.det_requerimiento],
        fec_salud: [this.datos.fec_salud],
        cierre_contacto: [this.datos.cierre_contacto],
        usuario: [this.datos.usuario],
      }),
    });
    //console.log("esto se cargo");
    //  console.log(this.personaForm);

    //console.log(this.edad);
    //console.log(this.mostrar_sintomas, this.mostrar_hisopado);

    this.cdr.markForCheck();
  }

  show_form() {
    if (this.opcion === this.opc_Forms.op1) {
      this.tipoLlamada = this.datos.tipoLlamada;
      this.sintomas = this.datos.sintomas;
      this.con_caso_sos = this.datos.con_caso_sos;
      this.enf_actual = this.datos.enf_actual;
      this.convivientes = this.datos.convivientes;
      this.intervencion = this.datos.intervencion;
      this.cri_hisopado = this.datos.cri_hisopado;
      this.mov_propia = this.datos.mov_propia;
      this.der_enfermeria = this.datos.der_enfermeria;
      this.sol_hisopado = this.datos.sol_hisopado;
      this.cer_5dias = this.datos.cer_5dias;
      this.cer_contacto = this.datos.cer_contacto;
      this.cas_positivo = this.datos.cas_positivo;
      this.req_seguimiento = this.datos.req_seguimiento;
      this.antencedentes_p = this.datos.antencedentes_p;
      this.toma_medicamentos = this.datos.toma_medicamentos;
      this.vivienda_personas = this.datos.vivienda_personas;
      this.nombre = this.datos.nombre;
      this.sexo = this.datos.sexo;
      this.tipo_registro = this.datos.tipo_registro;
      this.realizo_hisopado = this.datos.realizo_hisopado;
      this.laboratorio = this.datos.laboratorio;
      this.whatsapp = this.datos.whatsapp;
      this.atencion_domiciliaria = this.datos.atencion_domiciliaria;
      this.cert_aislamiento = this.datos.cert_aislamiento;
      this.resultado_hisopado = this.datos.resultado_hisopado;
      this.derivacion_107 = this.datos.derivacion_107;
      this.obs_atencion_domiciliaria = this.datos.obs_atencion_domiciliaria;
      this.obs_cert_aislamiento = this.datos.obs_cert_aislamiento;
      this.obs_resultado_hisopado = this.datos.obs_resultado_hisopado;
      this.obs_derivacion_107 = this.datos.obs_derivacion_107;
      this.obs_mov_propia = this.datos.obs_mov_propia;

      this.initForm();
    } else {
      this.vac_tipoLlamada = this.datos.vacuna_form.vac_tipoLlamada;
      this.vac_factor_riesgo_patologias = this.datos.vacuna_form.vac_factor_riesgo_patologias;
      this.vac_obs_factor = this.datos.vacuna_form.vac_obs_factor;
      this.vac_especificar = this.datos.vacuna_form.vac_especificar;
      this.vac_tratamiento = this.datos.vacuna_form.vac_tratamiento;
      this.vac_tratamiento_plasma = this.datos.vacuna_form.vac_tratamiento_plasma;
      this.vac_medicacion = this.datos.vacuna_form.vac_medicacion;
      this.vac_estudios_rutina = this.datos.vacuna_form.vac_estudios_rutina;
      this.vac_obs_est_rut = this.datos.vacuna_form.vac_obs_est_rut;
      this.vac_gripe_camp_ant = this.datos.vacuna_form.vac_gripe_camp_ant;
      this.vac_enfermedad_covid = this.datos.vacuna_form.vac_enfermedad_covid;
      this.vac_covid_cuando = this.datos.vacuna_form.vac_covid_cuando;
      this.vac_suministro_vac = this.datos.vacuna_form.vac_suministro_vac;
      this.vac_efector = this.datos.vacuna_form.vac_efector;
      this.vac_que_dosis = this.datos.vacuna_form.vac_que_dosis;
      this.vac_sintomas_adm_vac = this.datos.vacuna_form.vac_sintomas_adm_vac;

      this.vacForm();
    }
  }

  onClickNo(): void {
    this.dialogRef.close();
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
    return this.personaForm.valid;
  }
  get novalido() {
    return this.personaForm.invalid;
  }
  activarSintomas() {
    if (this.datos.sintomas === "Si") {
      this.campoFecha.enable();
    } else {
      this.campoFecha.disable();
      this.campoFecha.reset();
    }
    if (this.datos.sintomas === "Si") {
      this.campoSintomas.enable();
    } else {
      this.campoSintomas.disable();
      this.campoSintomas.reset();
    }
  }
  activarConSos() {
    if (this.datos.con_caso_sos === "Si") {
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
  activarSegMedico() {
    if (this.laboratorio === "Publico") {
      this.campoFecSalud.enable();
    } else {
      this.campoFecSalud.disable();
      this.campoFecSalud.reset("");
    }
    if (this.laboratorio === "Privado") {
      this.campoWhatsapp.enable();
    } else {
      this.campoWhatsapp.disable();
      this.campoWhatsapp.reset("");
    }
  }
  activarSector() {
    if (this.req_seguimiento === "Si") {
      this.campoLaboratorio.enable();
    } else {
      this.campoLaboratorio.disable();
      this.campoLaboratorio.reset("");
    }
    if (this.req_seguimiento === "Si") {
      this.campoDetRequerimiento.enable();
    } else {
      this.campoDetRequerimiento.disable();
      this.campoDetRequerimiento.reset("");
    }
    if (this.laboratorio === "Privado") {
      this.campoWhatsapp.enable();
    } else {
      this.campoWhatsapp.disable();
      this.campoWhatsapp.reset("No");
    }
    if (this.laboratorio === "Privado") {
      this.campoDetRequerimiento.enable();
    } else {
      this.campoDetRequerimiento.disable();
      this.campoDetRequerimiento.reset("");
    }
  }

  ////////////////////////////////////////////////////
  // Funciones de Form Vacuna//////////////////////
  //////////////////////////////////////////////////
  vacForm() {
    this.vacunaForm = this.fb.group({
      tipo_llamada: [this.vac_tipoLlamada],
      vacuna_form: this.fb.group({
        nroForm: [this.datos.nroForm],
        fecha: [this.datos.fecha],
        tipo_llamada: [this.datos.tipo_llamada],
        vac_motivo: [this.datos.vacuna_form.vac_motivo],
        vac_factor_riesgo_patologias: [
          this.datos.vacuna_form.vac_factor_riesgo_patologias,
        ],
        vac_obs_factor: [this.datos.vacuna_form.vac_obs_factor],
        vac_tratamiento: [this.datos.vacuna_form.vac_tratamiento],
        vac_especificar: [this.datos.vacuna_form.vac_especificar],
        vac_medicacion: [this.datos.vacuna_form.vac_medicacion],
        vac_tratamiento_plasma: [this.datos.vacuna_form.vac_tratamiento_plasma],
        vac_estudios_rutina: [this.datos.vacuna_form.vac_estudios_rutina],
        vac_obs_est_rut: [this.datos.vacuna_form.vac_obs_est_rut],
        vac_gripe_camp_ant: [this.datos.vacuna_form.vac_gripe_camp_ant],
        vac_enfermedad_covid: [this.datos.vacuna_form.vac_enfermedad_covid],
        vac_covid_cuando: [this.datos.vacuna_form.vac_covid_cuando],
        vac_suministro_vac: [this.datos.vacuna_form.vac_suministro_vac],
        vac_fec_adm_vac: [this.datos.vacuna_form.vac_fec_adm_vac],
        vac_efector: [this.datos.vacuna_form.vac_efector],
        vac_que_dosis: [this.datos.vacuna_form.vac_que_dosis],
        vac_sintomas_adm_vac: [this.datos.vacuna_form.vac_sintomas_adm_vac],
        vac_cierre_contacto: [this.datos.vacuna_form.vac_cierre_contacto],
      }),
      usuario: [""],
    });
    this.cdr.markForCheck();
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
}
