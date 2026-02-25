function DateCard({ id, date, onUpdate }) {
    return (
        <div className="bg-white px-3 rounded-lg shadow-sm border border-gray-100 mt-3 h-11.5 flex items-center">
            <input 
            type="date" 
            defaultValue={date}
            className="w-full h-full bg-transparent 
            outline-none cursor-pointer text-sm"
            onChange={(e) => onUpdate(id, e.target.value)}
        />
        
        </div>
    )
    }

export default DateCard