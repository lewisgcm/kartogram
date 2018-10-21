import 'reflect-metadata';

import { Observable } from 'rxjs';
import { GraphService } from 'services';
import { container } from 'inverisfy.config';
import { Request, Response } from 'express';

const express = require('express')
const app = express()
const port = 3000;

const graphService = container.get<GraphService>(GraphService);

app.use( express.static( __dirname + '/public') );

app.use( "/api/data", (req: Request, res: Response) => {
    graphService
    .getGraphs()
    .subscribe(
        (graphs) => {
            res.send(graphs);
        },
        (error) => {
            res.send(error);
            console.error("ERROR");
        }
    );
});

app.listen( port, () => console.log(`Example app listening on port ${port}!`) );