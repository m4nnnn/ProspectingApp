function AddCompanyModal({ 
    isModalOpen, 
    setIsModalOpen, 
    newJob, 
    setNewJob, 
    handleAdd 
}) {
    if (!isModalOpen) return null

    return (
        <div 
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
        >
            <div 
                className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-xl max-h-screen overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">Ajouter une candidature</h2>

                <div className="flex flex-col gap-3 mb-4">
                    <input 
                        type="text" 
                        placeholder="Nom de l'entreprise" 
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={newJob.companyName}
                        onChange={(e) => setNewJob({ ...newJob, companyName: e.target.value })}
                    />

                    <select 
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={newJob.status}
                        onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
                    >
                        <option value="application sent">Candidature envoyée</option>
                        <option value="first interview">Premier entretien</option>
                        <option value="refused">Refusée</option>
                        <option value="no response">Sans réponse</option>
                    </select>

                    <input 
                        type="text" 
                        placeholder="Ville (ex: Paris)" 
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={newJob.place}
                        onChange={(e) => setNewJob({ ...newJob, place: e.target.value })}
                    />

                    <input 
                        type="date" 
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={newJob.dispatchDate}
                        onChange={(e) => setNewJob({ ...newJob, dispatchDate: e.target.value })}
                    />

                    <input
                        type="text"
                        placeholder="Poste visé"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={newJob.job}
                        onChange={(e) => setNewJob({ ...newJob, job: e.target.value })}
                    />
                </div>

                <button 
                    className="bg-fond-btn w-full rounded-md p-2 mt-2 font-medium hover:bg-opacity-80 transition-all" 
                    onClick={handleAdd}
                >
                    Ajouter
                </button>
            </div>
        </div>
    )
}

export default AddCompanyModal