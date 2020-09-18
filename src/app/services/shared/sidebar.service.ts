import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        //{ titulo : 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' }
      ]
    },
    {
      titulo: 'Configuracion',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Edificios', url: '/edificios' },
        { titulo: 'Personas', url: '/personas' },
        { titulo: 'Registros', url: '/registros' }
      ]
    }
  ];

  constructor() { }

}