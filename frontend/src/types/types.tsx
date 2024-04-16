
export type Project = {
    id: number,
    author: string,
    path: string
}

export interface HeaderProps {
    data: HeaderData
}

export type HeaderData = {
    title: string,
    breadcrumbs: string | string[],
    navigation: Navigation
}

export type Navigation = {
    navItems: NavItem[]
}

export type NavItem = {
    displayName: string,
    targetPath: string
}