export class Forms {
	constructor(
		public nroForm: string,
		public fecha: string,
		public tipo_registro: string,
		public motivo_consulta: string,
		public atencion_domiciliaria: string,
		public cert_aislamiento: string,
		public resultado_hisopado: string,
		public derivacion_107: string,
		public mov_propia: string,
		public criterio_hisopado: string,
		public realizo_hisopado: string,
		public fecha_ini_sint: string,
		public sintomas: string,
		public antencedentes_p: string,
		public enfermedad_pre: string,
		public toma_medicamentos: string,
		public vivienda_personas: string,
		public lugar_hisopado: string,
		public fecha_hisopado: string,
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
		public trabajo: [
			{
				lugar: string;
				telefonol: string;
				callel: string;
				numerol: string;
				localidadl: string;
			}
		],
		public cierre_contacto: string,
		public usuario: string
	) {}
}
