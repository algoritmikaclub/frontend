import { useState } from 'react'
import NoteItem from './components/NoteItem/NoteItem'
import NoteForm from './components/NoteForm/NoteForm'
import './App.less'

function App() {
    const [notes, setNotes] = useState([])

    const addNote = (note) => {
        setNotes([...notes, note])
    }

    const deleteNote = (id) => {
        setNotes(notes.filter((note) => note.id !== id))
    }

    const editNote = (id, updatedNote) => {
        setNotes(notes.map((note) => (note.id === id ? { ...note, ...updatedNote } : note)))
    }

    return (
        <>
            <NoteForm addNote={addNote} />
            <h1>Заметки</h1>
            <ul>
                {notes.map((note) => (
                    <NoteItem 
                        key={note.id} 
                        note={note} 
                        deleteNote={deleteNote} 
                        editNote={editNote} 
                    />
                ))}
            </ul>
        </>
    )
}

export default App