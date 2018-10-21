import { IKubeMetadata } from './kube-metadata';

export interface IKubeNamespace {
    metadata: IKubeMetadata
    status: {
        phase: string
    }
}
