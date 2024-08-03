import { useState } from 'react'
import { format } from 'date-fns';

const TripCard = ({ trip, onDelete, onAddNote, onDeleteNote }: { trip: any, onDelete: any, onAddNote: any, onDeleteNote: any }) => {
    const [newNote, setNewNote] = useState('')

    const handleAddNote = (tripId: string, note: string) => {
        console.log("note", note)
        onAddNote(tripId, note)
        setNewNote('')
    }

    return (
        <div className='trip-card' style={{ border: '2px solid #424242', borderRadius: '10px', padding: '24px', margin: '24px 0', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', backgroundColor: '#303030', position: 'relative' }}>
            <button onClick={() => {
                if (window.confirm(`Are you sure you want to delete "${trip.country}"?`)) {
                    onDelete(trip.id)
                }
            }} style={{ position: 'absolute', top: '8px', right: '8px', padding: '4px', borderRadius: '50%', border: 'none', backgroundColor: '#d32f2f', color: '#fff', cursor: 'pointer', transition: 'background-color 0.3s, transform 0.2s', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>X</button>
            <p style={{ fontSize: '20px', fontWeight: '600', margin: '12px 0', color: '#e0e0e0' }}>{format(trip.startDate, 'PPP')} - {format(trip.endDate, 'PPP')}</p>
            <p style={{ fontSize: '18px', color: '#bdbdbd', margin: '12px 0' }}>{trip.country}</p>
            <ul style={{ listStyleType: 'none', padding: '0', margin: '24px 0' }}>
                {trip.notes.map((note: string, index: number) => (
                    <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '2px solid #616161', backgroundColor: '#424242', borderRadius: '6px', marginBottom: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <span style={{ flex: '1', marginRight: '12px', color: '#e0e0e0', fontSize: '16px' }}>{note}</span>
                        <button onClick={() => onDeleteNote(trip.id, index)} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#d32f2f', color: '#fff', cursor: 'pointer', transition: 'background-color 0.3s, transform 0.2s' }}>X</button>
                    </li>
                ))}
            </ul>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type="text" onChange={(e) => setNewNote(e.target.value)} value={newNote} style={{ padding: '12px', borderRadius: '6px', border: '2px solid #424242', margin: '12px 0', width: 'calc(100% - 150px)', marginRight: '12px', backgroundColor: '#616161', color: '#e0e0e0' }} />
                <button onClick={() => handleAddNote(trip.id, newNote)} style={{ padding: '12px 24px', borderRadius: '6px', border: 'none', backgroundColor: '#388e3c', color: '#fff', cursor: 'pointer', transition: 'background-color 0.3s, transform 0.2s' }}>Add Note</button>
            </div>
        </div>
    )
}

export default TripCard