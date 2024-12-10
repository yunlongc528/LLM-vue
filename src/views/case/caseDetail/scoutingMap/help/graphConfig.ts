import { Graph } from '@antv/x6'

export function initializeGraph(container: HTMLElement | null): Graph {
    return new Graph({
        container,
        interacting: false,
        panning: {
            enabled: false,
            eventTypes: ['leftMouseDown', 'mouseWheel'],
        },
        mousewheel: {
            enabled: true,
            modifiers: 'ctrl',
            factor: 1.0,
            maxScale: 1.5,
            minScale: 0.5,
        },
    })
}
