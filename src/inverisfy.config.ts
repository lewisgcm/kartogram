import { Container } from 'inversify';
import { HttpClient } from 'support';
import { GraphService } from 'services';

const container = new Container();

container.bind<HttpClient>(HttpClient).to(HttpClient);
container.bind<GraphService>(GraphService).to(GraphService);

export { container };