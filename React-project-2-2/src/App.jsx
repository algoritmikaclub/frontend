import { useState, useEffect } from 'react'
import TaskModal from './components/TaskModal/TaskModal'
import ConfirmModal from './components/ConfirmModal/ConfirmModal'
import TaskColumn from './components/TaskColumn/TaskColumn'
import './App.less'

const LOCAL_STORAGE_KEY = 'taskManagerTasks'

const App = () => {
    const [tasks, setTasks] = useState( () => {
        const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY)
        return storedTasks ? JSON.parse(storedTasks) : []
    })
    const [modalTask, setModalTask] = useState(null)
    const [confirmTask, setConfirmTask] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
    }, [tasks])

    const handleAddTask = () => {
        setModalTask(null)
        setIsModalOpen(true)
    }

    const handleSaveTask = (task) => {
        if (task.id) {
            setTasks(tasks.map((t) => (t.id === task.id ? task : t)))
        } else {
            setTasks([...tasks, { ...task, id: Date.now(), state: 'ПОСТАВЛЕНА' }])
        }
    }

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const handleChangeState = (id, newState) => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, state: newState } : task)))
    }

    const filteredTasks = tasks.filter(task => {
        const taskDate = new Date(task.deadline)
        const start = new Date(startDate)
        const end = new Date(endDate)
        return (!startDate || taskDate >= start) && (!endDate || taskDate <= end)
    })

    return (
        <div className="app">
            <header>
                <button onClick={handleAddTask}>НОВАЯ ЗАДАЧА</button>
                <div className="filter">
                    Фильтр по дедлайнам с:
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    по:
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    <button onClick={() => { setStartDate(''); setEndDate(''); }}>СБРОСИТЬ ФИЛЬТРЫ</button>
                </div>
            </header>
            <div className="task-columns">
                <TaskColumn
                    title="ПОСТАВЛЕННЫЕ"
                    tasks={filteredTasks.filter((task) => task.state === 'ПОСТАВЛЕНА')}
                    onChangeState={handleChangeState}
                    onEdit={(task) => {
                        setModalTask(task);
                        setIsModalOpen(true);
                    }}
                    onDelete={(task) => {
                        setConfirmTask(task);
                        setIsConfirmOpen(true);
                    }}
                    backgroundColor="#FF99FF"
                />
                <TaskColumn
                    title="В РАБОТЕ"
                    tasks={filteredTasks.filter((task) => task.state === 'В РАБОТЕ')}
                    onChangeState={handleChangeState}
                    onEdit={(task) => {
                        setModalTask(task);
                        setIsModalOpen(true);
                    }}
                    onDelete={(task) => {
                        setConfirmTask(task);
                        setIsConfirmOpen(true);
                    }}
                    backgroundColor="#99FFFF"
                />
                <TaskColumn
                    title="ВЫПОЛНЕННЫЕ"
                    tasks={filteredTasks.filter((task) => task.state === 'ВЫПОЛНЕНА')}
                    onChangeState={handleChangeState}
                    onEdit={(task) => {
                        setModalTask(task);
                        setIsModalOpen(true);
                    }}
                    onDelete={(task) => {
                        setConfirmTask(task);
                        setIsConfirmOpen(true);
                    }}
                    backgroundColor="#99FF99"
                />
            </div>
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTask}
                task={modalTask}
            />
            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={() => {
                    handleDeleteTask(confirmTask.id);
                    setIsConfirmOpen(false);
                }}
                taskTitle={confirmTask?.title}
            />
        </div>
    )
}

export default App