export class Forms {
	constructor(
		public nroRegistro: string,
		public fecha: string,
		public tipo_registro: string,
		public motivo_consulta: string,
		public persona: {
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
			provincia: string;
			pais: string;
			img: string;
		},
		public fecha_ini_sint: string,
		public sintomas: string,
		public antencedentes_p: string,
		public enfermedad_pre: string,
		public toma_medicamentos: string,
		public vivienda_personas: string,

		public trabajo: [
			{
				lugar: string;
				telefonol: string;
				callel: string;
				numerol: string;
				localidadl: string;
			}
		],
		public estados: [
			{
				atencion_domiciliaria: string;
				certificado: string;
				resultado_hisopado: string;
				derivacion_107: string;
				criterio_hisopado: string;
				realizo_hisopado: string;
				lugar_hisopado: string;
				fecha_hisopado: string;
			}
		],
		public cierre_contacto: string,
		public usuario: string
	) {}
}
