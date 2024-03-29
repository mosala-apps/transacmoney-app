export type SubMenusType ={
    name: string
    to: string
    icon: string
}

export interface AdminMenusType {
    name: string
    to: string
    icon: string
    isSubMenus: boolean,
    canView?: boolean,
    subMenus?: SubMenusType[]
}

