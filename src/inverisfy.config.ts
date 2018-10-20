import { Container } from "inversify";

import { HttpClient } from './support/httpClient';

const container = new Container();

container.bind<HttpClient>(HttpClient).to(HttpClient);

export { container };