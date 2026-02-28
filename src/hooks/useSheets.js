import { useState, useEffect } from 'react'

export function useSheets() {
    
    const [sheets, setSheets] = useState([])


    const addJob = async (sheetId, newJob) => {
        try {
            const token = localStorage.getItem('token')
            
            const response = await fetch(`http://localhost:3000/sheets/${sheetId}/jobs`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newJob)
            })

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`)
            }

            const createdJob = await response.json()

            setSheets(sheets.map((sheet) => {
                if (sheet.id === sheetId) {
                    return { ...sheet, jobs: [...sheet.jobs, createdJob] }
                }
                return sheet
            }))

        } catch (error) {
            console.error("Problème lors de l'ajout du job :", error)
        }
    }

    const deleteJob = async (sheetId, jobId) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:3000/sheets/${sheetId}/jobs/${jobId}`, {
                method: 'DELETE', 
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`)
            }

            setSheets(sheets.map((sheet) => {
                if (sheet.id === sheetId) {
                    return { 
                        ...sheet, 
                        jobs: sheet.jobs.filter((j) => j.id !== jobId) 
                    }
                }
                return sheet
            }))

        } catch (error) {
            console.error("Problème lors de la suppression du job :", error)
        }
    }

    const updateJobStatus = async (sheetId, jobId, newStatus) => {
        try {
            const token = localStorage.getItem('token')

            const response = await fetch(`http://localhost:3000/sheets/${sheetId}/jobs/${jobId}`, { 
                method: 'PUT', 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus }) 
            })

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`)
            }

            setSheets(sheets.map((sheet) => {
                if (sheet.id === sheetId) {
                    return {
                        ...sheet,
                        jobs: sheet.jobs.map((j) => {
                            if (j.id === jobId) {
                                return { ...j, status: newStatus }
                            }
                            return j
                        })
                    }
                }
                return sheet
            }))

        } catch (error) {
            console.error("Error updating job status:", error)
        }
    }

    const updateJobDate = async (sheetId, jobId, newDate) => { 
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:3000/sheets/${sheetId}/jobs/${jobId}`, { 
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ dispatchDate: newDate }) 
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            setSheets(sheets.map((sheet) => {
                if (sheet.id === sheetId) { 
                    return {
                        ...sheet,
                        jobs: sheet.jobs.map((j) => {
                            if (j.id === jobId) {
                                return { ...j, dispatchDate: newDate }
                            }
                            return j
                        })
                    }
                }
                return sheet
            }))

        } catch (error) {
            console.error("Problème lors de la mise à jour de la date :", error);
        }
    }

    const deleteSheet = async (sheetId) => {
        try {
            const token = localStorage.getItem('token')

            // ⚠️ CORRECTION ICI : /sheet au lieu de /sheets
            const response = await fetch(`http://localhost:3000/sheet/${sheetId}`, {
                method: 'DELETE', 
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`)
            }

            setSheets(sheets.filter((sheet) => sheet.id !== sheetId))

        } catch (error) {
            console.error("Problème lors de la suppression :", error)
        }
    }

    const addSheet = async (newSheetForm) => {
        try {
            const token = localStorage.getItem('token');
            
            // ⚠️ CORRECTION ICI : /sheet au lieu de /sheets
            const response = await fetch('http://localhost:3000/sheet', {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newSheetForm.name }) 
            })

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`)
            }

            const newSheet = await response.json() 

            setSheets([...sheets, newSheet])
            
            return newSheet.id; 

        } catch (error) {
            console.error("Problème lors de la création :", error)
        }
    }

    const fetchSheets = async () => {
        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch('http://localhost:3000/sheet', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`)
            }

            const data = await response.json() 
            console.log("Sheet recived :", data)
            setSheets(data)
            
            return data

        } catch (error) {
            console.error("Api error:", error)
        }
    }

    useEffect(() => {
        fetchSheets()
    }, [])

    return {
        sheets,
        setSheets,
        addJob,
        deleteJob,
        updateJobStatus,
        updateJobDate,
        deleteSheet,
        addSheet
    }
}