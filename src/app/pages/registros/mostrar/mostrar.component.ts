import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  Input,
} from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { MostrarService } from "src/app/services/mostrar/mostrar.service";
import { Forms } from "../../models/form0800covid";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { RegllamadaComponent } from "./regllamada/regllamada.component";
import { FormsLlamada } from "../../models/form0800covid2";

@Component({
  selector: "app-mostrar",
  templateUrl: "./mostrar.component.html",
})
export class MostrarComponent implements OnInit, AfterViewInit {
  closeResult: string;
  personaForm: FormGroup;
  data: any = {};
  edad: string = "";
  mostrarEdad: number;
  mostrarFecha: string;
  mostrarFechaHisopado: string;
  public mostrar_hisopado: boolean = false;
  public mostrar_sintomas: boolean = false;
  public cargar_datos: boolean = true;
  public formtemp: Forms[] = [];
  public form: any = [];
  public cargando: boolean = true;
  public paginaD: number = 0;
  public totalForm: number = 0;
  soloLectura: boolean;
  dni: any = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public mostrarForm: MostrarService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  MostrarRegistro(): void {
    let dialogref = this.dialog.open(RegllamadaComponent, {
      width: "90%",
      data: { menssage: "Probando" },
    });
    dialogref.afterClosed().subscribe((res) => {
      console.log(res);
      if (res) {
        console.log("Prueba Exitosa");
      }
    });
  }
  @Input() llamada: any;

  ngOnInit(): void {
    this.initForm();
    this.form = this.mostrarForm.registro.llamada;
    this.cdr.markForCheck();
  }

  ngAfterViewInit(): void {
    this.initForm();
  }

  Mostrar(idform) {
    //console.log(idform);
    this.mostrarForm.registro = idform;

    this.cdr.markForCheck();
  }

  initForm() {
    this.personaForm = this.fb.group({
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
        provincia: [this.mostrarForm.registro.persona.provincia],
        img: [this.mostrarForm.registro.persona.img],
      }),
    });
    //console.log("esto se cargo");
    //console.log(this.personaForm);

    //console.log(this.edad);
    //console.log(this.mostrar_sintomas, this.mostrar_hisopado);

    this.cdr.markForCheck();
  }

  Volver() {
    this.router.navigateByUrl("/registros");
  }
}
