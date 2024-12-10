<template>
    <div ref="container" class="data-processing-dag-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, reactive } from 'vue'
import { Graph } from '@antv/x6'
import { Selection } from '@antv/x6-plugin-selection'
import { initializeGraph } from './help/graphConfig'
import { registerCustomShapes, createNodeFromApiData, createEdgeFromApiData, layoutNodes } from './help/nodeEdgeUtils'
import { setupHighlightListeners } from './help/highlightUtils'
import { GraphData } from './help/constants'
import axios from 'axios'
axios.get('/api/mindMap').then(response => {
    console.log(response.data)

    graphData = response.data
})

const container = ref(null)
let graph: Graph | null = null
let graphData: GraphData = reactive({
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
            source: 'node-2',
            target: 'node-5',
            ctime: '2022-05-01',
            type: 'dashed',
        },
        {
            source: 'node-1',
            target: 'node-3',
            ctime: '2022-05-01',
            type: 'NORMAL',
        }, {
            source: 'node-0',
            target: 'node-6',
            ctime: '2022-05-01',
            type: 'NORMAL',
        }, {
            source: 'node-0',
            target: 'node-7',
            ctime: '2022-05-01',
            type: 'NORMAL',
        },
        {
            source: 'node-3',
            target: 'node-4',
            ctime: '2022-05-01',
            type: 'dashed',
        }, {
            source: 'node-6',
            target: 'node-8',
            ctime: '2022-05-01',
            type: 'dashed',
        }, {
            source: 'node-7',
            target: 'node-9',
            ctime: '2022-05-01',
            type: 'NORMAL',
        }, {
            source: 'node-9',
            target: 'node-10',
            ctime: '2022-05-01',
            type: 'NORMAL',
        }, {
            source: 'node-9',
            target: 'node-11',
            ctime: '2022-05-01',
            type: 'NORMAL',
        }, {
            source: 'node-9',
            target: 'node-12',
            ctime: '2022-05-01',
            type: 'NORMAL',
        }, {
            source: 'node-10',
            target: 'node-13',
            ctime: '2022-05-01',
            type: 'dashed',
        }, {
            source: 'node-11',
            target: 'node-13',
            ctime: '2022-05-01',
            type: 'dashed',
        }, {
            source: 'node-12',
            target: 'node-13',
            ctime: '2022-05-01',
            type: 'dashed',
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
        {
            alert: [],
            alias: null,
            tag: ['正常'],
            icon: '银行卡',
            id: 'node-1',
            name: '银行卡信息',
            info: '6222000000000000',
            nodeType: '关联',
            parentNodeId: 'node-0',
            subNodeList: [],
            type: 'bankcard',
            suggestion: [],
        }, {
            alert: [],
            alias: null,
            tag: [],
            icon: '银行卡',
            id: 'node-6',
            name: '银行卡信息',
            info: '6222000000000000',
            nodeType: '关联',
            parentNodeId: 'node-0',
            subNodeList: [],
            type: 'bankcard',
            suggestion: [],
        }, {
            alert: [],
            alias: null,
            tag: [],
            icon: '银行卡',
            id: 'node-7',
            name: '银行卡信息',
            info: '6222000000000000',
            nodeType: '关联',
            parentNodeId: 'node-0',
            subNodeList: [],
            type: 'website',
            suggestion: [],
        },
        {
            alert: [],
            alias: null,
            tag: [],
            icon: '手机',
            id: 'node-2',
            name: '手机号信息',
            info: '13800138000',
            nodeType: '关联',
            parentNodeId: 'node-0',
            subNodeList: [],
            type: 'phone',
            suggestion: [],
        },
        {
            alert: [],
            alias: null,
            tag: [],
            icon: '人物',
            id: 'node-3',
            name: '嫌疑人信息',
            info: '张三',
            nodeType: '嫌疑',
            parentNodeId: 'node-1',
            subNodeList: [],
            type: 'person',
            suggestion: [],
        },
        {
            alert: [],
            alias: null,
            tag: [],
            icon: '建议',
            id: 'node-4',
            name: '侦查建议',
            info: '建议详情',
            nodeType: '结论',
            parentNodeId: 'node-3',
            subNodeList: [],
            type: 'suggestion',
            suggestion: [],
        }, {
            alert: [],
            alias: null,
            tag: [],
            icon: '建议',
            id: 'node-5',
            name: '侦查建议',
            info: '建议详情',
            nodeType: '结论',
            parentNodeId: 'node-3',
            subNodeList: [],
            type: 'suggestion',
            suggestion: [],
        }, {
            alert: [],
            alias: null,
            tag: [],
            icon: '建议',
            id: 'node-8',
            name: '侦查建议',
            info: '建议详情',
            nodeType: '结论',
            parentNodeId: 'node-3',
            subNodeList: [],
            type: 'result',
            suggestion: [],
        }, {
            alert: [],
            alias: null,
            tag: [],
            icon: '建议',
            id: 'node-9',
            name: '侦查建议',
            info: '建议详情',
            nodeType: '结论',
            parentNodeId: 'node-3',
            subNodeList: [],
            type: 'person',
            suggestion: [],
        }, {
            alert: [],
            alias: null,
            tag: [],
            icon: '建议',
            id: 'node-10',
            name: '侦查建议',
            info: '建议详情',
            nodeType: '结论',
            parentNodeId: 'node-3',
            subNodeList: [],
            type: 'location',
            suggestion: [],
        }, {
            alert: [],
            alias: null,
            tag: [],
            icon: '建议',
            id: 'node-11',
            name: '侦查建议',
            info: '建议详情',
            nodeType: '结论',
            parentNodeId: 'node-3',
            subNodeList: [],
            type: 'location',
            suggestion: [],
        }, {
            alert: [],
            alias: null,
            tag: [],
            icon: '建议',
            id: 'node-12',
            name: '侦查建议',
            info: '建议详情',
            nodeType: '结论',
            parentNodeId: 'node-3',
            subNodeList: [],
            type: 'location',
            suggestion: [],
        }, {
            alert: [],
            alias: null,
            tag: [],
            icon: '建议',
            id: 'node-13',
            name: '侦查建议',
            info: '建议详情',
            nodeType: '结论',
            parentNodeId: 'node-3',
            subNodeList: [],
            type: 'result',
            suggestion: [],
        }
    ],
}
)
onMounted(() => {
    nextTick(() => {
        registerCustomShapes()
        graph = initializeGraph(container.value)

        graph.use(
            new Selection({
                multiple: true,
                rubberEdge: true,
                rubberNode: true,
                modifiers: 'shift',
                rubberband: true,
            })
        )

        setupHighlightListeners(graph)

        const nodeLayout = layoutNodes(graphData.nodes, graphData.edges)

        // Create nodes
        graphData.nodes.forEach((nodeData) => {
            const { x, y } = nodeLayout[nodeData.id]
            createNodeFromApiData(nodeData, graph!, x, y)
        })

        // Create edges
        graphData.edges.forEach((edgeData) => {
            createEdgeFromApiData(edgeData, graph!)
        })

        const zoomOptions = {
            padding: {
                left: 50,
                right: 50,
                top: 50,
                bottom: 50,
            },
        }
        graph.zoomToFit(zoomOptions)
    })
})
</script>

<style scoped>
.data-processing-dag-container {
    width: 100%;
    height: calc(100vh - 250px);
    min-height: 550px;
}
</style>