import './App.css';
import AddTripForm from './components/AddTripForm/AddTripForm';
import TripList from './components/TripList/TripList';
import { useCollection, useQuery } from '@squidcloud/react';
import backgroundImage from './assets/image.png'
import AskAI from './components/AskAI/AskAI';

function App() {

  const collection = useCollection('trips')
  const trips = useQuery(collection.query())

  const onDelete = (id: string) => {
    const trip = findTripById(id)
    if (trip) {
      trip.delete()
    }
  }

  const findTripById = (id: string) => {
    return trips.data.find((trip) => trip.data.id === id)
  }

  const onAddNote = (id: string, note: string) => {
    const trip = findTripById(id)
    if (trip) {
      const notes = [...trip.data.notes, note]
      trip.update({
        notes
      })
    }
  }

  const onDeleteNote = (id: string, noteIndex: number) => {
    const trip = findTripById(id)
    if (trip) {
      const notes = trip.data.notes.filter((_: string, index: number) => index !== noteIndex)
      trip.update({
        notes
      })
    }
  }

  return (
    <div className="App">
      <AskAI />
      <AddTripForm />
      <TripList trips={trips.data.map((trip) => trip.data)} onDelete={onDelete} onAddNote={onAddNote} onDeleteNote={onDeleteNote} />
    </div>
  )
}

export default App;
