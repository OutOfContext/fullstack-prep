
export type Project = {
    id: number,
    author: string,
    path: string
}

export interface HeaderProps {
    data: HeaderData,
    breadcrumbs: boolean
}

export type HeaderData = {
    title: string,
    navigation: Navigation
}

export type Navigation = {
    sections: SectionItem[]
}

export type SectionItem = {
    displayName?: string,
    navItems: NavItem[]
}
export type NavItem = {
    displayName: string,
    targetPath: string
}