import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/view/layout'
import Login from '@/view/login'
import Error from '@/view/error'
import Admin from '@/view/admin/admin'

Vue.use(Router)

/* export default new Router({
  mode: 'history',
  base: '/report/',
  routes: [
    {
      path: '/', // 项目第一个页面路径为/ ，将它重定向到/login
      redirect: '/login',
      component: Layout,
      children: [{
        path: '/admin',
        name: 'Admin',
        component: Admin
      }]
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/operation',
      name: 'Operation',
      component: Layout,
      children: [{
        path: 'add',
        name: 'Add',
        component: () => import('@/view/operation/add/index'),
        children: [{
          path: 'group',
          name: 'AddGroup',
          component: () => import('@/view/operation/add/add-group')
        }, {
          path: 'building',
          name: 'AddBuilding',
          component: () => import('@/view/operation/add/add-building')
        }, {
          path: 'sport',
          name: 'AddSport',
          component: () => import('@/view/operation/add/add-sport')
        }]
      }, {
        path: 'all',
        name: 'All',
        component: () => import('@/view/operation/all/index'),
        children: [
          {
            path: 'group',
            name: 'AllGroup',
            component: () => import('@/view/operation/all/all-group')
          }, {
            path: 'building',
            name: 'AllBuilding',
            component: () => import('@/view/operation/all/all-building')
          }, {
            path: 'sport',
            name: 'AllSport',
            component: () => import('@/view/operation/all/all-sport')
          }
        ]
      }]
    },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ]
}) */

// 通用路由
export const constantRoutes = [
  {
    path: '/', // 项目第一个页面路径为/ ，将它重定向到/login
    redirect: '/admin',
    component: Layout,
    children: [{
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {title: '首页', roles: ['1', '2', '3', '4']}
    }]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

// export const constantRoutes = [
//   {
//     path: '/login',
//     name: 'Login',
//     component: Login
//   }
// ]

// export const layoutRoutes = [
//   {
//     path: '/', // 项目第一个页面路径为/ ，将它重定向到/login
//     component: Layout,
//     redirect: '/login'
//   }
// ]

// 异步挂载的路由
export const asyncRoutes = [
  {
    path: '/operation',
    name: 'Operation',
    component: Layout,
    meta: {title: '运营成本', roles: ['1', '2', '3', '4']},
    children: [{
      path: 'add',
      name: 'Add',
      component: () => import('@/view/operation/add/index'),
      meta: {title: '运营成本统计', roles: ['1', '2', '3']},
      children: [{
        path: 'group',
        name: 'AddGroup',
        meta: {title: '集团模块', roles: ['1']},
        component: () => import('@/view/operation/add/add-group')
      }, {
        path: 'building',
        name: 'AddBuilding',
        meta: {title: '建筑模块', roles: ['2']},
        component: () => import('@/view/operation/add/add-building')
      }, {
        path: 'sport',
        name: 'AddSport',
        meta: {title: '文体模块', roles: ['3']},
        component: () => import('@/view/operation/add/add-sport')
      }]
    }, {
      path: 'all',
      name: 'All',
      component: () => import('@/view/operation/all/index'),
      meta: {title: '运营成本汇总', roles: ['1', '2', '3', '4']},
      children: [
        {
          path: 'group',
          name: 'AllGroup',
          meta: {title: '集团模块', roles: ['1', '4']},
          component: () => import('@/view/operation/all/all-group')
        }, {
          path: 'building',
          name: 'AllBuilding',
          meta: {title: '建筑模块', roles: ['2', '4']},
          component: () => import('@/view/operation/all/all-building')
        }, {
          path: 'sport',
          name: 'AllSport',
          meta: {title: '文体模块', roles: ['3', '4']},
          component: () => import('@/view/operation/all/all-sport')
        }
      ]
    }]
  },
  {
    path: '/project',
    name: 'Program',
    component: Layout,
    meta: {title: '项目明细', roles: ['2', '4']},
    children: [{
      path: 'tool',
      name: 'Tool',
      component: () => import('@/view/project/tool/index'),
      meta: {title: '表单工具', roles: ['2', '4']}
    }, {
      path: 'add',
      name: 'ProgramAdd',
      component: () => import('@/view/project/add/index'),
      meta: {title: '新增表单', roles: ['2']},
      children: [{
        path: 'labor',
        name: 'AddLabor',
        meta: {title: '人工费统计', roles: ['2']},
        component: () => import('@/view/project/add/cost-labor')
      }, {
        path: 'labordetail',
        name: 'AddLaborDetail',
        meta: {title: '人工费明细统计', roles: ['2']},
        component: () => import('@/view/project/add/cost-labor-detail')
      }, {
        path: 'spotwork',
        name: 'AddSpotWork',
        meta: {title: '使用点工统计', roles: ['2']},
        component: () => import('@/view/project/add/spot-work')
      }, {
        path: 'materialdetail',
        name: 'AddMaterialDetail',
        meta: {title: '材料费明细统计', roles: ['2']},
        component: () => import('@/view/project/add/cost-material-detail')
      }, {
        path: 'material',
        name: 'AddMaterial',
        meta: {title: '调入调出材料费用统计', roles: ['2']},
        component: () => import('@/view/project/add/cost-material')
      }, {
        path: 'living',
        name: 'AddLiving',
        meta: {title: '水电费使用情况统计', roles: ['2']},
        component: () => import('@/view/project/add/cost-living')
      }, {
        path: 'machine',
        name: 'AddMachine',
        meta: {title: '机械设备费用统计', roles: ['2']},
        component: () => import('@/view/project/add/cost-machine')
      }, {
        path: 'managecost',
        name: 'AddManageCost',
        meta: {title: '收取管理费分包工程成本统计', roles: ['2']},
        component: () => import('@/view/project/add/cost-manage-cost')
      }, {
        path: 'managevalue',
        name: 'AddManageValue',
        meta: {title: '收取管理费分包工程产值统计', roles: ['2']},
        component: () => import('@/view/project/add/cost-manage-value')
      }, {
        path: 'projectcost',
        name: 'AddProjectCost',
        meta: {title: '单价分包工程成本统计', roles: ['2']},
        component: () => import('@/view/project/add/cost-project')
      }, {
        path: 'projectdetail',
        name: 'AddProjectDetail',
        meta: {title: '单价分包工程成本明细统计', roles: ['2']},
        component: () => import('@/view/project/add/cost-project-detail')
      }, {
        path: 'projectproduct',
        name: 'AddProjectProduct',
        meta: {title: '项目分包工程生产情况统计', roles: ['2']},
        component: () => import('@/view/project/add/project-product')
      }, {
        path: 'manage',
        name: 'AddManage',
        meta: {title: '管理费用统计', roles: ['2']},
        component: () => import('@/view/project/add/cost-manage')
      }, {
        path: 'test',
        name: 'AddTest',
        meta: {title: '检测实验费用统计', roles: ['2']},
        component: () => import('@/view/project/add/cost-test')
      }, {
        path: 'wage',
        name: 'AddWage',
        meta: {title: '管理人员工资统计', roles: ['2']},
        component: () => import('@/view/project/add/staff-wage')
      }, {
        path: 'run',
        name: 'AddRun',
        meta: {title: '经营费用统计', roles: ['2']},
        component: () => import('@/view/project/add/cost-run')
      }, {
        path: 'temp',
        name: 'AddTemp',
        meta: {title: '临时设施成本统计', roles: ['2']},
        component: () => import('@/view/project/add/temp-cost')
      }, {
        path: 'templabor',
        name: 'AddTempLabor',
        meta: {title: '临时设施人工费明细统计', roles: ['2']},
        component: () => import('@/view/project/add/temp-labor')
      }, {
        path: 'tempmaterial',
        name: 'AddTempMaterial',
        meta: {title: '临时设施、场地等材料费明细统计', roles: ['2']},
        component: () => import('@/view/project/add/temp-material')
      }, {
        path: 'totalcompare',
        name: 'AddTotalCompare',
        meta: {title: '总产值与相应成本对比统计', roles: ['2']},
        component: () => import('@/view/project/add/total-compare')
      }, {
        path: 'worktype',
        name: 'AddWorkType',
        meta: {title: '各工种每平方米单价统计', roles: ['2']},
        component: () => import('@/view/project/add/cost-work-type')
      }, {
        path: 'summary',
        name: 'AddSummary',
        meta: {title: '项目成本统计二', roles: ['2']},
        component: () => import('@/view/project/add/cost-summary')
      }, {
        path: 'statistics',
        name: 'AddStatistics',
        meta: {title: '项目成本统计一', roles: ['2']},
        component: () => import('@/view/project/add/cost-statistics')
      }]
    }, {
      path: 'all',
      name: 'ProgramAll',
      component: () => import('@/view/project/all/index'),
      meta: {title: '表单汇总', roles: ['2', '4']},
      children: [{
        path: 'statistics',
        name: 'AllStatistics',
        meta: {title: '项目成本统计汇总一', roles: ['2', '4']},
        component: () => import('@/view/project/all/cost-statistics')
      }, {
        path: 'summary',
        name: 'AllSummary',
        meta: {title: '项目成本统计汇总二', roles: ['2', '4']},
        component: () => import('@/view/project/all/cost-summary')
      }, {
        path: 'labor',
        name: 'AllLabor',
        meta: {title: '人工费汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/cost-labor')
      }, {
        path: 'labordetail',
        name: 'AllLaborDetail',
        meta: {title: '人工费明细汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/cost-labor-detail')
      }, {
        path: 'spotwork',
        name: 'AllSpotWork',
        meta: {title: '使用点工汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/spot-work')
      }, {
        path: 'materialdetail',
        name: 'AllMaterialDetail',
        meta: {title: '材料费明细汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/cost-material-detail')
      }, {
        path: 'material',
        name: 'AllMaterial',
        meta: {title: '调入调出材料费用汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/cost-material')
      }, {
        path: 'living',
        name: 'AllLiving',
        meta: {title: '水电费使用情况汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/cost-living')
      }, {
        path: 'machine',
        name: 'AllMachine',
        meta: {title: '机械设备费用明细汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/cost-machine')
      }, {
        path: 'managecost',
        name: 'AllManageCost',
        meta: {title: '收取管理费分包工程成本汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/cost-manage-cost')
      }, {
        path: 'managevalue',
        name: 'AllManageValue',
        meta: {title: '收取管理费分包工程产值汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/cost-manage-value')
      }, {
        path: 'projectcost',
        name: 'AllProjectCost',
        meta: {title: '单价分包工程成本汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/cost-project')
      }, {
        path: 'projectdetail',
        name: 'AllProjectDetail',
        meta: {title: '单价分包工程成本明细汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/cost-project-detail')
      }, {
        path: 'projectproduct',
        name: 'AllProjectProduct',
        meta: {title: '项目分包工程生产情况统计', roles: ['2', '4']},
        component: () => import('@/view/project/all/project-product')
      }, {
        path: 'manage',
        name: 'AllManage',
        meta: {title: '管理费用汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/cost-manage')
      }, {
        path: 'test',
        name: 'AllTest',
        meta: {title: '检测实验费用汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/cost-test')
      }, {
        path: 'wage',
        name: 'AllWage',
        meta: {title: '管理人员工资汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/staff-wage')
      }, {
        path: 'run',
        name: 'AllRun',
        meta: {title: '经营费用汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/cost-run')
      }, {
        path: 'temp',
        name: 'AllTemp',
        meta: {title: '临时设施成本汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/temp-cost')
      }, {
        path: 'templabor',
        name: 'AllTempLabor',
        meta: {title: '临时设施人工费明细汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/temp-labor')
      }, {
        path: 'tempmaterial',
        name: 'AllTempMaterial',
        meta: {title: '临时设施、场地等材料费明细汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/temp-material')
      }, {
        path: 'totalcompare',
        name: 'AllTotalCompare',
        meta: {title: '总产值与相应成本对比统计汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/total-compare')
      }, {
        path: 'worktype',
        name: 'AllWorkType',
        meta: {title: '各工种每平方米单价汇总', roles: ['2', '4']},
        component: () => import('@/view/project/all/cost-work-type')
      }]
    }]
  },
  {
    path: '*',
    name: 'Error',
    component: Error
  }
]

const createRouter = () => new Router({
  mode: 'history',
  base: '/report/',
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-354941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
