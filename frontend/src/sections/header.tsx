import {HeaderProps} from "../types/types.tsx";
import {useState} from "react";


export default function Header(headerProps: HeaderProps) {

    const [headerData] = useState(headerProps.data);

    return (
        <header style={{backgroundColor: '#333', color: '#fff', padding: '20px', textAlign: 'center'}}>
            <h1>{headerData.title}</h1>
            <nav style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                {headerData.navigation.navItems.map((item, index) => (
                    <a key={index} href={item.targetPath} style={{color: '#fff', textDecoration: 'none', padding: '0 10px'}}>{item.displayName}</a>
                ))}
            </nav>
        </header>
    )
}