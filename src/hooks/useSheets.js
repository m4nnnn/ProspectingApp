import { useState, useEffect } from 'react'
import { defaultSheets } from '../data/defaultSheets.js'

export function useSheets() {
    
    const [sheets, setSheets] = useState(() => {
        const savedData = localStorage.getItem('appSheets')
        if (savedData) {
            return JSON.parse(savedData)
        }
        return defaultSheets
    })

    useEffect(() => {
        localStorage.setItem('appSheets', JSON.stringify(sheets))
    }, [sheets])

    const addJob = (sheetName, newJob) => {
        setSheets(sheets.map((sheet) => {
            if (sheet.name === sheetName) {
                const newId = sheet.jobs.length > 0 ? Math.max(...sheet.jobs.map(j => j.id)) + 1 : 1
                const jobToIntegrate = { ...newJob, id: newId }
                return {
                    ...sheet,
                    jobs: [...sheet.jobs, jobToIntegrate]
                }
            }
            return sheet
        }))
    }

    const deleteJob = (sheetName, jobId) => {
        setSheets(sheets.map((sheet) => {
            if (sheet.name === sheetName) {
                return { 
                    ...sheet, 
                    jobs: sheet.jobs.filter((j) => j.id !== jobId) 
                }
            }
            return sheet
        }))
    }

    const updateJobStatus = (sheetName, jobId, newStatus) => {
        setSheets(sheets.map((sheet) => {
            if (sheet.name === sheetName) {
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
    }

    const updateJobDate = (sheetName, jobId, newDate) => {
        setSheets(sheets.map((sheet) => {
            if (sheet.name === sheetName) {
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
    }

    const deleteSheet = (sheetName) => {
        return sheets.filter((sheet) => sheet.name !== sheetName)
    }

    const addSheet = (newSheetForm) => {
        const newSheet = {
            id: sheets.length > 0 ? Math.max(...sheets.map(s => s.id)) + 1 : 1,
            name: newSheetForm.name,
            jobs: []
        }
        setSheets([...sheets, newSheet])
        
        return newSheet.id 
    }

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