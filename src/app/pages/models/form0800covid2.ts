export class FormsLlamada {
	constructor(
		public llamada: [
			{
				nroForm: string;
				fecha: string;
				motivo: string;
				sintomas: string;
				fec_sintomas: string;
				sin_actuales: string;
				con_caso_sos: string;
				ant_personales: string;
				enf_actual: string;
				tratamiento: string;
				convivientes: string;
				cant_convivientes: string;
				obs_convivientes: string;
				sit_social: string;
				intervencion: string;
				obs_intervencion: string;
				cri_hisopado: string;
				mov_propia: string;
				der_enfermeria: string;
				dis_contacto: string;
				realizo_hisopado: string;
				lug_hisopado: string;
				fec_hisopado: string;
				req_extender: string;
				cer_aislamiento: string;
				cer_5dias: string;
				cer_contacto: string;
				tip_contacto: string;
				cas_positivo: string;
				otro_certificado: string;
				seg_domiciliario: string;
				usuario: string;
				cierre_contacto: string;
			}
		],
		public persona: {
			nombre: string;
			apellido: string;
			documento: string;
			fechaNacimiento: string;
			edad: string;
			sexo: string;
			telefono: string;
			calle: string;
			numero: string;
			departamento: string;
			piso: string;
			cpostal: string;
			localidad: string;
			provincia: string;
			pais: string;
			img: string;
		},
		public trabajo: {
			lugar: string;
			telefono: string;
			calle: string;
			numero: string;
			localidad: string;
		}
	) {}
}
