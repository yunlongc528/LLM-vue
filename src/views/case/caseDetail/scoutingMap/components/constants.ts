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
        svg: 'src/assets/icons/bilu.svg',
        caseColor: '#ff5e5e',
    },

    bankcard: {
        svg: 'src/assets/icons/bankcard.svg',
        caseColor: '#ffc27d',
    },
    website: {
        svg: 'src/assets/icons/website.svg',
        caseColor: '#bf87eb',
    },
    person: {
        svg: 'src/assets/icons/person.svg',
        caseColor: '#5ea1ff',
    },
    phone: {
        svg: 'src/assets/icons/phone.svg',
        caseColor: '#87dc6a',
    },
    location: {
        svg: 'src/assets/icons/location1.svg',
        caseColor: 'white',
    },
}
