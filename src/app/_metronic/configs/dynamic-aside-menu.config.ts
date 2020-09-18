export const DynamicAsideMenuConfig = {
  items: [
    {
      title: 'Principal',
      root: true,
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      page: '/dashboard',
      bullet: 'dot',
    },
    /* {
      title: 'Layout Builder',
      root: true,
      icon: 'flaticon2-expand',
      page: '/builder',
      svg: './assets/media/svg/icons/Home/Library.svg'
    }, */
    { section: 'Registro de LLamadas' },
    {
      title: 'Registros',
      root: true,
      bullet: 'dot',
      page: '/registros',
      icon: 'flaticon2-browser-2',
      svg: './assets/media/svg/icons/Communication/Active-call.svg',
    }
  ]
};
