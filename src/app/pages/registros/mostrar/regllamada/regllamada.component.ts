import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as moment from "moment";

@Component({
  selector: "app-regllamada",
  templateUrl: "./regllamada.component.html",
  styleUrls: ["./regllamada.component.scss"],
})
export class RegllamadaComponent implements OnInit {
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
  public fechahoy: string = moment().format("YYYY-MM-DD");
  public fechamin: string = "2020-03-01";
  closeResult: string;
  data: any = {};
  public cargar_datos: boolean = false;
  public buscar_datos: boolean = true;
  public guardar: boolean = false;
  public sololectura: boolean;
  public errorMessage: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegllamadaComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: FormGroup
  ) {}

  ngOnInit(): void {}

  onClickNo(): void {
    this.dialogRef.close();
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
          [Validators.required, Validators.maxLength(25)],
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
        cpostal: [
          datos ? datos.cpostal : "",
          [Validators.required, Validators.maxLength(4)],
        ],
        localidad: ["", [Validators.required]],
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
        nroForm: [null],
        fecha: [""],
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
        der_enfermeria: ["No"],
        dis_contacto: ["", [Validators.required]],
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
        otro_certificado: ["", [Validators.required]],
        seg_domiciliario: ["No"],
        laboratorio: ["Privado"],
        whatsapp: ["No"],
        det_requerimiento: ["", [Validators.required]],
        fec_salud: [{ value: "", disabled: true }, [Validators.required]],
        cierre_contacto: ["", [Validators.required]],
        usuario: [""],
      }),
      trabajo: this.fb.group({
        lugar: ["", [Validators.maxLength(50)]],
        telefono: ["", [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        calle: ["", [Validators.maxLength(25)]],
        numero: ["", [Validators.maxLength(4)]],
        localidad: ["", [Validators.maxLength(25)]],
      }),
      usuario: [null],
      fecha: [""],
      nroForm: [null],
    });
    this.personaForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      console.log(value);
    });
    //  //console.log(this.personaForm);
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
  activarSegMedico() {
    debugger;
    if (this.laboratorio === "Publico") {
      this.campoFecSalud.enable();
    } else {
      this.campoFecSalud.disable();
      this.campoFecSalud.reset("");
    }
  }
}
