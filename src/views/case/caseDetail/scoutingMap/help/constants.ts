export const NodeType = {
    CASE: 'case',
    // Add other node types as needed
}

export const EdgeType = {
    NORMAL: 'NORMAL',
    CONCLUSION: 'CONCLUSION',
}

export interface Suggestion {
    title: string
    content: string
    status: {
        name: string
        color: string
    }
}

export interface Node {
    alert: any[]
    alias: string | null
    tag: string[]
    icon: string
    id: string
    name: string
    info: string
    nodeType: string
    parentNodeId: string
    subNodeList: any[]
    type: string
    suggestion: Suggestion[]
}

export interface Edge {
    source: string
    target: string
    ctime: string
    type: string
}

export interface GraphData {
    nodes: Node[]
    edges: Edge[]
}

// Sample data (you can remove this if not needed)
export const sampleGraphData: GraphData = {
    edges: [
        {
            source: 'node-0',
            target: 'node-1',
            ctime: '2022-05-01',
            type: 'NORMAL',
        },
        {
            source: 'node-0',
            target: 'node-2',
            ctime: '2022-05-01',
            type: 'NORMAL',
        },
        {
            source: 'node-1',
            target: 'node-3',
            ctime: '2022-05-01',
            type: 'NORMAL',
        },
        {
            source: 'node-3',
            target: 'node-4',
            ctime: '2022-05-01',
            type: 'CONCLUSION',
        },
    ],
    nodes: [
        {
            alert: [],
            alias: null,
            tag: [],
            icon: '案件',
            id: 'node-0',
            name: 'xx被诈骗案件',
            info: 'A12312313123',
            nodeType: '嫌疑',
            parentNodeId: '312312',
            subNodeList: [],
            type: 'case',
            suggestion: [
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
            ],
        },
        // Add other nodes here (omitted for brevity)
    ],
}
