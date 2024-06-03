import {HeaderProps} from "../types/types.tsx";
import {useEffect, useRef, useState} from "react";
import "../assets/css/sections/header.css";


export default function Header(headerProps: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: Event) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const [headerData] = useState(headerProps.data);

    let navigationClass = "navigation";
    if (menuOpen) {
        navigationClass += " active";
        document.querySelector('body').style.overflow = 'hidden';
    } else {
        document.querySelector('body').style.overflow = 'auto';
    }

    return (
        <header style={{backgroundColor: '#333', color: '#fff', textAlign: 'center'}}>
            <h1>{headerData.title}</h1>
            <div className="burger-container" ref={menuRef}>
                <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                {menuOpen &&
                    <nav className={navigationClass} >
                        {headerData.navigation.sections.map((section, index) => (
                            <div key={index}>
                                {section.displayName && <h3>{section.displayName}</h3>}
                                <div className="separator-horizontal"></div>
                                <ul>
                                    {section.navItems.map((navItem, indexNo) => (
                                        <li key={indexNo}><a href={navItem.targetPath}>{navItem.displayName}</a></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                }
            </div>
        </header>
    )
}