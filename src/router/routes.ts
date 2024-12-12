import { RouteRecordRaw } from 'vue-router'

// 静态路由
export const constantRoute: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'layout',
        component: () => import('@/layout/BasicLayout.vue'),
        redirect: '/large-model/homeLayout',
        children: [
            {
                path: '/large-model/homeLayout',
                name: 'home',
                component: () =>
                    import(/* webpackPreload: true */ '@/views/home/index.vue'),
                meta: { title: '首页', keepAlive: true },
            },
            {
                path: '/large-model/case-analysis',
                name: 'case',
                component: () =>
                    import(
                        /* webpackPrefetch: true */ '@/views/case/caseAnalysis/index.vue'
                    ),
                meta: { title: '案件研判', keepAlive: false },
            },
            {
                path: '/large-model/case-detail/:id',
                name: 'caseDetail',
                component: () =>
                    import(
                        /* webpackPrefetch: true */ '@/views/case/caseDetail/index.vue'
                    ),
                children: [
                    {
                        path: 'analysis',
                        name: 'caseDetailAnalysis',
                        component: () =>
                            import(
                                '@/views/case/caseDetail/caseDetailAnalysis/index.vue'
                            ),
                    },
                    {
                        path: 'survey',
                        name: 'surveyAnalysis',
                        component: () =>
                            import(
                                '@/views/case/caseDetail/surveyAnalysis/index.vue'
                            ),
                    },
                    {
                        path: 'record',
                        name: 'recordAnalysis',
                        component: () =>
                            import(
                                '@/views/case/caseDetail/recordAnalysis/index.vue'
                            ),
                    },
                    {
                        path: 'scoutingMap',
                        name: 'scoutingMap',
                        component: () =>
                            import(
                                '@/views/case/caseDetail/scoutingMap/index.vue'
                            ),
                    },
                    {
                        path: 'ValueEntity',
                        name: 'valueEntity',
                        component: () =>
                            import(
                                '@/views/case/caseDetail/valueEntity/index.vue'
                            ),
                    },
                ],
            },
            {
                path: '/large-model/entity-library',
                name: 'entity',
                component: () =>
                    import('@/views/valueEntity/personnel/index.vue'),
                meta: {
                    roles: ['user'],
                    keepAlive: false,
                    title: '价值实体库',
                },
            },
            {
                path: '/large-model/question-management',
                name: 'question',
                component: () => import('@/views/management/index.vue'),
                meta: { roles: ['user'], keepAlive: false, title: '问卷调查' },
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/LoginPage.vue'),
    },
    {
        path: '/exception/403',
        name: '403',
        component: () => import('@/views/exception/403.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/exception/403',
        name: 'notFound',
    },
]
export const privateRoutes = [
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/views/admin/home/index.vue'),
        meta: { roles: ['admin'] },
    },
]
