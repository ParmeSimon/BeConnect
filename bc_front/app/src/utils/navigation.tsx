import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined'

export type NavItem = {
  label: string
  path: string
  authorisedRoles?: string[]
  isHidden?: boolean
  icon?: React.ReactNode
}

export const routes: NavItem[] = [
  // {
  //   label: 'Administrator',
  //   path: '/admin',
  //   authorisedRoles: ['ROLE_ADMIN'],
  //   isHidden: true,
  //   icon: <AccountCircleOutlined />
  // },
  // {
  //   label: 'Company',
  //   path: '/company',
  //   authorisedRoles: ['ROLE_COMPANY'],
  //   isHidden: true,
  //   icon: <AccountCircleOutlined />
  // }, {
  //   label: 'Student',
  //   path: '/student',
  //   authorisedRoles: ['ROLE_USER'],
  //   isHidden: true,
  //   icon: <AccountCircleOutlined />
  // }, 
  {
    label: 'Centre de Notifications',
    path: '/settings/notifications',
    authorisedRoles: ['ROLE_ADMIN', 'ROLE_COMPANY', 'ROLE_USER'],
    isHidden: false,
    icon: <AccountCircleOutlined />
  }, {
    label: 'Changer de mot de passe',
    path: '/settings/change-password',
    authorisedRoles: ['ROLE_ADMIN', 'ROLE_COMPANY', 'ROLE_USER'],
    isHidden: false,
    icon: <AccountCircleOutlined />
  }, {
    label: 'Ajouter un étudiant',
    path: '/settings/add-student',
    authorisedRoles: ['ROLE_ADMIN'],
    isHidden: false,
    icon: <AccountCircleOutlined />
  }
]

export const tablesRoutes: NavItem[] = [
  {
    label: 'Cursus',
    path: '/settings/courses',
    authorisedRoles: ['ROLE_ADMIN'],
    isHidden: false,
    icon: <AccountCircleOutlined />
  },
  {
    label: 'compétences',
    path: '/settings/skills',
    authorisedRoles: ['ROLE_ADMIN'],
    isHidden: false,
    icon: <AccountCircleOutlined />
  },
  {
    label: 'profil',
    path: '/settings/profil-wanted',
    authorisedRoles: ['ROLE_ADMIN'],
    isHidden: false,
    icon: <AccountCircleOutlined />
  },
  {
    label: 'localisation',
    path: '/settings/place',
    authorisedRoles: ['ROLE_ADMIN'],
    isHidden: false,
    icon: <AccountCircleOutlined />
  }
]
