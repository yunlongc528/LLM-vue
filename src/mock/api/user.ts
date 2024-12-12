import Mock from 'mockjs'
export const caseMocks = [
    {
        url: '/api/caselist',
        method: 'get',
        response: () => {
            return Mock.mock({
                code: 200,
                message: 'success',
                data: {
                    'users|5': [
                        {
                            id: 'A' + '@natural()', // 使用 @natural() 来生成随机自然数
                            name: '@pick(["jxxxxx", "徐xxx案","yszx案","lsjxx"])', // 随机选择一个案名
                            detectStatus: '@pick(["已研判", "未研判"])', // 随机选择研判状态
                            record: '@integer(0, 10)', // 随机生成一个0-10之间的整数
                            detectList: {
                                person: '@integer(0, 10)', // 随机生成一个0-10之间的整数
                                card: '@integer(0, 10)',
                                phone: '@integer(0, 10)',
                                account: '@integer(0, 10)',
                                other: '@integer(0, 10)',
                                app: '@integer(0, 10)',
                            },
                            'collection|1-2': true, // 随机生成一个布尔值
                            registerOrg: 'xxxxxxx', // 可以设置为实际的值，或者保留为空
                            registerTime: '@datetime("yyyy-MM-dd")', // 随机生成日期
                            acceptTime: '@datetime("yyyy-MM-dd")',
                            caseCategory: '@pick(["诈xx骗", "x事", "x"])', // 随机选择案件分类
                            CaseContent:
                                '22024年10月某日，接到报警称某地发生案件。',
                            caseStatus: '@pick(["已处理", "立案"])', // 随机选择案件状态
                        },
                    ],
                },
            })
        },
    },
]

export const recommendMocks = [
    {
        url: '/api/recommend_list',
        method: 'get',
        response: () => {
            return Mock.mock({
                code: 200,
                message: 'success',
                data: {
                    'caserecommend_list|5-10': [
                        {
                            caseCode: 'A' + '@natural()', // 生成随机自然数
                            CaseContent: '某案件描述内容', // 定义案件描述
                            csaename: '某案件名称', // 定义案件名称
                            confidentDefree: '@float(0, 100, 2, 2)%', // 生成随机浮动百分比
                            emcaseName: null, // 可以是 null 或自定义值
                            recommendReasons: '@pick(["相似地点", "相似类型"])', // 随机选择推荐原因
                        },
                    ],
                },
            })
        },
    },
]

export const mindMapMocks = [
    {
        url: '/api/mindMap',
        method: 'get',
        response: () => ({
            code: 200,
            message: 'success',
            data: {
                'edges|10': [
                    {
                        source: '@word(5)',
                        target: '@word(5)',
                        ctime: '@date("yyyy-MM-dd")',
                        type: '@pick(["NORMAL", "DASHED"])',
                    },
                ],
                'nodes|14': [
                    {
                        alert: [],
                        alias: null,
                        tag: () => (Mock.Random.boolean() ? ['正常'] : []),
                        icon: '@pick(["案件", "银行卡", "手机", "人物", "建议"])',
                        id: '@word(5)',
                        name: '@ctitle(5, 10)',
                        info: '@word(12, 16)',
                        nodeType: '@pick(["嫌疑", "关联", "结论", "结果"])',
                        parentNodeId: '@word(5)',
                        subNodeList: [],
                        type: '@pick(["case", "bankcard", "phone", "person", "suggestion"])',
                        suggestion: () => {
                            return Mock.Random.boolean()
                                ? [
                                      {
                                          title: '建议1',
                                          content: '建议内容1',
                                          status: {
                                              name: '待审核',
                                              color: '#FF9326',
                                          },
                                      },
                                      {
                                          title: '建议2',
                                          content: '建议内容2',
                                          status: {
                                              name: '待审核',
                                              color: '#FF9326',
                                          },
                                      },
                                  ]
                                : []
                        },
                    },
                ],
            },
        }),
    },
]
export const authMocks = [
    {
        url: '/api/login',
        method: 'post',
        response: (options) => {
            const { username, password } = JSON.parse(options.body)

            // 模拟用户数据库
            const users = [
                {
                    username: 'admin',
                    password: '123456',
                    token: 'admin-token',
                    roles: ['admin'],
                    permission: ['create', 'read', 'update', 'delete'], // 添加的权限
                },
                {
                    username: 'user',
                    password: '654321',
                    token: 'user-token',
                    roles: ['user'],
                    permission: ['read'], // 用户仅有的权限
                },
            ]

            // 验证用户名和密码
            const user = users.find(
                (u) => u.username === username && u.password === password,
            )

            if (user) {
                return {
                    code: 200,
                    message: '登录成功',
                    data: {
                        token: user.token,
                        roles: user.roles,
                        permission: user.permission, // 返回用户的权限
                    },
                }
            }

            return {
                code: 401,
                message: '用户名或密码错误',
            }
        },
    },
]
