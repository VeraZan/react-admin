const router = [
  {
    title: 'menu_dashboard',
    icon: 'DashboardOutlined',
    key: '/index'
  },
  {
    title: 'menu_user',
    icon: 'UserOutlined',
    key: '/index/user',
    children: [
      {key: '/index/user/index', title: 'menu_userIndex', icon: '',},
      {key: '/index/user/add', title: 'menu_userAdd',icon: ''}
    ]
  },
  {
    title: 'menu_department',
    icon: 'BankOutlined',
    key: '/index/department',
    children: [
      {key: '/index/department/index', title: 'menu_departmentIndex', icon: ''},
      {key: '/index/department/add', title: 'menu_departmentAdd', icon: ''},
    ]
  },
  {
    title: 'menu_entry',
    icon: 'TeamOutlined',
    key: '/index/entry',
    children: [
      {key: '/index/entry/form/basic-form', title: 'menu_entryIndex'},
      {key: '/index/entry/form/step-form', title: 'menu_entryAdd'}
    ]
  },
  {
    title: 'menu_leave',
    icon: 'SolutionOutlined',
    key: '/index/leave'
  },
  {
    title: 'menu_overtime',
    icon: 'ScheduleOutlined',
    key: '/index/overtime'
  }
]
export default router;