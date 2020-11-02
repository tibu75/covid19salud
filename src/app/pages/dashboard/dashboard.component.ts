import { ChangeDetectorRef, Component, OnInit, AfterViewInit } from "@angular/core";
import { Localidades } from "../models/localidades";
import { LocalidadesService } from "../../services/localidades/localidades.service";
import { MostrarService } from "src/app/services/mostrar/mostrar.service";
import { Reg0800Service } from "src/app/services/reg0800/reg0800.service";
import { FormsLlamada } from "../models/form0800covid2";
import { Form0800Service } from "../../services/form0800/form0800.service";
import * as moment from "moment";
import { SocketService } from "src/app/services/socket/socket.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public localidades: Localidades[] = [];
  public paginaD: number = 0;
  public totalForm: number = 0;
  public cargando: boolean = true;
  public formtemp: FormsLlamada[] = [];
  public form: any[] = [];
  public cantRegistros: number = 0;
  soloLectura: boolean;
  data: any = [];
  dni: any = [];
  conSintomas = 0;
  sinSintomas = 0;
  datosLoc: any [] = [];
  labelsLoc: any [] = [];
  dataGraf: any [] = [];
  constructor(public reg0800Service: Reg0800Service,
    private localidadesService: LocalidadesService,
    private cdr: ChangeDetectorRef,
    public f: Form0800Service,
    private wsService: SocketService) { }

  ngOnInit(): void {
    this.wsService.listen("dataUpdate").subscribe((data) => {
      console.log("Inicia el Formulario");
      this.cargarLocalidades();
      this.cargarForms();
      this.cdr.markForCheck();
      if (this.cargando)
      console.log("DatosLoc es: ",this.dataGraf);
      this.dataGraf= this.datosLoc;
    });
  }

  cargarLocalidades() {
    this.localidadesService.getLocalidades().subscribe((data: any) => {
      this.localidades = data;
      console.log("Localidades: ", this.localidades);
      this.cdr.markForCheck();
    });
  }

  cargarForms() {
    this.cargando = true;
    this.reg0800Service.getRegistrosTodos(1000).subscribe(({ total, registros }) => {
      console.log("cargarForms: Registros ", registros);
      console.log("Total de Personas: ", total);
      this.form = registros;
      this.filtrar(); /* 
        this.BuscarRegSintomasFecha(); */
      this.totalForm = total;
      this.cdr.markForCheck();

      this.cargando = false;
      this.soloLectura = true;
    });
    this.cdr.markForCheck();
    return this.datosLoc
  }

  filtrar() {
    const time = "T03:00:00.000Z";
    let fd = "2020-10-22" + time;
    let fh = moment().format("YYYY-MM-DD") + time;
    console.log(fd, " ", fh);
    const persona = this.form.map((item) => {
      const documento = { documento: item.persona.documento };
      const edad = { edad: item.persona.edad };
      const localidad = { localidad: item.persona.localidad };
      const per = Object.assign(documento, edad, localidad);
      return per;
    });

    const llamada = this.form.reduce(
      (obj, value, i) => ({
        ...obj,
        [i]: value.llamada.reduce(
          (obj, item, i) => ({
            ...obj,
            [i]: item,
          }),
          0
        ),
      }),
      0
    );
    const call = [Object.values(llamada)];

    const exportConsulta = (obj1: any, obj2: any) => {
      let acc = 0;
      let consulta = [];
      obj1.forEach((i) => {
        obj2.forEach((y) => {
          const llamadas2 = [Object.values(y[acc])];
          llamadas2.forEach((x) => {
            x.forEach((z) => {
              let val = Object.assign({}, i, z);
              consulta.push(val);
              //console.log("consulta", val);
            });
            acc++;
          });
        });
      });
      return consulta;
    };
    const obj = exportConsulta(persona, call);
    const resultado = obj.filter((elm) => {
      const fil = elm.fecha >= fd && elm.fecha <= fh;
      return fil;
    });
    this.localidades.forEach((labelLoc) => {
      let acuLoc = 0;
      resultado.forEach((busLoc) => {
        if (busLoc.localidad === labelLoc.nombre) {
          acuLoc = acuLoc + 1;
        }
      });
      if (acuLoc > 0) {
        console.log("La ciudad " + labelLoc.nombre + " tiene:", acuLoc);
        this.labelsLoc.push(labelLoc.nombre);
        this.datosLoc.push({"name":labelLoc.nombre,"value":acuLoc});
      }
    });
    console.log("Los datos a pasar son : ", this.datosLoc)
    console.log("filtro Paso", resultado);
    this.cdr.markForCheck();
  }

}
