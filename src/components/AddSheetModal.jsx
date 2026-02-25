function AddSheetModal({ 
    isSheetModalOpen, 
    setIsSheetModalOpen, 
    newSheetForm, 
    setNewSheetForm, 
    handleAddSheet 
}) {
    if (!isSheetModalOpen) return null

    return (
        <div 
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
            onClick={() => setIsSheetModalOpen(false)}
        >
            <div 
                className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">Créer une nouvelle feuille</h2>

                <div className="flex flex-col gap-3 mb-4">
                    <input 
                        type="text" 
                        placeholder="Nom du tableau (ex: Stage 2026)" 
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={newSheetForm.name}
                        onChange={(e) => setNewSheetForm({ ...newSheetForm, name: e.target.value })}
                    />
                </div>

                <button 
                    className="bg-fond-btn w-full rounded-md p-2 mt-2 font-medium hover:bg-opacity-80 transition-all" 
                    onClick={handleAddSheet}
                >
                    Créer la feuille
                </button>
            </div>
        </div>
    )
}

export default AddSheetModal