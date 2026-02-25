import { useState, useEffect } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

export default function Calendar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState(null)
    const [events, setEvents] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date())

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalData, setModalData] = useState({ title: '', time: '09:00', date: null })


    const getStartOfWeek = (date) => {
        const day = date.getDay()
        const diff = date.getDate() - day + (day === 0 ? -6 : 1)
        return new Date(new Date(date).setDate(diff))
    }

    const generateWeekDays = (baseDate) => {
        const weekStart = getStartOfWeek(new Date(baseDate))
        const days = []
        for (let i = 0; i < 7; i++) {
            const day = new Date(weekStart)
            day.setDate(weekStart.getDate() + i)
            days.push(day)
        }
        return days
    }

    const weekDays = generateWeekDays(currentDate)

    const changeWeek = (direction) => {
        const newDate = new Date(currentDate)
        newDate.setDate(currentDate.getDate() + (direction * 7))
        setCurrentDate(newDate)
    }


    const fetchEvents = async (accessToken) => {
        try {
            const startOfWeek = weekDays[0]
            const endOfWeek = new Date(weekDays[6])
            endOfWeek.setHours(23, 59, 59)

            const response = await axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: {
                    timeMin: startOfWeek.toISOString(),
                    timeMax: endOfWeek.toISOString(),
                    singleEvents: true,
                    orderBy: 'startTime'
                }
            })
            setEvents(response.data.items)
        } catch (error) {
            console.error("Erreur chargement:", error)
        }
    }

    useEffect(() => {
        if (isLoggedIn && token) fetchEvents(token)
    }, [currentDate])

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            setToken(tokenResponse.access_token)
            setIsLoggedIn(true)
            fetchEvents(tokenResponse.access_token)
        },
        scope: 'https://www.googleapis.com/auth/calendar.events'
    })


    const openModal = (dayDate) => {
        setModalData({ title: '', time: '09:00', date: dayDate })
        setIsModalOpen(true)
    }

    const handleConfirmAdd = async (e) => {
        e.preventDefault()
        if (!modalData.title || !modalData.time) return

        const [hours, minutes] = modalData.time.split(':').map(Number)
        const startDate = new Date(modalData.date)
        startDate.setHours(hours, minutes, 0)
        
        const endDate = new Date(startDate)
        endDate.setHours(hours + 1, minutes, 0)

        const event = {
            summary: modalData.title,
            start: { dateTime: startDate.toISOString() },
            end: { dateTime: endDate.toISOString() }
        }

        try {
            await axios.post('https://www.googleapis.com/calendar/v3/calendars/primary/events', event, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchEvents(token)
            setIsModalOpen(false)
        } catch (error) {
            alert("Erreur lors de la création")
        }
    }

    const handleDeleteEvent = async (eventId) => {
        if (!window.confirm("Supprimer cet événement ?")) return
        try {
            await axios.delete(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setEvents(events.filter(e => e.id !== eventId))
        } catch (error) {
            alert("Impossible de supprimer")
        }
    }


    if (!isLoggedIn) {
        return (
            <div className="bg-fond-tableau p-6 rounded-md shadow-sm text-center">
                <h3 className="font-bold text-xl mb-2">Mon Agenda</h3>
                <p className="text-gray-500 mb-4">Connecte ton agenda</p>
                <button onClick={() => login()} className="bg-fond-btn text-white px-4 py-2 rounded-md font-medium hover:opacity-90">
                    Connexion Google
                </button>
            </div>
        )
    }

    return (
        <div className="bg-fond-tableau p-3 rounded-md shadow-sm overflow-x-auto select-none relative">
            
            <div className="flex justify-between items-center mb-3 bg-white p-2 rounded-md shadow-sm">
                <button onClick={() => changeWeek(-1)} className="p-1 hover:bg-gray-100 rounded-full">◀</button>
                <div className="text-center">
                    <h3 className="font-bold text-lg text-gray-800 capitalize">
                        {weekDays[0].toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                    </h3>
                </div>
                <button onClick={() => changeWeek(1)} className="p-1 hover:bg-gray-100 rounded-full">▶</button>
            </div>

            <div className="min-w-200 grid grid-cols-7 gap-2">
                {weekDays.map((day, index) => {
                    const isToday = new Date().toDateString() === day.toDateString()
                    
                    const daysEvents = events.filter(event => {
                        const eventDate = new Date(event.start.dateTime || event.start.date)
                        return eventDate.toDateString() === day.toDateString()
                    })

                    return (
                        <div key={index} className="flex flex-col h-full">
                            {/* EN-TÊTE JOUR */}
                            <div className={`text-center p-2 rounded-t-md border-b-2 transition-colors
                                ${isToday 
                                    ? 'bg-[#CAA7FF] text-gray-900 border-fond-btn' 
                                    : 'bg-titre text-gray-700 border-transparent' 
                                }`}
                            >
                                <span className="block text-xs font-bold uppercase opacity-80">
                                    {day.toLocaleDateString('fr-FR', { weekday: 'short' })}
                                </span>
                                <span className="text-xl font-black">
                                    {day.getDate()}
                                </span>
                            </div>

                            <div className={`flex-1 min-h-37.5 p-2 rounded-b-md space-y-2 flex flex-col group transition-colors
                                ${isToday 
                                    ? 'bg-gray-100 border-2 border-gray-100'
                                    : 'bg-fond-page border border-gray-100' 
                                }`}
                            >
                                {daysEvents.map(event => (
                                    <div key={event.id} className="bg-white p-2 rounded shadow-sm border-l-4 border-fond-btn text-xs hover:shadow-md transition-shadow relative group/event">
                                        <div className="font-bold text-gray-800 truncate pr-4">{event.summary}</div>
                                        {event.start.dateTime && (
                                            <div className="text-gray-500 text-[10px]">
                                                {new Date(event.start.dateTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute:'2-digit' })}
                                            </div>
                                        )}
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id) }}
                                            className="absolute top-1 right-1 text-gray-300 hover:text-red-500 opacity-0 group-hover/event:opacity-100 transition-opacity font-bold text-lg leading-3"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}

                                <button 
                                    onClick={() => openModal(day)}
                                    className="mt-auto w-full py-1 text-center text-gray-300 hover:text-fond-btn hover:bg-white/50 rounded text-lg font-bold opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 animate-fade-in">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            Nouvel événement le {modalData.date?.toLocaleDateString()}
                        </h3>
                        <form onSubmit={handleConfirmAdd}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                                <input 
                                    type="text" 
                                    required
                                    autoFocus
                                    className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-gray-300"
                                    value={modalData.title}
                                    onChange={(e) => setModalData({...modalData, title: e.target.value})}
                                    placeholder="Ex: Entretien"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                                <input 
                                    type="time" 
                                    required
                                    className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-gray-300"
                                    value={modalData.time}
                                    onChange={(e) => setModalData({...modalData, time: e.target.value})}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded"
                                >
                                    Annuler
                                </button>
                                <button 
                                    type="submit"
                                    className="px-4 py-2 bg-fond-btn text-white rounded hover:opacity-90 font-medium"
                                >
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}