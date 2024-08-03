import TripCard from '../TripCard/TripCard'

const TripList = ({ trips, onDelete, onAddNote, onDeleteNote }: { trips: any[], onDelete: (id: string) => void, onAddNote: (id: string, note: string) => void, onDeleteNote: (id: string, noteIndex: number) => void }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', padding: '16px' }}>
            {trips.map((trip: { id: string, [key: string]: any }) => (
                <TripCard key={trip.id} trip={trip} onDelete={onDelete} onAddNote={onAddNote} onDeleteNote={onDeleteNote} />
            ))}
        </div>
    )
}

export default TripList