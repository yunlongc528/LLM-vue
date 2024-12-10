import { RouteRecordRaw } from 'vue-router'
import { NavigationItem } from './type'
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
                component: () => import('@/views/home/homeLayout.vue'),

                meta: { title: '首页', keepAlive: true },
            },
            {
                path: '/large-model/case-analysis',
                name: 'case',
                component: () => import('@/views/case/caseAnalysis/index.vue'),
                meta: {
                    title: '案件研判',
                    keepAlive: false,
                },
            },
            {
                path: '/large-model/case-detail/:id',
                name: 'caseDetail',
                component: () => import('@/views/case/caseDetail/index.vue'),
                children: [
                    {
                        path: '/large-model/case-detail/:id/analysis',
                        name: 'caseDetailAnalysis',
                        component: () =>
                            import(
                                '@/views/case/caseDetail/caseDetailAnalysis/index.vue'
                            ),
                    },
                    {
                        path: '/large-model/case-detail/:id/survey',
                        name: 'surveyAnalysis',
                        component: () =>
                            import(
                                '@/views/case/caseDetail/surveyAnalysis/index.vue'
                            ),
                    },
                    {
                        path: '/large-model/case-detail/:id/record',
                        name: 'recordAnalysis',
                        component: () =>
                            import(
                                '@/views/case/caseDetail/recordAnalysis/index.vue'
                            ),
                    },
                    {
                        path: '/large-model/case-detail/:id/scoutingMap',
                        name: 'scoutingMap',
                        component: () =>
                            import(
                                '@/views/case/caseDetail/scoutingMap/index.vue'
                            ),
                    },
                    {
                        path: '/large-model/case-detail/:id/ValueEntity',
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
                    title: '价值实体库',
                    keepAlive: false,
                },
            },
            {
                path: '/large-model/question-management',
                name: 'question',
                component: () => import('@/views/management/index.vue'),
                meta: {
                    title: '问卷调查',
                    keepAlive: false,
                },
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/LoginPage.vue'),
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/views/admin/home/index.vue'),
    },
    {
        path: '/exception/403',
        name: '403',
        component: () => import('@/views/exception/403.vue'),
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     redirect: '/404',
    //     name: 'any',
    // },
]
export const asyncRoute: RouteRecordRaw[] = []
export const navigation: NavigationItem[] = [
    { name: 'POS', path: '/pos', current: true },
    { name: 'SESSIONS', path: '/sessions', current: true },
    { name: 'CLIENTS', path: '/a/b', current: true },
    { name: 'Calendar', path: '/calendar', current: true },
    { name: 'VIDEOS', path: '/a/b', current: true },
]

export const posNavigation: NavigationItem[] = [
    { name: 'POS', current: true, path: '/pos/pos' },
    {
        name: 'Kiosk Orders',
        current: false,
        path: '/pos/kioskOrder',
    },
    { name: 'ORDERS', current: false, path: '/pos/orders' },
    { name: 'sessions', current: false, path: '/pos/sessions' },
]
