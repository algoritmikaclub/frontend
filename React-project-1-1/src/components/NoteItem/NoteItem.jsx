import { useState } from 'react'
import Button from '../Button/Button'
import './NoteItem.less'

const NoteItem = ({ note, deleteNote, editNote }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [newContent, setNewContent] = useState(note.content)

    const handleEdit = () => {
        editNote(note.id, { content: newContent })
        setIsEditing(false)
    }

    return (
        <li style={{ backgroundColor: note.color }}>
            {isEditing ? (
                <div>
                    <textarea 
                        type="text" 
                        value={newContent} 
                        onChange={(e) => setNewContent(e.target.value)} 
                    />
                    <div className="buttons">
                        <Button onClick={handleEdit} className="save">Сохранить</Button>
                    </div>
                </div>
            ) : (
                <div>
                    <span>{note.content}</span>
                    <div className="buttons">
                        <Button onClick={() => setIsEditing(true)} className="edit">Редактировать</Button>
                        <Button onClick={() => deleteNote(note.id)} className="del">Удалить</Button>
                    </div>
                </div>
            )}
        </li>
    )
}

export default NoteItem

