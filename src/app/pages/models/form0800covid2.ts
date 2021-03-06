export class FormsLlamada {
  constructor(
    public nroForm: string,
    public fecha: string,
    public llamada: [
      {
        nroForm: string;
        fecha: string;
        opc_form: string;
        tipo_llamada: string;
        motivo: string;
        sintomas: string;
        fec_sintomas: string;
        sin_actuales: string;
        con_caso_sos: string;
        obs_contacto: string;
        obra_social: string;
        enf_actual: string;
        obs_enfermedad: string;
        tratamiento: string;
        convivientes: string;
        cant_convivientes: string;
        obs_convivientes: string;
        sit_social: string;
        intervencion: string;
        obs_intervencion: string;
        cri_hisopado: string;
        com_hisopado: string;
        mov_propia: string;
        der_enfermeria: string;
        dis_contacto: string;
        sol_hisopado: string;
        lug_hisopado: string;
        fec_hisopado: string;
        req_extender: string;
        cer_5dias: string;
        cer_contacto: string;
        tip_contacto: string;
        obs_tip_contacto: string;
        cas_positivo: string;
        dat_positivo: string;
        otro_certificado: string;
        seg_domiciliario: string;
        req_seguimiento: string;
        laboratorio: string;
        whatsapp: string;
        det_requerimiento: string;
        fec_salud: string;
        vacuna_form: {
          vac_motivo: string;
          vac_factor_riesgo_patologias: string;
          vac_obs_factor: string;
          vac_tratamiento: string;
          vac_especificar: string;
          vac_medicacion: string;
          vac_tratamiento_plasma: string;
          vac_estudios_rutina: string;
          vac_obs_est_rut: string;
          vac_gripe_camp_ant: string;
          vac_enfermedad_covid: string;
          vac_covid_cuando: string;
          vac_suministro_vac: string;
          vac_fec_adm_vac: string;
          vac_efector: string;
          vac_que_dosis: string;
          vac_sintomas_adm_vac: string;
          vac_cierre_contacto: string;
        };
        cierre_contacto: string;
        usuario: string;
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
    public trabajo: [
      {
        lugar: string;
        telefono: string;
        calle: string;
        numero: string;
        localidad: string;
      }
    ],
    public _id?: string
  ) {}
}
