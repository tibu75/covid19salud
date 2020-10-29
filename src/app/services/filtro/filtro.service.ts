import { Injectable } from '@angular/core';
import { Reg0800Service } from "../reg0800/reg0800.service";

@Injectable({
  providedIn: 'root'
})
export class FiltroService {
public resultado: any  ;
  constructor(
    private reg0800: Reg0800Service,
  ) {
    
   }


   filtrar  (consulta: any, mfd: any, mfh: any) {
    const time = "T03:00:00.000Z";
    let fd = mfd + time;
    let fh = mfh + time;
  
    return this.resultado = this.reg0800.queryXls(consulta).subscribe((data: any) => {
      const persona = data.map(item => {
        const nombre = { nombre: item.persona.nombre };
        const apellido = { apellido: item.persona.apellido };
        const documento = { documento: item.persona.documento };
        const fechaNacimiento = { fechaNacimiento: item.persona.fechaNacimiento };
        const edad = { edad: item.persona.edad };
        const localidad = { localidad: item.persona.localidad };
        const telefono = { telefono: item.persona.telefono };
        const per = Object.assign(nombre, apellido, documento, fechaNacimiento, edad, localidad, telefono);
        return per;
      });
      const llamada = data.reduce((obj, value, i) => ({
        ...obj,
        [i]: value.llamada.reduce((obj, item, i) => ({
          ...obj,
          [i]: item
        }), 0)
      }), 0);
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
      const obj = exportConsulta(persona, call)
      const resultado = obj.filter((elm) => {
        const fil = elm.fecha >= fd && elm.fecha <= fh;
        return fil;
      });
      console.log("filtro", resultado);
      this.resultado = resultado;
      console.log("Resultado", this.resultado);
      return;
    });

  }

  
}

