import * as React from 'react';
import { pack } from 'd3';

import { HttpClient } from 'public/support';

const width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

interface VirtualGraphProps {
}

interface VirtualGraphState {
    data: any;
}

const packLayout = pack<any>()
    .size([width, height])
    .padding(10);

export class VirtualGraph extends React.Component<VirtualGraphProps, VirtualGraphState>  {
    constructor(props: VirtualGraphProps) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        const httpClient = new HttpClient();
        httpClient
            .Get<any>('/api/data')
            .subscribe(
                (data) => {
                    this.setState({
                        data: packLayout(data)
                    })
                }
            );
    }

    render() {
        return <svg width={width} height={height}>
            <g transform={`translate(${width / 2}, ${height / 2})`}>
                {this.state.data.map(
                    (d: any) => (
                        <circle transform={`translate(${d.x}, ${d.y})`} fill='steelblue' opacity='0.25' >
                            <text>
                                {d.data.name}
                            </text>
                        </circle>
                    )
                )}
            </g>
        </svg>
    };
}