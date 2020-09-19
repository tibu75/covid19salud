export interface Form0800 {
	nroRegistro: string;
	fecha: string;
	tipo_registro: string;
	motivo_consulta: string;
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
	fecha_ini_sint: string;
	sintomas: string;
	antencedentes_p: string;
	enfermedad_pre: string;
	toma_medicamentos: string;
	vivienda_personas: string;

	trabajo: [
		{
			telefono: string;
			calle: string;
			numero: string;
			localidad: string;
		}
	];

	usuario: string;
}
