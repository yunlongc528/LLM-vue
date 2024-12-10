import { Graph, Node, Edge, StringExt } from '@antv/x6'
import { register } from '@antv/x6-vue-shape'
import VueNodeComponent from '../components/VueNodeComponent.vue'
import suegestNode from '../components/suegestNode.vue'
import resultNode from '../components/resultNode.vue'
import locationNode from '../components/locationNode.vue'
import { Node as ApiNode, Edge as ApiEdge } from './constants'

const NODE_SHAPES = {
    default: 'data-processing-dag-node',
    suggestion: 'suegestNode-node',
    result: 'resultNode-node',
    location: 'locationNode-node',
}
const EDGE_TYPES = {
    default: 'data-processing-curve',
    dashed: 'data-processing-dashed',
}
const registerNodeShape = (shape: string, component: any) => {
    register({
        shape,
        width: 190,
        height: 48,
        component,
        ports: {
            groups: {
                in: {
                    position: 'left',
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: 'transparent',
                            strokeWidth: 1,
                            fill: 'transparent',
                        },
                    },
                },
                out: {
                    position: {
                        name: 'right',
                        args: {},
                    },
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: 'transparent',
                            strokeWidth: 1,
                            fill: 'transparent',
                        },
                    },
                },
            },
        },
    })
}

export function registerCustomShapes() {
    try {
        registerNodeShape(NODE_SHAPES.default, VueNodeComponent)
        registerNodeShape(NODE_SHAPES.location, locationNode)
        registerNodeShape(NODE_SHAPES.suggestion, suegestNode)
        registerNodeShape(NODE_SHAPES.result, resultNode)

        Edge.config({
            markup: [
                {
                    tagName: 'path',
                    selector: 'wrap',
                    attrs: {
                        fill: 'none',
                        cursor: 'pointer',
                        stroke: 'transparent',
                        strokeLinecap: 'round',
                    },
                },
                {
                    tagName: 'path',
                    selector: 'line',
                    attrs: {
                        fill: 'none',
                        pointerEvents: 'none',
                    },
                },
            ],
            attrs: {
                wrap: {
                    connection: true,
                    strokeWidth: 10,
                    strokeLinejoin: 'round',
                },
                line: {
                    connection: true,
                    stroke: '#A2B1C3',
                    strokeWidth: 1,
                    targetMarker: {
                        name: 'classic',
                        size: 6,
                    },
                },
            },
            router: {
                name: 'manhattan',
                args: {
                    padding: 10,
                },
            },
        })

        Graph.registerEdge(EDGE_TYPES.default, Edge, true)
        Graph.registerEdge(EDGE_TYPES.dashed, {
            inherit: EDGE_TYPES.default,
            attrs: {
                line: {
                    strokeDasharray: '5 5',
                },
            },
        })
    } catch (error) {
        console.error('Failed to register custom shapes:', error)
    }
}

function getNodeShape(type: string): string {
    return NODE_SHAPES[type] || NODE_SHAPES.default
}

const getNodePorts = (type: string): Array<{ id: string; group: string }> => {
    return type === 'suggestion' || type === 'result'
        ? [{ id: 'in', group: 'in' }]
        : [
              { id: 'in', group: 'in' },
              { id: 'out', group: 'out' },
          ]
}

function getEdgeType(apiEdge: ApiEdge): string {
    // Determine edge type based on apiEdge properties
    // For example, you could use apiEdge.type or any other relevant property
    return apiEdge.type === 'dashed' ? EDGE_TYPES.dashed : EDGE_TYPES.default
}

const createNode = (
    graph: Graph,
    id: string,
    shape: string,
    x: number,
    y: number,
    ports: any[],
    data: any,
) => {
    return graph.addNode({
        id,
        shape,
        x,
        y,
        ports,
        data,
    })
}

export function createNodeFromApiData(
    apiNode: ApiNode,
    graph: Graph,
    x: number,
    y: number,
): Node {
    if (!apiNode || !graph) {
        throw new Error('Invalid input for createNodeFromApiData')
    }
    const nodeShape = getNodeShape(apiNode.type)
    const ports = getNodePorts(apiNode.type)

    return createNode(graph, apiNode.id, nodeShape, x, y, ports, { ...apiNode })
}

const createEdge = (
    graph: Graph,
    id: string,
    shape: string,
    source: any,
    target: any,
    zIndex: number,
    data: any,
) => {
    return graph.addEdge({
        id,
        shape,
        source,
        target,
        zIndex,
        data,
    })
}
export function createEdgeFromApiData(apiEdge: ApiEdge, graph: Graph): Edge {
    if (!apiEdge || !graph) {
        throw new Error('Invalid input for createEdgeFromApiData')
    }
    const edgeType = getEdgeType(apiEdge)

    return createEdge(
        graph,
        StringExt.uuid(),
        edgeType,
        {
            cell: apiEdge.source,
            port: `${apiEdge.source}-out`,
        },
        {
            cell: apiEdge.target,
            port: `${apiEdge.target}-in`,
        },
        -1,
        { ...apiEdge },
    )
}
interface TreeNode {
    id: string
    children: TreeNode[]
    depth: number
    x: number
    y: number
}
export function layoutNodes(
    nodes: ApiNode[],
    edges: ApiEdge[],
): { [key: string]: { x: number; y: number } } {
    const nodeMap: { [key: string]: TreeNode } = {}
    const rootNodes: TreeNode[] = []
    const coordinateCache: { [key: string]: { x: number; y: number } } = {}

    // Create TreeNode objects
    nodes.forEach((node) => {
        nodeMap[node.id] = { id: node.id, children: [], depth: 0, x: 0, y: 0 }
    })

    // Build the tree structure
    edges.forEach((edge) => {
        const parent = nodeMap[edge.source]
        const child = nodeMap[edge.target]
        if (parent && child) {
            parent.children.push(child)
        }
    })

    // Find root nodes
    nodes.forEach((node) => {
        if (!edges.some((edge) => edge.target === node.id)) {
            rootNodes.push(nodeMap[node.id])
        }
    })

    // Assign depths
    const assignDepth = (
        node: TreeNode,
        depth: number,
        maxDepth: number = 100,
    ) => {
        if (depth > maxDepth) {
            throw new Error('Maximum recursion depth exceeded')
        }
        node.depth = depth
        node.children.forEach((child) =>
            assignDepth(child, depth + 1, maxDepth),
        )
    }
    rootNodes.forEach((root) => assignDepth(root, 0))

    // Calculate x and y coordinates
    const horizontalSpacing = 350
    const verticalSpacing = 200

    const calculateCoordinates = (
        node: TreeNode,
        y: number,
        maxDepth: number = 100,
    ) => {
        if (node.depth > maxDepth) {
            throw new Error('Maximum recursion depth exceeded')
        }
        if (coordinateCache[node.id]) {
            node.x = coordinateCache[node.id].x
            node.y = coordinateCache[node.id].y
            return
        }

        node.x = node.depth * horizontalSpacing
        node.y = y
        maxDepth = Math.max(maxDepth, node.depth)
        coordinateCache[node.id] = { x: node.x, y: node.y }

        let childY = y - ((node.children.length - 1) * verticalSpacing) / 2
        node.children.forEach((child) => {
            calculateCoordinates(child, childY, maxDepth)
            childY += verticalSpacing
        })
    }

    // Calculate the average y position for nodes with multiple parents
    const calculateAverageYPosition = (
        node: TreeNode,
        parentNodes: TreeNode[],
    ): number => {
        if (parentNodes.length === 0) {
            return node.y
        }
        const parentYPositions = parentNodes.map((parent) => parent.y)
        const averageY =
            parentYPositions.reduce((sum, y) => sum + y, 0) /
            parentYPositions.length
        return averageY
    }

    // Adjust y positions for nodes with multiple parents
    const adjustYPositions = () => {
        const parentMap: { [key: string]: TreeNode[] } = {}
        edges.forEach((edge) => {
            const parent = nodeMap[edge.source]
            const child = nodeMap[edge.target]
            if (parent && child) {
                if (!parentMap[child.id]) {
                    parentMap[child.id] = []
                }
                parentMap[child.id].push(parent)
            }
        })

        Object.keys(parentMap).forEach((nodeId) => {
            const node = nodeMap[nodeId]
            const parentNodes = parentMap[nodeId]
            if (parentNodes.length > 1) {
                node.y = calculateAverageYPosition(node, parentNodes)
            }
        })
    }

    let y = 0
    rootNodes.forEach((root) => {
        calculateCoordinates(root, y)
        y += (root.children.length + 1) * verticalSpacing
    })

    adjustYPositions()

    // Create the final layout object
    const layout: { [key: string]: { x: number; y: number } } = {}
    Object.values(nodeMap).forEach((node) => {
        layout[node.id] = { x: node.x, y: node.y }
    })

    return layout
}
