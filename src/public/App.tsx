import * as React from "react";
import * as ReactDOM from "react-dom";

import {
    AppBar,
    Toolbar,
    Typography
} from '@material-ui/core';

import { VirtualGraph } from "./components/virtual-graph/VirtualGraph";
import { HttpClient } from "public/support";
import { IVirtualNode } from "models/graph";

const styles = require('./App.scss');
const httpClient = new HttpClient();
const dataSource = httpClient
    .Get<IVirtualNode>('/api/data');

class App extends React.Component {
    render() {
        return <div>
            <AppBar position="absolute">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Kartogram
                    </Typography>
                </Toolbar>
            </AppBar>
            <main className={styles.main} >
                <VirtualGraph width={960} height={500} dataSource={dataSource} />
            </main>
        </div>;
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById("app")
);