import * as Request from 'request-promise-native';

export class GraphService {
    getGraph() {
        Request.get(
            ''
        ).then(
            (data) => {
                console.log('Hello World')
            }
        )
    }
}