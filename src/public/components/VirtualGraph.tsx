import * as React from 'react';
import {
    pack,
    hierarchy,
    zoom,
    event,
    select,
    ZoomBehavior,
    PackLayout,
    HierarchyCircularNode
} from 'd3';

import { HttpClient } from 'public/support';
import { IVirtualNode } from 'models/graph';

export interface VirtualGraphProps {
    width: number;
    height: number;
}

export interface VirtualGraphState {
    nodes: HierarchyCircularNode<IVirtualNode>[];
    zoomTransform: any;
}

export class VirtualGraph extends React.Component<VirtualGraphProps, VirtualGraphState>  {
    private packLayout: PackLayout<IVirtualNode>;
    private zoom: ZoomBehavior<Element, {}>;
    private svg: React.RefObject<SVGSVGElement>;

    constructor(props: VirtualGraphProps) {
        super(props);

        this.state = {
            nodes: [],
            zoomTransform: null
        };

        this.packLayout = pack<IVirtualNode>()
            .size([this.props.width, this.props.height])
            .padding(10);

        this.svg = React.createRef();

        this.zoom = zoom()
            .scaleExtent([-5, 5])
            .on("zoom", this.zoomed.bind(this))
    }


    zoomed() {
        this.setState({
            zoomTransform: event.transform
        });
    }

    componentDidMount() {
        const httpClient = new HttpClient();
        httpClient
            .Get<IVirtualNode>('/api/data')
            .subscribe(
                (data) => {
                    const root = hierarchy(data).sum(
                        (datum: any) => datum.value + 1
                    )
                    this.packLayout(root);
                    this.setState({
                        nodes: root.descendants()
                    } as any);
                }
            );

        this.zoom(select(this.svg.current));
    }

    render() {
        return <svg width={this.props.width}
            height={this.props.height}
            pointerEvents='all'
            ref={this.svg} >
            <g transform={this.state.zoomTransform}>
                {this.state.nodes.map(
                    (node, index) => <g transform={`translate(${node.x}, ${node.y})`} key={index} >
                        <circle r={node.r} fill='steelblue' opacity='0.25'>
                        </circle>
                        <text dy="0.71em" textAnchor="end" >
                            {node.data.name}
                        </text>
                    </g>
                )}
            </g>
        </svg>
    };
}