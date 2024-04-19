import {Project} from "../../types/types.tsx";

interface ProjectListProps {
    data: Project[],
    selectedProjectIndex: number | null,
    handleSelect: (id: number) => void,
}

export default function ProjectList({data, selectedProjectIndex, handleSelect}: ProjectListProps) {
    if (data.length > 0) {
        return (
            <div className="project-card-list">
                {data.sort((pro1, pro2) => pro1.id - pro2.id).map((project) => (
                    <div key={project.id}
                         className={`project-card ${project.id === selectedProjectIndex ? 'selected' : ''}`}
                         onClick={() => handleSelect(project.id)}>
                        <h2>{project.author}</h2>
                        <p>ID: {project.id}</p>
                        <a href={project.path} target="_blank">{project.path}</a>
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            <div className="project-card">
                No result found.
            </div>
        )
    }

}