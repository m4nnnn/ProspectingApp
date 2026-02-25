import TextCard from './TextCard.jsx'
import StatusCard from './StatusCard.jsx'
import DateCard from './DateCard.jsx'
import DeleteCard from './DeleteCard.jsx'

function SheetTable({ 
    activeSheet, 
    jobs, 
    handleDeleteSheet, 
    handleUpdateStatus, 
    handleUpdateDate, 
    handleDelete 
}) {
    if (!activeSheet) {
        return (
            <div className="bg-fond-tableau rounded-md rounded-tl-none p-6 text-center shadow-sm">
                <p className="text-gray-500">Aucune feuille sélectionnée. Créez-en une nouvelle !</p>
            </div>
        )
    }

    return (
        <div className="bg-fond-tableau rounded-md rounded-tl-none p-3 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h2 className="font-bold text-xl">
                    {activeSheet.name}
                </h2>
                <button onClick={handleDeleteSheet} className="text-red-500 text-sm hover:underline">
                    Supprimer la feuille
                </button>
            </div>
            
            <div className="overflow-x-auto mt-5">
                <div className="flex gap-2 bg-fond-page p-3 min-w-200">
                    <div className="flex-1 text-center">
                        <h3 className="font-light bg-titre px-3 py-1 rounded-full">
                            Entreprise
                        </h3>
                        {jobs.map((job) => (
                            <TextCard key={job.id} content={job.companyName} />
                        ))}
                    </div>
                    <div className="flex-1 text-center">
                        <h3 className="font-light bg-titre px-3 py-1 rounded-full">
                            Statut
                        </h3>
                        {jobs.map((job) => (
                            <StatusCard 
                                key={job.id} 
                                id={job.id} 
                                status={job.status} 
                                onUpdate={handleUpdateStatus} 
                            />
                        ))}
                    </div>
                    <div className="flex-1 text-center">
                        <h3 className="font-light bg-titre px-3 py-1 rounded-full">
                            Lieu
                        </h3>
                        {jobs.map((job) => (
                            <TextCard key={job.id} content={job.place} />
                        ))}
                    </div>
                    <div className="flex-1 text-center">
                        <h3 className="font-light bg-titre px-3 py-1 rounded-full">
                            Date d'envoi
                        </h3>
                        {jobs.map((job) => (
                            <DateCard 
                                key={job.id} 
                                id={job.id} 
                                date={job.dispatchDate} 
                                onUpdate={handleUpdateDate} 
                            />
                        ))}
                    </div>
                    <div className="flex-1 text-center">
                        <h3 className="font-light bg-titre px-3 py-1 rounded-full">
                            Poste visé
                        </h3>
                        {jobs.map((job) => (
                            <TextCard key={job.id} content={job.job} />
                        ))}
                    </div>
                    <div className="w-16 text-center">
                        <h3 className="px-3 py-1">&nbsp;</h3>
                        {jobs.map((job) => (
                            <DeleteCard 
                                key={job.id}
                                id={job.id}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SheetTable