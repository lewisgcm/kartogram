import { HttpClient } from './support/httpClient';
import { container } from './inverisfy.config';

const express = require('express')
const app = express()
const path = require('path')
const port = 3000;

const httpClient = container.get<HttpClient>(HttpClient);

httpClient.Get('https://www.google.co.uk').then(
    (data) => {
        console.log(data);
    }
)
app.use( express.static( __dirname + '/public') );

app.listen( port, () => console.log(`Example app listening on port ${port}!`) );