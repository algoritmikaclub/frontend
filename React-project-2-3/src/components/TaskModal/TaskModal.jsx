import { useState, useEffect } from 'react'
//import './TaskModal.less'

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')

    useEffect(() => {
        if (task) {
            setTitle(task.title)
            setDescription(task.description)
            setDeadline(task.deadline)
        } else {
            setTitle('')
            setDescription('')
            setDeadline('')
        }
    }, [task])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave({ ...task, title, description, deadline })
        onClose()
    };

    if (!isOpen) return null

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{task ? 'Редактировать задачу' : 'Новая задача'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Заголовок"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Описание"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />
                    <div className="modal-actions">
                        <button type="submit">Сохранить</button>
                        <button type="button" onClick={onClose}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskModal