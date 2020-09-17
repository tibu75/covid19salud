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

import { Router, ActivatedRoute } from "@angular/router";

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
  cargando: boolean = true;

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
        Validators.required]),
      fecha: new FormControl("", [
        Validators.required
      ]),
      tipo_registro: new FormControl("", [
        Validators.required
      ]),
      motivo_consulta: new FormControl("", [
        Validators.required,
        Validators.maxLength(500),
      ]),
      persona: new FormGroup({
        nombre: new FormControl("", [
          Validators.required]),
        apellido: new FormControl("", [
          Validators.required,
          Validators.maxLength(25),
        ]),
        documento: new FormControl("", [
          Validators.required,
          Validators.maxLength(8),
        ]),
        fechaNacimiento: new FormControl("", [
          Validators.required
        ]),
        sexo: new FormControl("", [
          Validators.required
        ]),
        telefono1: new FormControl("", [
          Validators.required,
          Validators.maxLength(10),
        ]),
        telefono2: new FormControl("", [
          Validators.required,
          Validators.maxLength(10),
        ]),
        calle: new FormControl("", [
          Validators.required,
          Validators.maxLength(20),
        ]),
        numero: new FormControl("", [
          Validators.required,
          Validators.maxLength(4),
        ]),
        departamento: new FormControl("", [
          Validators.required,
          Validators.maxLength(5),
        ]),
        piso: new FormControl("", [
          Validators.required,
          Validators.maxLength(2),
        ]),
        localidad: new FormControl("", [
          Validators.required,
          Validators.maxLength(50),
        ]),
        cpostal: new FormControl("", [
          Validators.required,
          Validators.maxLength(4),
        ]),
        provincia: new FormControl("", [
          Validators.required,
          Validators.maxLength(25),
        ]),
        pais: new FormControl("", [
          Validators.required,
          Validators.maxLength(25),
        ]),
        img: new FormControl("", [
          Validators.required
        ]),
      }),
      fecha_ini_sint: new FormControl("", [
        Validators.required
      ]),
      sintomas: new FormControl("", [
        Validators.required
      ]),
      antencedentes_p: new FormControl("", [
        Validators.required,
      ]),
      enfermedad_pre: new FormControl("", [
        Validators.required
      ]),
      toma_medicamentos: new FormControl("", [
        Validators.required
      ]),
      vivienda_personas: new FormControl("", [
        Validators.required,
        Validators.maxLength(2),
      ]),

      trabajo: new FormArray([
        new FormGroup({
          lugar: new FormControl("", [
            Validators.required,
            Validators.maxLength(50),
          ]),
          telefono: new FormControl("", [
            Validators.required,
            Validators.maxLength(10),
          ]),
          calle: new FormControl("", [
            Validators.required,
            Validators.maxLength(25),
          ]),
          numero: new FormControl("", [
            Validators.required,
            Validators.maxLength(4),
          ]),
          localidad: new FormControl("", [
            Validators.required,
            Validators.maxLength(25),
          ]),
        }),
      ]),
      usuario: new FormControl("", [
        Validators.required
      ]),
    });
  }

  ngAfterViewInit() {
    this.open(this.contenidoDelModal);
  }

  recargar() {
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
      this.renaper = data;
      if (this.renaper) {
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
        return this.ruta.navigateByUrl(`/registro`);
      } else {
        this.cargando = false;
        return this.ruta.navigateByUrl(`/dashboard`);
      }
    });
  }
}
