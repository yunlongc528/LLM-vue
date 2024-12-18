export const NodeType = {
    INPUT: 'INPUT',
    FILTER: 'FILTER',
    JOIN: 'JOIN',
    UNION: 'UNION',
    AGG: 'AGG',
    OUTPUT: 'OUTPUT',
}

export const CellStatus = {
    DEFAULT: 'default',
    SUCCESS: 'success',
    ERROR: 'error',
}

// Constants
export const PROCESSING_TYPE_LIST = [
    { type: 'FILTER', name: '数据筛选' },
    { type: 'JOIN', name: '数据连接' },
    { type: 'UNION', name: '数据合并' },
    { type: 'AGG', name: '数据聚合' },
    { type: 'OUTPUT', name: '数据输出' },
]

export const NODE_TYPE_LOGO = {
    case: {
        svg: 'public/bilu.svg',
        caseColor: '#ff5e5e',
        name: 'bilu',
    },

    bankcard: {
        svg: 'public/bankcard.svg',
        caseColor: '#ffc27d',
        name: 'bankcard',
    },
    website: {
        svg: 'public/website.svg',
        caseColor: '#bf87eb',
        name: 'website',
    },
    person: {
        svg: 'public/person.svg',
        caseColor: '#5ea1ff',
        name: 'person',
    },
    phone: {
        svg: 'public/phone.svg',
        caseColor: '#87dc6a',
        name: 'phone',
    },
    location: {
        svg: 'public/location1.svg',
        caseColor: 'white',
        name: 'location1',
    },
}
