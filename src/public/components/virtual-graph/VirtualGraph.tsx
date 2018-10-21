import * as React from 'react';
import {
    pack,
    hierarchy,
    zoom,
    event,
    select,
    ZoomBehavior,
    ZoomTransform,
    PackLayout,
    HierarchyCircularNode
} from 'd3';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { IVirtualNode } from 'models/graph';

const styles = require('./VirtualGraph.scss');

interface VirtualGraphState {
    nodes: HierarchyCircularNode<IVirtualNode>[];
    zoomTransform: ZoomTransform;
}

interface GraphNodeHover {
    node: IVirtualNode;
    event: React.MouseEvent<SVGGElement>;
}

export interface VirtualGraphProps {
    width: number;
    height: number;
    dataSource: Observable<IVirtualNode>;
}

export class VirtualGraph extends React.Component<VirtualGraphProps, VirtualGraphState> {
    private packLayout: PackLayout<IVirtualNode>;
    private zoom: ZoomBehavior<Element, {}>;
    private svg: React.RefObject<SVGSVGElement>;
    private eventSubject: Subject<GraphNodeHover>;

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
            .on("zoom", this.zoomed.bind(this));

        this.eventSubject = new Subject();
        this.eventSubject
            .pipe(
                debounceTime( 500 )
            )
            .subscribe(
                (event) => {
                    console.log( event );
                }
            );
    }

    zoomed() {
        this.setState({
            zoomTransform: event.transform
        });
    }

    componentDidMount() {
        this.props
            .dataSource
            .subscribe(
                (data) => {
                    const root = hierarchy(data).sum(
                        (node: IVirtualNode) => node.value + 1
                    );
                    this.packLayout(root);
                    this.setState({
                        nodes: root.descendants()
                    } as any);
                }
            );

        this.zoom(select(this.svg.current));
    }

    componentWillUnmount() {
        this.eventSubject.complete();
    }

    handleMouseEvent(
        event: React.MouseEvent<SVGGElement>,
        index: number
    ) {
        event.persist();
        this.eventSubject.next(
            {
                event: event,
                node: this.state.nodes[index].data
            }
        );
    }

    render() {
        return <svg width={this.props.width}
            height={this.props.height}
            pointerEvents='all'
            ref={this.svg} >
            <g transform={(this.state.zoomTransform || '').toString()}>
                {this.state.nodes.map(
                    (node, index) => <g transform={`translate(${node.x}, ${node.y})`} key={index} >
                        <circle
                            r={node.r}
                            fill='steelblue'
                            opacity='0.25'
                            onMouseEnter={(event) => this.handleMouseEvent(event, index)}
                            onMouseLeave={(event) => this.handleMouseEvent(event, index)} 
                            className={styles.circle} >
                        </circle>
                    </g>
                )}
            </g>
        </svg>
    };
}