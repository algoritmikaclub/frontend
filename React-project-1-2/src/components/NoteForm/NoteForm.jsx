import { useState } from 'react'
import Button from '../Button/Button'
import './NoteForm.less'

const NoteForm = ({ addNote }) => {
    const [content, setContent] = useState('')
    const [color, setColor] = useState('#ffffff')

    const handleClick = (e) => {
        e.preventDefault()
        if (!content) return

        addNote({ id: Date.now(), content, color })
        setContent('')
        setColor('#ffffff')
    }

    return (
        <form>
            <input 
                type="text" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="Введите заметку" 
            />
            <input 
                type="color" 
                value={color} 
                onChange={(e) => setColor(e.target.value)} 
            />
            <Button onClick={handleClick} className="add">Добавить заметку</Button>
        </form>
    )
}

export default NoteForm


