function DeleteCard({ id, onDelete }) {
    return (
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 mt-3 h-11.5 flex justify-center items-center">
            <button onClick={() => onDelete(id)} className="cursor-pointer">
                🗑️
            </button>

        </div>
    )
}

export default DeleteCard