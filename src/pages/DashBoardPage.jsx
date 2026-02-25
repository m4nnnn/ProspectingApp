import AddCompanyModal from '../components/AddCompanyModal.jsx'
import AddSheetModal from '../components/AddSheetModal.jsx'
import SheetTable from '../components/SheetTable.jsx'
import { useState } from 'react'
import { useSheets } from '../hooks/useSheets.js'
import Calendar from '../components/Calendar.jsx'

function DashBoardPage() {
    
    const { 
        sheets, 
        setSheets, 
        addJob, 
        deleteJob, 
        updateJobStatus, 
        updateJobDate, 
        deleteSheet, 
        addSheet 
    } = useSheets()

    const [activeSheetId, setActiveSheetId] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSheetModalOpen, setIsSheetModalOpen] = useState(false)

    const [newJob, setNewJob] = useState({
        companyName: "",
        status: "application sent",
        place: "",
        dispatchDate: "",
        job: ""
    })

    const [newSheetForm, setNewSheetForm] = useState({
        name: ""
    })

    const activeSheet = sheets.find(sheet => sheet.id === activeSheetId)
    const jobs = activeSheet?.jobs || []

    const handleAdd = () => {
        if (newJob.companyName.trim() === "" || !activeSheet) return
        
        addJob(activeSheet.name, newJob)

        setIsModalOpen(false)
        setNewJob({
            companyName: "",
            status: "application sent",
            place: "",
            dispatchDate: "",
            job: ""
        })
    }

    const handleDelete = (id) => {
        deleteJob(activeSheet.name, id)
    }

    const handleUpdateStatus = (idAModifier, nouveauStatut) => {
        updateJobStatus(activeSheet.name, idAModifier, nouveauStatut)
    }

    const handleUpdateDate = (idAModifier, nouvelleDate) => {
        updateJobDate(activeSheet.name, idAModifier, nouvelleDate)
    }

    const handleDeleteSheet = () => {
        const confirmation = window.confirm("Es-tu sûr de vouloir supprimer cette feuille et toutes ses candidatures ?")
        if (!confirmation) return

        const feuillesRestantes = deleteSheet(activeSheet.name)
        setSheets(feuillesRestantes)

        if (feuillesRestantes.length > 0) {
            setActiveSheetId(feuillesRestantes[0].id)
        } else {
            setActiveSheetId(0)
        }
    }

    const handleAddSheet = () => {
        if (newSheetForm.name.trim() === "") return

        const newId = addSheet(newSheetForm)
        setActiveSheetId(newId)

        setIsSheetModalOpen(false)
        setNewSheetForm({
            name: ""
        })
    }

    return (
        <div className="p-3 relative">
            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
                <h1 className="font-bold text-3xl">DASHBOARD</h1>
                <div className="flex gap-4">
                    <button 
                        onClick={() => setIsSheetModalOpen(true)} 
                        className="bg-fond-btn rounded-md p-2">
                        Nouvelle feuille
                    </button>
                    <button 
                        className="bg-fond-btn rounded-md p-2" 
                        onClick={() => setIsModalOpen(true)}
                    >
                        Ajouter une entreprise
                    </button>
                </div>
            </div>

            <div className="mt-4">
                {/* Onglets */}
                <div className="flex gap-2 mb-2 overflow-x-auto">
                    {sheets.map((sheet) => (
                        <button 
                            key={sheet.id}
                            onClick={() => setActiveSheetId(sheet.id)}
                            className={`px-4 py-2 rounded-t-md font-semibold transition-colors whitespace-nowrap ${
                                activeSheetId === sheet.id 
                                ? 'bg-fond-tableau shadow-sm' 
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                            }`}
                        >
                            {sheet.name}
                        </button>
                    ))}
                </div>

                {/* Sheet */}
                <SheetTable 
                    activeSheet={activeSheet}
                    jobs={jobs}
                    handleDeleteSheet={handleDeleteSheet}
                    handleUpdateStatus={handleUpdateStatus}
                    handleUpdateDate={handleUpdateDate}
                    handleDelete={handleDelete}
                />

                {/* Calendar Google */}
                <div className="mt-4">
                    <Calendar />
                </div>

            </div>

            {/* Modales */}
            <AddCompanyModal 
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                newJob={newJob}
                setNewJob={setNewJob}
                handleAdd={handleAdd}
            />

            <AddSheetModal 
                isSheetModalOpen={isSheetModalOpen}
                setIsSheetModalOpen={setIsSheetModalOpen}
                newSheetForm={newSheetForm}
                setNewSheetForm={setNewSheetForm}
                handleAddSheet={handleAddSheet}
            />
        </div>
    )
}

export default DashBoardPage