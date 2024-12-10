import Mock from 'mockjs'
import { register } from 'module'
import { emit } from 'process'

// 模拟一个 API 接口：获取用户列表
Mock.mock('/api/caselist', 'get', {
    code: 200,
    message: 'success',
    data: {
        'users|5': [
            {
                id: 'A' + '@natural()',
                name: '@pick(["jx猥亵儿童案", "徐xx诈骗案","ysz诈骗案","lsj诈骗案"])',
                detectStatus: '@pick(["已研判", "未研判"])',
                record: '@integer(0, 10)',
                detectList: {
                    person: '@integer(0, 10)',
                    card: '@integer(0, 10)',
                    phone: '@integer(0, 10)',
                    account: '@integer(0, 10)',
                    other: '@integer(0, 10)',
                    app: '@integer(0, 10)',
                },
                'collection|1-2': true,
                registerOrg: '浙江省慈溪市GA局刑事侦查大队',
                registerTime: '@datetime("yyyy-MM-dd")',
                acceptTime: '@datetime("yyyy-MM-dd")',
                caseCategory: '@pick(["诈骗", "刑事", "刑侦"])',
                CaseContent:
                    '2024年10月18日21时41分，接韩晴晴报警称：在附海韩家园园内24号附近 被人猥亵。',
                caseStatus: '@pick(["已处理", "立案"])',
            },
        ],
    },
})
Mock.mock('/api/recommend_list', 'get', {
    code: 200,
    message: 'success',
    data: {
        'caserecommend_list|5-10': [
            {
                caseCode: 'A' + '@natural()',
                CaseContent:
                    '2024年10月18日21时41分，接韩晴晴报警称：在附海韩家园园内24号附近 被人猥亵。',
                csaename: '附海韩晴晴被猥亵儿童案',
                confidentDefree: '4.29%',
                emcaseName: null,
                recommendReasons: '@pick(["相似地点", "相似案件类型"])',
            },
        ],
    },
})
Mock.mock('/api/mindMap', 'get', {
    'edges|10': [
        {
            source: '@word(5)',
            target: '@word(5)',
            ctime: '@date("yyyy-MM-dd")',
            type: '@pick(["NORMAL", "dashed"])',
        },
    ],
    'nodes|14': [
        {
            alert: [],
            alias: null,
            tag: () => (Mock.Random.boolean() ? ['正常'] : []),
            icon: '@pick(["案件", "银行卡", "手机", "人物", "建议"])',
            id: '@word(5)',
            name: '@ctitle(5, 10)', // Random Chinese title with length between 5 and 10
            info: '@word(12, 16)', // Random alphanumeric string
            nodeType: '@pick(["嫌疑", "关联", "结论", "结果"])',
            parentNodeId: '@word(5)',
            subNodeList: [],
            type: '@pick(["case", "bankcard", "phone", "person", "website", "suggestion", "location", "result"])',
            suggestion: () => {
                return Mock.Random.boolean()
                    ? [
                          {
                              title: '建议1',
                              content: '建议1内容',
                              status: { name: '待审核', color: '#FF9326' },
                          },
                          {
                              title: '建议2',
                              content: '建议2内容',
                              status: { name: '待审核', color: '#FF9326' },
                          },
                      ]
                    : []
            },
        },
    ],
})
Mock.mock('/api/login', 'get', {
    code: 200,
    message: 'success',
})
