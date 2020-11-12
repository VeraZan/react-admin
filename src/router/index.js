const router = [
  {
    title: '控制台',
    icon: 'DashboardOutlined',
    key: '/index'
  },
  {
    title: '用户管理',
    icon: 'UserOutlined',
    key: '/index/user',
    children: [
      {key: '/index/user/index', title: '用户列表', icon: '',},
      {key: '/index/user/add', title: '添加用户',icon: ''}
    ]
  },
  {
    title: '部门管理',
    icon: 'BankOutlined',
    key: '/index/department',
    children: [
      {key: '/index/department/index', title: '部门列表', icon: ''},
      {key: '/index/department/add', title: '添加部门', icon: ''},
    ]
  },
  {
    title: '职位管理',
    icon: 'TeamOutlined',
    key: '/index/entry',
    children: [
      {key: '/index/entry/form/basic-form', title: '职位列表'},
      {key: '/index/entry/form/step-form', title: '添加职位'}
    ]
  },
  {
    title: '请假',
    icon: 'SolutionOutlined',
    key: '/index/about'
  },
  {
    title: '加班',
    icon: 'ScheduleOutlined',
    key: '/index/abouta'
  }
]
export default router;