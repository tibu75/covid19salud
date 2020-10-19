import { Component, OnInit, ChangeDetectorRef, NgModule } from "@angular/core";
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
import * as moment from "moment";

@Component({
  selector: "app-llamada",
  templateUrl: "./llamada.component.html",
})
export class LlamadaComponent implements OnInit {
  //Formulario
  llamadaForm: FormGroup;
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

  private isLoadingSubject: BehaviorSubject<boolean>;
  public isLoading$: Observable<boolean>;
  public fechahoy: string = moment().format("YYYY-MM-DD");
  public fechamin: string = "2020-03-01";
  closeResult: string;
  data: any = {};
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
    this.initForm();
  }

  ngOnInit(): void {
    this.cargarLocalidades();
    this.idForm = this._MostrarService.registro._id;
    //  console.log("Id form", this.idForm);
  }

  cargarLocalidades() {
    this.localidadesService.getLocalidades().subscribe((data: any) => {
      this.localidades = data;
      this.cdr.markForCheck();
    });
  }

  initForm(datos?) {
    this.llamadaForm = this.fb.group({
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
      cant_convivientes: [{ value: "", disabled: true }, [Validators.required]],
      obs_convivientes: [{ value: "", disabled: true }, [Validators.required]],
      sit_social: ["", [Validators.required]],
      intervencion: ["No"],
      obs_intervencion: [{ value: "", disabled: true }, [Validators.required]],
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
      obs_tip_contacto: [{ value: "", disabled: true }, [Validators.required]],
      cas_positivo: ["No"],
      dat_positivo: [{ value: "", disabled: true }, [Validators.required]],
      otro_certificado: ["", [Validators.required]],
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

  get valido() {
    return this.llamadaForm.valid;
  }
  get novalido() {
    return this.llamadaForm.invalid;
  }

  submit() {
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
  }

  guardarForm(event: Event) {
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
  }
}
