import { useState } from 'react'
import Button from '../Button/Button'
import './NoteForm.less'

const NoteForm = ({ addNote }) => {
    const [content, setContent] = useState('')

    const handleClick = (e) => {
        e.preventDefault()
        if (!content) return

        addNote({ id: Date.now(), content })
        setContent('')
    }

    return (
        <form>
            <input 
                type="text" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="Введите заметку" 
            />
            <Button onClick={handleClick} className="add">Добавить заметку</Button>
        </form>
    )
}

export default NoteForm