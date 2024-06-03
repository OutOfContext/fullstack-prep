export type Project = {
    id: number,
    author: string,
    path: string
}

export type Organization = {
    id: number,
    name: string
}

export type Team = {
    id: number,
    name: string,
    users: AccountData[]
}

export type Authority = {
    id: string,
    authority: string
}

export type AccountData = {
    authorities: Authority[],
    id: number,
    organizations: Organization[],
    teams: Team[],
    username: string
}

export interface HeaderProps {
    data: HeaderData
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