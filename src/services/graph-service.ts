import { injectable, inject } from 'inversify';

import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from 'support';
import { IKubeNamespace, IKubeService, IKubeList } from 'models/kubernetes';
import { IVirtualNode, VirtualNodeType } from 'models/graph';

@injectable()
export class GraphService {

    constructor(
        @inject(HttpClient) private _httpClient: HttpClient
    ) { }

    getGraphs(): Observable<IVirtualNode> {
        return forkJoin([
            this.getNamespaces(),
            this.getServices(),
            this.getPods()
        ]).pipe(
            map(
                ([namespaces, services, pods]) => {
                    return {
                        name: 'cluster',
                        uid: '',
                        type: 0,
                        value: 0,
                        children: namespaces.map(
                            (namespace) => {
                                return {
                                    uid: namespace.metadata.uid,
                                    value: 0,
                                    children: services
                                        .filter(
                                            (service) => service.metadata.namespace == namespace.metadata.name
                                        ).map(
                                            (service) => {
                                                return {
                                                    uid: service.metadata.uid,
                                                    type: VirtualNodeType.Service,
                                                    name: service.metadata.name,
                                                    children: pods
                                                        .filter(
                                                            (pod) => pod.metadata.namespace == namespace.metadata.name
                                                        ).map(
                                                            (pod) => {
                                                                return {
                                                                    uid: pod.metadata.uid,
                                                                    type: VirtualNodeType.Pod,
                                                                    name: pod.metadata.name,
                                                                    value: 0,
                                                                } as IVirtualNode;
                                                            }
                                                        )
                                                } as IVirtualNode;
                                            }
                                        ),
                                    type: VirtualNodeType.Namespace,
                                    name: namespace.metadata.name
                                } as IVirtualNode;
                            }
                        )
                    } as IVirtualNode;
                }
            )
        );
    }

    getNamespaces(): Observable<IKubeNamespace[]> {
        return this._httpClient
            .Get<IKubeList<IKubeNamespace>>('https://localhost:6443/api/v1/namespaces')
            .pipe(
                map(
                    (data: IKubeList<IKubeNamespace>) => data.items
                )
            );
    }

    getServices(): Observable<IKubeService[]> {
        return this._httpClient
            .Get<IKubeList<IKubeService>>('https://localhost:6443/api/v1/services')
            .pipe(
                map(
                    (data: IKubeList<IKubeService>) => data.items
                )
            );
    }

    getPods(): Observable<IKubeService[]> {
        return this._httpClient
            .Get<IKubeList<IKubeService>>('https://localhost:6443/api/v1/pods')
            .pipe(
                map(
                    (data: IKubeList<IKubeService>) => data.items
                )
            );
    }
}