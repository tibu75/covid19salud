import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  
} from "@angular/core";
import { Form0800Model } from "../models/form0800covid";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { RenaperService } from "../../services/ws/renaper.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"],
})
export class RegistroComponent implements OnInit, AfterViewInit {
  closeResult: string;
  @ViewChild("content") contenidoDelModal: any;
  personaForm: FormGroup;
  form_registro: FormGroup;
  renaper: any = {};
  data: any = {};
  cargando: boolean = false;


  constructor(
    public _renaperService: RenaperService,
    private modalService: NgbModal,
    private ruta: Router,
    private activadeRoute: ActivatedRoute

  ) {}

  ngOnInit(): void {
    this.personaForm = new FormGroup({
      documento: new FormControl("", [
        Validators.required,
        Validators.maxLength(8),
      ]),
      sexo: new FormControl(null, Validators.required),
    });
    this.form_registro = new FormGroup({
      nroRegistro: new FormControl("", [
        Validators.required,
        Validators.maxLength(8),
      ]),
      fecha: new FormControl("", [
        Validators.required,
        Validators.maxLength(8),
      ]),
      tipo_registro: new FormControl("", [
        Validators.required,
        Validators.maxLength(8),
      ]),
      motivo_consulta: new FormControl("", [
        Validators.required,
        Validators.maxLength(8),
      ]),
      persona: new FormGroup({
        nombre: new FormControl("", [
          Validators.required,
          Validators.maxLength(8),
        ]),
        apellido: new FormControl("", [
          Validators.required,
          Validators.maxLength(8),
        ]),
        documento: new FormControl("", [
          Validators.required,
          Validators.maxLength(8),
        ]),
        fechaNacimiento: new FormControl("", [
          Validators.required,
          Validators.maxLength(8),
        ]),
        sexo: new FormControl("", [
          Validators.required,
          Validators.maxLength(8),
        ]),
        telefono: new FormControl("", [
          Validators.required,
          Validators.maxLength(8),
        ]),
        calle: new FormControl("", [
          Validators.required,
          Validators.maxLength(8),
        ]),
        numero: new FormControl("", [
          Validators.required,
          Validators.maxLength(8),
        ]),
        localidad: new FormControl("", [
          Validators.required,
          Validators.maxLength(8),
        ]),
        img: new FormControl("", [
          Validators.required,
          Validators.maxLength(8),
        ]),
      }),
      fecha_ini_sint: new FormControl("", [
        Validators.required,
        Validators.maxLength(8),
      ]),
      sintomas: new FormControl("", [
        Validators.required,
        Validators.maxLength(8),
      ]),
      antencedentes_p: new FormControl("", [
        Validators.required,
        Validators.maxLength(8),
      ]),
      enfermedad_pre: new FormControl("", [
        Validators.required,
        Validators.maxLength(8),
      ]),
      toma_medicamentos: new FormControl("", [
        Validators.required,
        Validators.maxLength(8),
      ]),
      vivienda_personas: new FormControl("", [
        Validators.required,
        Validators.maxLength(8),
      ]),

      trabajo: new FormArray([
        new FormGroup({
          telefono: new FormControl("", [
            Validators.required,
            Validators.maxLength(8),
          ]),
          calle: new FormControl("", [
            Validators.required,
            Validators.maxLength(8),
          ]),
          numero: new FormControl("", [
            Validators.required,
            Validators.maxLength(8),
          ]),
          localidad: new FormControl("", [
            Validators.required,
            Validators.maxLength(8),
          ]),
        }),
      ]),
      usuario: new FormControl("", [
        Validators.required,
        Validators.maxLength(8),
      ]),
    });
  }

  ngAfterViewInit() {
    
    this.open(this.contenidoDelModal);
  }

  recargar(){
    document.getElementById("formulario");
}
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  Renaper() {
    
    let params = `documento=${this.personaForm.value.documento}&sexo=${this.personaForm.value.sexo}`;
    console.log(params);
      this._renaperService.getPersona(params).subscribe((data) => {
      this.renaper=data;
      if (data) {
        this.cargando = true;
        console.log(this.renaper);
        this.form_registro.patchValue({
          persona: { documento: this.personaForm.value.documento },
        });
        this.form_registro.patchValue({
          persona: { sexo: this.personaForm.value.sexo },
        });
        this.form_registro.patchValue({
          persona: { img: this.renaper.datos.foto },
        });
        this.form_registro.patchValue({
          persona: { apellido: this.renaper.datos.apellido },
        });
        this.form_registro.patchValue({
          persona: { nombre: this.renaper.datos.nombres },
        });
        this.form_registro.patchValue({
          persona: { fechaNacimiento: this.renaper.datos.fechaNacimiento },
        });
        this.form_registro.patchValue({
          persona: { calle: this.renaper.datos.calle },
        });
        this.form_registro.patchValue({
          persona: { numero: this.renaper.datos.numero },
        });
        this.form_registro.patchValue({
          persona: { piso: this.renaper.datos.piso },
        });
        this.form_registro.patchValue({
          persona: { departamento: this.renaper.datos.departamento },
        });
        this.form_registro.patchValue({
          persona: { cpostal: this.renaper.datos.cpostal },
        });
        this.form_registro.patchValue({
          persona: { localidad: this.renaper.datos.ciudad },
        });
        this.form_registro.patchValue({
          persona: { provincia: this.renaper.datos.provincia },
        });
        this.form_registro.patchValue({
          persona: { pais: this.renaper.datos.pais },
        });
        console.log(this.form_registro);
      } else {
       this.cargando=false;
       return this.ruta.navigateByUrl(`/dashboard`);
      }
    });


  }
}
