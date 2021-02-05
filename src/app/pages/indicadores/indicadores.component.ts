import {
  ChangeDetectorRef,
  Component,
  OnInit,
  AfterViewInit,
} from "@angular/core";
import { Localidades } from "../models/localidades";
import { LocalidadesService } from "../../services/localidades/localidades.service";
import { Reg0800Service } from "src/app/services/reg0800/reg0800.service";
import { FormsLlamada } from "../models/form0800covid2";
import { Form0800Service } from "../../services/form0800/form0800.service";
import * as moment from "moment";
import { SocketService } from "src/app/services/socket/socket.service";
import { opc_form } from '../../interfaces/opc_form.interface';

@Component({
  selector: "app-indicadores",
  templateUrl: "./indicadores.component.html",
  styleUrls: [],
})
export class IndicadoresComponent implements OnInit, AfterViewInit {
  public localidades: Localidades[] = [];
  public paginaD: number = 0;
  public totalForm: number = 0;
  public cargando: boolean = true;
  public cargado: boolean = false;
  public formtemp: FormsLlamada[] = [];
  public form: any[] = [];
  public cantRegistros: number = 0;
  soloLectura: boolean;
  data: any = [];
  dni: any = [];
  public formulario: boolean = false;
  public vacuna: boolean = false;
  public form_Covid: number = 0;
  public form_Vacuna: number = 0;
  public aplico_Vacuna: number = 0;
  public primeraD_Vacuna: number = 0;
  public segundaD_Vacuna: number = 0;
  public recibidasCovid: number = 0;
  public realizadasCovid: number = 0;
  public recibidasVacuna: number = 0;
  public realizadasVacuna: number = 0;
  public conSintomas: number = 0;
  public sinSintomas: number = 0;
  public sintomas: boolean = false;

  public persona: any[];
  public labelsLoc: string[];
  public labelsFec: string[];
  public datosLoc: number[];
  public datosCovidFec: number[];
  public datosVacunaFec: number[];
  public colorCovid: string = "#ffa200";
  public colorVacunatorio: string = "#ff009c";

  constructor(
    public reg0800Service: Reg0800Service,
    private localidadesService: LocalidadesService,
    private cdr: ChangeDetectorRef,
    public f: Form0800Service,
    private wsService: SocketService
  ) {
    this.cargarLocalidades();
  }

  ngOnInit(): void {
    // Conexion al Socket

    this.cargarForms();
  }
  ngAfterViewInit(): void {
    this.wsService.listen("dataUpdate").subscribe((data) => {
      console.log(" +++++++++++++++++++++ ESCUCHANDO INDICADORES: ", data);
      this.cargarForms();
      this.cdr.markForCheck();
    });
  }
  cargarLocalidades() {
    this.localidadesService.getLocalidades().subscribe((data: any) => {
      this.localidades = data;
      this.cdr.markForCheck();
    });
  }

  cargarForms() {
    this.cargando = true;

    this.reg0800Service.indicadores().subscribe(({ total, registros }) => {
      //console.log("cargarForms: Registros ", registros);
      //console.log("Total de Personas: ", total);
      this.form = registros;
      this.filtrar();
      this.filtrarUlt7();
      this.BuscarCantFormu();
      this.BuscarRegSintomas();
      this.totalForm = total;
      this.cdr.markForCheck();

      this.cargando = false;
      this.soloLectura = true;
    });
    this.cdr.markForCheck();
  }

  filtrar() {
    let datosLocTemp: number[] = [];
    let labelsLocTemp: string[] = [];
    const time = "T03:00:00.000Z";
    let fd = "2020-10-22" + time;
    let fh = moment().format("YYYY-MM-DD") + time;
    this.persona = this.form.map((item) => {
      const localidad = { localidad: item.persona.localidad };
      const per = Object.assign(localidad);
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
    const obj = exportConsulta(this.persona, call);
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
        labelsLocTemp.push(labelLoc.nombre);
        datosLocTemp.push(acuLoc);
      }
    });
    this.labelsLoc = labelsLocTemp;
    this.datosLoc = datosLocTemp;
    this.cdr.markForCheck();
  }
  filtrarUlt7() {
    let datosCovidFecTemp: number[] = [];
    let datosVacunaFecTemp: number[] = [];
    let labelsFecTemp: string[] = [];
    const time = "T03:00:00.000Z";
    const acu = 1;
    let fd =
      moment(Date.now() - 6 * 24 * 3600 * 1000).format("YYYY-MM-DD") + time;
    let fh = moment().format("YYYY-MM-DD") + time;
    let f7: any[] = [];
    for (let dia = 6; dia >= 0; dia--) {
      f7.push(
        moment(Date.now() - dia * 24 * 3600 * 1000).format("YYYY-MM-DD") + time
      );
    }
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
    const obj = exportConsulta(this.persona, call);
    const resultadoCovid = obj.filter((elm) => {
      const fil = elm.opc_form === "covid" && elm.fecha >= fd && elm.fecha <= fh;
      return fil;
    });
    const resultadoVacuna = obj.filter((elm) => {
      const fil = elm.opc_form === "vacuna" && elm.fecha >= fd && elm.fecha <= fh;
      return fil;
    });
    //console.log("RESULTADO: ", resultado);

    f7.forEach((porFec) => {
      //console.log("Porfec: ", porFec);
      const totalFechasCovid = resultadoCovid.filter((busFec) => busFec.fecha === porFec).length;
      datosCovidFecTemp.push(totalFechasCovid);

    }),
      f7.forEach((porFec) => {
        //console.log("Porfec: ", porFec);
        const totalFechasVacuna = resultadoVacuna.filter((busFec) => busFec.fecha === porFec).length;
        datosVacunaFecTemp.push(totalFechasVacuna);

      }),

      f7.forEach((porFec) => {
        let temp = porFec.substring(5);
        temp = temp.split("T", 1);
        labelsFecTemp.push(...temp);
      });

    this.datosCovidFec = datosCovidFecTemp;
    this.datosVacunaFec = datosVacunaFecTemp;
    this.labelsFec = labelsFecTemp;
    /* console.log("Los datos a pasar son Por Fecha : ",
   this.labelsFec,
     this.datosCovidFec,
     this.datosVacunaFec,
   ); */
    // console.log("filtro Paso Por Fecha", resultado);

    this.cdr.markForCheck();
  }

  BuscarCantFormu() {
    let acum = 0;
    let vacum = 0;
    this.form_Covid = 0;
    this.form_Vacuna = 0;
    this.aplico_Vacuna = 0;
    this.segundaD_Vacuna = 0;
    this.primeraD_Vacuna = 0;
    //console.log("form antes de filtoro", this.form);
    this.form.forEach((x) => {
      this.formulario = false;
      x.llamada.forEach((data) => {
        if (data.opc_form === "covid") {
          this.formulario = true;
        }
        acum++;
        if (data.opc_form === "vacuna") {
          if (data.vacuna_form.vac_suministro_vac === "Si") {
            this.aplico_Vacuna++;
          }

          if (data.vacuna_form.vac_que_dosis === "primera") {
            this.primeraD_Vacuna++;
          }
          if (data.vacuna_form.vac_que_dosis === "segunda") {
            this.segundaD_Vacuna++;
          }
        }
      });
      /*  if (this.formulario) {
         this.form_Covid++;
       } else {
         this.form_Vacuna++;
       } */
    });
    /* console.log("Vacuna", this.aplico_Vacuna);
    console.log("1dosis", this.primeraD_Vacuna);
    console.log("2dosis", this.segundaD_Vacuna);
    console.log("form covid", this.form_Covid);
    console.log("form Vacuna ", this.form_Vacuna); */
  }

  BuscarRegSintomas() {
    let acum = 0;
    this.conSintomas = 0;
    this.sinSintomas = 0;
    this.cantRegistros = 0;
    this.form_Covid = 0;
    this.form_Vacuna = 0;
    this.realizadasCovid = 0;
    this.recibidasCovid = 0;
    this.realizadasVacuna = 0;
    this.recibidasVacuna = 0;
    this.form.forEach((x) => {
      this.sintomas = false;
      x.llamada.forEach((y) => {
        if (y.sintomas === "Si") {
          this.sintomas = true;
        }
        acum++;
        if (y.opc_form == "covid") {
          this.form_Covid++;
          y.tipo_llamada === "Entrada" ? this.recibidasCovid++ : this.realizadasCovid++;
        } else {
          this.form_Vacuna++;
          y.tipo_llamada === "Entrada" ? this.recibidasVacuna++ : this.realizadasVacuna++;
        };
      });
      if (this.sintomas) {
        this.conSintomas++;
      } else {
        this.sinSintomas++;
      }
    });
    this.cantRegistros = acum; /* 
    console.log("Registros totales: ", this.cantRegistros);
    console.log("Registros con sintomas: ", this.conSintomas);
    console.log("Registros sin sintomas: ", this.sinSintomas); */
    this.cargado = true;
  }
}
