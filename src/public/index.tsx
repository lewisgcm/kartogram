import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import { VirtualGraph } from "./components/VirtualGraph";

ReactDOM.render(
    <div>
        <Hello compiler="TypeScript" framework="React" />
        <h1>Graph</h1>
        <VirtualGraph width={960} height={500} />
    </div>,
    document.getElementById("example")
);