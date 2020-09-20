export interface Form0800 {
  nroForm: string;
  fecha: string;
  tipo_registro: string;
  motivo_consulta: string;
  atencion_domiciliaria: string;
  cert_aislamiento: string;
  resultado_hisopado: string;
  derivacion_107: string;
  mov_propia: string;
  criterio_hisopado: string;
  realizo_hisopado: string;
  fecha_ini_sint: string;
  sintomas: string;
  antencedentes_p: string;
  enfermedad_pre: string;
  toma_medicamentos: string;
  vivienda_personas: string;
  lugar_hisopado: string;
  fecha_hisopado: string;
  persona: {
    nombre: string;
    apellido: string;
    documento: string;
    fechaNacimiento: string;
    sexo: string;
    telefono: string;
    calle: string;
    numero: string;
    departamento: string;
    piso: string;
    localidad: string;
    img: string;
  };
  trabajo: [
    {
      telefono: string;
      calle: string;
      numero: string;
      localidad: string;
    }
  ];
  cierre_contacto: string;
  usuario: string;
}
