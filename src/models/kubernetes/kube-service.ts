import { IKubeMetadata } from './kube-metadata';

export interface IKubeService {
    metadata: IKubeMetadata
    spec: {
        ports: any[]
        selector: any
        type: string
    }
}
