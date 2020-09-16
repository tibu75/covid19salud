export class Form0800Model {
  constructor(
    public nroRegistro: string,
    public fecha: string,
    public tipo_registro: string,
    public motivo_consulta: string,
    public persona: {
      nombre: string,
      apellido: string,
      documento: string,
      fechaNacimiento: string,
      sexo: string,
      telefono: string,
      calle: string,
      numero: string,
      localidad: string,
      img: string,
    },
    public fecha_ini_sint: string,
    public sintomas: string,
    public antencedentes_p: string,
    public enfermedad_pre: string,
    public toma_medicamentos: string,
    public vivienda_personas: string,

    public trabajo: [{
      telefono: string,
      calle: string,
      numero: string,
      localidad: string,

    }],
    public usuario:string,
  ) {}
}
