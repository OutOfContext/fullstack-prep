import '../assets/css/sections/content.css'
import * as React from "react";

type ContentProps = {
    data?: React.ReactNode | null;
}
export default function Content({data}: ContentProps) {

    return (
        <main style={{padding: '20px'}}>
            {data}
        </main>
    );

}