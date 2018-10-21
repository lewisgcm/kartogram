import * as React from 'react';

import { IVirtualNode } from 'models/graph';
import { Observable } from 'indefinite-observable';

export interface GraphNodeHover {
    node: IVirtualNode;
    event: React.MouseEvent<SVGGElement>;
}

export interface GraphNodeProps {
    tooltipSource: Observable<GraphNodeHover>
}

export interface GraphNodeState {
    name: string;
}

export class GraphTooltip extends React.Component<GraphNodeProps, GraphNodeState> {
    constructor(
        props: GraphNodeProps
    ) {
        super(props);
        this.state = {
            name: ''
        };
    }

    render() {
        return <text>Hello World</text>
    }
}