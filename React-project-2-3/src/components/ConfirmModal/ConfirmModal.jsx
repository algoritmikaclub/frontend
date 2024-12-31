// import './ConfirmModal.less'

const ConfirmModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
    if (!isOpen) return null

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Вы уверены, что хотите удалить задачу "{taskTitle}"?</h2>
                <div className="modal-actions">
                    <button onClick={onConfirm}>Удалить</button>
                    <button onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal