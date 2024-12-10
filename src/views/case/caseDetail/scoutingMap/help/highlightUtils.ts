import { Graph, Node, Edge } from '@antv/x6'
import { stroke } from '@antv/x6/lib/registry/highlighter/stroke'

export function setupHighlightListeners(graph: Graph) {
    graph.on('node:mouseenter', ({ node }) => {
        if (graph) {
            unhighlightAll(graph)
            highlightNode(node)
            highlightAncestors(node, graph)
        }
    })

    graph.on('node:mouseleave', () => {
        if (graph) {
            unhighlightAll(graph)
        }
    })
}

function highlightNode(node: Node) {
    const data = node.getData()
    node.setData({ ...data, highlighted: true })
}

function unhighlightNode(node: Node) {
    const data = node.getData()
    node.setData({ ...data, highlighted: false })
}

function highlightEdge(edge: Edge) {
    console.log(edge.shape)
    if (edge.shape === 'data-processing-dashed') {
        edge.attr('line/stroke', '#1890ff')
        edge.attr('line/strokeWidth', 2)
        edge.attr('line/style', {
            animation: 'dash 1s  infinite',
            strokeDasharray: '2, 2',
            strokeDashoffset: 0,
        })
        console.log(edge.attr('line/style'))
    } else {
        edge.setAttrs({
            line: {
                stroke: '#1890ff',
                strokeWidth: 2,
            },
        })
    }
}

function unhighlightEdge(edge: Edge) {
    if (edge.shape === 'data-processing-dashed') {
        edge.attr('line/stroke', '#A2B1C3')
        edge.attr('line/strokeWidth', 1)
        edge.attr('line/style/animation', 'none')
    }
    edge.setAttrs({
        line: {
            stroke: '#A2B1C3',
            strokeWidth: 1,
        },
    })
}

function highlightAncestors(node: Node, graph: Graph) {
    const ancestors: Node[] = []
    const edges: Edge[] = []

    const traverse = (currentNode: Node) => {
        const incomingEdges = graph.getIncomingEdges(currentNode)
        if (incomingEdges) {
            incomingEdges.forEach((edge) => {
                edges.push(edge)
                const sourceNode = edge.getSourceNode()
                if (sourceNode) {
                    ancestors.push(sourceNode)
                    traverse(sourceNode)
                }
            })
        }
    }

    traverse(node)
    ancestors.forEach(highlightNode)
    edges.forEach(highlightEdge)
}

function unhighlightAll(graph: Graph) {
    graph.getNodes().forEach(unhighlightNode)
    graph.getEdges().forEach(unhighlightEdge)
}
