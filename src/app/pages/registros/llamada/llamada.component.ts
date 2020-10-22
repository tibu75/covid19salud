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
  reg = this._MostrarService.ultimoReg;
  llamadaForm: FormGroup;
  sintomas = this._MostrarService.registro.llamada[this.reg].sintomas;
  con_caso_sos = this._MostrarService.registro.llamada[this.reg].con_caso_sos;
  enf_actual = this._MostrarService.registro.llamada[this.reg].enf_actual;
  convivientes = this._MostrarService.registro.llamada[this.reg].convivientes;
  intervencion = this._MostrarService.registro.llamada[this.reg].intervencion;
  cri_hisopado = this._MostrarService.registro.llamada[this.reg].cri_hisopado;
  mov_propia = this._MostrarService.registro.llamada[this.reg].mov_propia;
  der_enfermeria = this._MostrarService.registro.llamada[this.reg]
    .der_enfermeria;
  sol_hisopado = this._MostrarService.registro.llamada[this.reg].sol_hisopado;
  cer_5dias = this._MostrarService.registro.llamada[this.reg].cer_5dias;
  cer_contacto = this._MostrarService.registro.llamada[this.reg].cer_contacto;
  cas_positivo = this._MostrarService.registro.llamada[this.reg].cas_positivo;
  req_seguimiento = this._MostrarService.registro.llamada[this.reg]
    .req_seguimiento;
  laboratorio = "Privado";
  whatsapp = "No";

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
    console.log(this.llamadaForm);
    console.log(this._MostrarService.registro.llamada[this.reg]);
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
      tipo_llamada: [this._MostrarService.tipo_llamada],
      motivo: ["", [Validators.required]],
      sintomas: [this._MostrarService.registro.llamada[this.reg].sintomas],
      fec_sintomas: [
        {
          value: this._MostrarService.registro.llamada[this.reg].fec_sintomas,
          disabled: true,
        },
        [Validators.required],
      ],
      sin_actuales: [
        {
          value: this._MostrarService.registro.llamada[this.reg].sin_actuales,
          disabled: true,
        },
        [Validators.required],
      ],
      con_caso_sos: [
        this._MostrarService.registro.llamada[this.reg].con_caso_sos,
      ],
      obs_contacto: [
        {
          value: this._MostrarService.registro.llamada[this.reg].obs_contacto,
          disabled: true,
        },
        [Validators.required],
      ],
      obra_social: [
        this._MostrarService.registro.llamada[this.reg].obra_social,
        [Validators.required],
      ],
      enf_actual: [this._MostrarService.registro.llamada[this.reg].enf_actual],
      obs_enfermedad: [
        {
          value: this._MostrarService.registro.llamada[this.reg].obs_enfermedad,
          disabled: true,
        },
        [Validators.required],
      ],
      tratamiento: [
        {
          value: this._MostrarService.registro.llamada[this.reg].tratamiento,
          disabled: true,
        },
        [Validators.required],
      ],
      convivientes: [
        this._MostrarService.registro.llamada[this.reg].convivientes,
      ],
      cant_convivientes: [
        {
          value: this._MostrarService.registro.llamada[this.reg]
            .cant_convivientes,
          disabled: true,
        },
        [Validators.required],
      ],
      obs_convivientes: [
        {
          value: this._MostrarService.registro.llamada[this.reg]
            .obs_convivientes,
          disabled: true,
        },
        [Validators.required],
      ],
      sit_social: [
        this._MostrarService.registro.llamada[this.reg].sit_social,
        [Validators.required],
      ],
      intervencion: [
        this._MostrarService.registro.llamada[this.reg].intervencion,
      ],
      obs_intervencion: [
        {
          value: this._MostrarService.registro.llamada[this.reg]
            .obs_intervencion,
          disabled: true,
        },
        [Validators.required],
      ],
      cri_hisopado: [
        this._MostrarService.registro.llamada[this.reg].cri_hisopado,
      ],
      com_hisopado: [
        this._MostrarService.registro.llamada[this.reg].com_hisopado,
      ],
      mov_propia: [this._MostrarService.registro.llamada[this.reg].mov_propia],
      der_enfermeria: [
        this._MostrarService.registro.llamada[this.reg].der_enfermeria,
      ],
      dis_contacto: [
        this._MostrarService.registro.llamada[this.reg].dis_contacto,
      ],
      sol_hisopado: [
        this._MostrarService.registro.llamada[this.reg].sol_hisopado,
      ],
      lug_hisopado: [
        {
          value: this._MostrarService.registro.llamada[this.reg].lug_hisopado,
          disabled: true,
        },
        [Validators.required],
      ],
      fec_hisopado: [
        {
          value: this._MostrarService.registro.llamada[this.reg].fec_hisopado,
          disabled: true,
        },
        [Validators.required],
      ],
      req_extender: [
        {
          value: this._MostrarService.registro.llamada[this.reg].req_extender,
          disabled: true,
        },
        [Validators.required],
      ],
      cer_5dias: [this._MostrarService.registro.llamada[this.reg].cer_5dias],
      cer_contacto: [
        this._MostrarService.registro.llamada[this.reg].cer_contacto,
      ],
      tip_contacto: [
        this._MostrarService.registro.llamada[this.reg].tip_contacto,
      ],
      obs_tip_contacto: [
        {
          value: this._MostrarService.registro.llamada[this.reg]
            .obs_tip_contacto,
          disabled: true,
        },
        [Validators.required],
      ],
      cas_positivo: [
        this._MostrarService.registro.llamada[this.reg].cas_positivo,
      ],
      dat_positivo: [
        {
          value: this._MostrarService.registro.llamada[this.reg].dat_positivo,
          disabled: true,
        },
        [Validators.required],
      ],
      otro_certificado: [
        this._MostrarService.registro.llamada[this.reg].otro_certificado,
      ],
      seg_domiciliario: [
        this._MostrarService.registro.llamada[this.reg].seg_domiciliario,
      ],
      req_seguimiento: [
        this._MostrarService.registro.llamada[this.reg].req_seguimiento,
      ],
      laboratorio: [
        {
          value: this._MostrarService.registro.llamada[this.reg].laboratorio,
          disabled: true,
        },
      ],
      whatsapp: [
        {
          value: this._MostrarService.registro.llamada[this.reg].whatsapp,
          disabled: true,
        },
      ],
      det_requerimiento: [
        {
          value: this._MostrarService.registro.llamada[this.reg]
            .det_requerimiento,
          disabled: true,
        },
        [Validators.required],
      ],
      fec_salud: [
        {
          value: this._MostrarService.registro.llamada[this.reg].fec_salud,
          disabled: true,
        },
        [Validators.required],
      ],
      cierre_contacto: [
        this._MostrarService.registro.llamada[this.reg].cierre_contacto,
        [Validators.required],
      ],
      usuario: [this._MostrarService.registro.llamada[this.reg].usuario],
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
