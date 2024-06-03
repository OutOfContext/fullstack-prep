import '../assets/css/sections/toolbar.css'

interface ToolbarProps {
    handleShowModal: (type: string) => void,
    selectedIndex: number | null
}
export default function Toolbar(toolbarProps: ToolbarProps) {
    return(
        <div className="toolbar">
            <button onClick={() => toolbarProps.handleShowModal('add')}>Add</button>
            <button onClick={() => toolbarProps.handleShowModal('delete')} disabled={toolbarProps.selectedIndex == null}>Remove</button>
            <button onClick={() => toolbarProps.handleShowModal('edit')} disabled={toolbarProps.selectedIndex == null}>Edit</button>
        </div>
    )
}