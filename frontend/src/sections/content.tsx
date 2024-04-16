import {Project} from "../types/types";
import '../assets/css/sections/content.css'

type ContentProps = {
    data: Project[],
    selectedProjectIndex: number | null,
    handleSelect: (index: number) => void
}
export default function Content({data, selectedProjectIndex, handleSelect}: ContentProps) {



    if (data.length > 0){
        return (
            <main style={{padding: '20px'}}>
                {data.sort((pro1, pro2) => pro1.id - pro2.id).map((project) => (
                    <div key={project.id}
                         className={`project-card ${project.id === selectedProjectIndex ? 'selected' : ''}`}
                         onClick={() => handleSelect(project.id)}>
                        <h2>{project.author}</h2>
                        <p>ID: {project.id}</p>
                        <a href={project.path} target="_blank">{project.path}</a>
                    </div>
                ))}
            </main>
        );
    }

    else {
        return (
            <main style={{padding: '20px'}}>
                <div className="project-card">
                    No result found.
                </div>
            </main>
        )
    }

}