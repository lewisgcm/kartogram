export enum VirtualNodeType {
    Namespace,
    Service,
    Pod
}

export interface IVirtualNode {
    uid: string
    children?: IVirtualNode[]
    type: VirtualNodeType
    name: string
}