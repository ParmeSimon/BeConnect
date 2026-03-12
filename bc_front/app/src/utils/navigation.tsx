import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined'

export type NavItem = {
  label: string
  path: string
  authorisedRoles?: string[]
  isHidden?: boolean
  icon?: React.ReactNode
}

export const routes: NavItem[] = [
  {
    label: 'Administrator',
    path: '/admin',
    authorisedRoles: ['ROLE_ADMIN'],
    isHidden: true,
    icon: <AccountCircleOutlined />
  },
  {
    label: 'Company',
    path: '/company',
    authorisedRoles: ['ROLE_COMPANY'],
    isHidden: true,
    icon: <AccountCircleOutlined />
  },
  {
    label: 'Parameters',
    path: '/parameters',
    authorisedRoles: ['ROLE_ADMIN', 'ROLE_COMPANY','ROLE_USER'],
    isHidden: true,
    icon: <AccountCircleOutlined />
  },{
    label: 'Student',
    path: '/student',
    authorisedRoles: ['ROLE_USER'],
    isHidden: true,
    icon: <AccountCircleOutlined />
  }
]
