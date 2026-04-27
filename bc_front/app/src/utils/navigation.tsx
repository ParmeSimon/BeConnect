import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined'

export const isAdmin = [{ label: "Dashboard", link: "/admin/dashboard" }, { label: "Offres", link: "/admin/offers" }, { label: "Étudiants", link: "/admin/students" }, { label: "Alumnis", link: "/admin/alumnis" }, { label: "Entreprises", link: "/admin/companies" }]
export const isStudent = [{ label: "Profil", link: "/student/profile" }, { label: "Offres", link: "/student/offers" }, { label: "Étudiants", link: "/student/students" }, { label: "Ancien étudiants", link: "/student/alumnis" }, { label: "Entreprises", link: "/student/companies" }, { label: "Suivi", link: "/student/tracking" }]
export const isCompany = [{ label: "Profil", link: "/company/profile" }, { label: "Offres", link: "/company/offers" }, { label: "Étudiants", link: "/company/students" }, { label: "Candidatures", link: "/company/applications" }]


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
