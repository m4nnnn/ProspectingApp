function StatusCard({ content, id, status, onUpdate}) {

    return (
        <div className="mt-3">
            <select 
            defaultValue={status} 
            className="block w-full bg-white px-3 h-11.5 
            rounded-lg shadow-sm border border-gray-100 
            text-sm focus:outline-none cursor-pointer appearance-none"
            onChange={(e) => onUpdate(id, e.target.value)}
            >
                <option value="En attente">En attente</option>
                <option value="Accepté">Accepté</option>
                <option value="Refusé">Refusé</option>
            </select>
        </div>
    )
}

export default StatusCard