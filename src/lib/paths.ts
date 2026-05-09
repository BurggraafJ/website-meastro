/** Central route path constants for links and navigations. */
export const paths = {
  home: '/',
  mailAutomatisering: '/mail-automatisering',
  administratie: '/oplossingen/administratie',
  agendaBeheer: '/oplossingen/agenda-beheer',
  taken: '/oplossingen/taken',
  koppelingen: '/koppelingen',
  prijzen: '/prijzen',
  login: '/prijzen',
} as const

export type RoutePath = (typeof paths)[keyof typeof paths]
