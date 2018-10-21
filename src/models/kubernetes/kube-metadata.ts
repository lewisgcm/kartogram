export interface IKubeMetadata {
    name: string
    selfLink: string
    uid: string
    resourceVersion: string
    creationTimestamp: string
    labels?: string[]
    namespace?: string
};