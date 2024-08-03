import { useEffect, useState } from "react";
import './AddTripForm.css';
import { useCollection } from "@squidcloud/react";

export default function AddTripForm() {
    const [country, setCountry] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [countries, setCountries] = useState<{ name: string, flag: string }[]>([]);

    const tripsCollection = useCollection("trips");

    async function getCountries() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            console.log("data", data)
            const countries = data.map((country: { name: { common: string }, flags: { svg: string } }) => ({
                name: country.name.common,
                flag: country.flags.svg
            }));
            setCountries(countries);
        } catch (error) {
            console.error("error", error);
        }
    }

    useEffect(() => {
        getCountries();
    }, []);

    const addTrip = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const tripId = crypto.randomUUID();
            const data = tripsCollection.doc(tripId).insert({
                id: tripId,
                country: country,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                notes: []
            });
            console.log("data", data);
            alert("Trip added");
        } catch (error) {
            alert(error);
            console.error("error", error);
        }
    }

    return (
        <div className="trip-container" style={{ backgroundColor: '#303030', padding: '24px', borderRadius: '10px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', color: '#e0e0e0' }}>
            <h3 style={{ color: '#ffffff' }}>Add a Trip</h3>
            <form onSubmit={addTrip} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
                <div className="form-group" style={{ marginBottom: '16px', flex: 1 }}>
                    <label htmlFor="country" style={{ display: 'block', marginBottom: '8px', color: '#bdbdbd' }}>Country</label>
                    <div style={{ position: 'relative' }}>
                        <select
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="form-control"
                            style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', paddingRight: '30px', backgroundColor: '#424242', color: '#e0e0e0', border: '2px solid #616161', borderRadius: '6px', padding: '12px', width: '100%' }}
                        >
                            <option value="" disabled>Select a country</option>
                            {countries.map((country) => (
                                <option key={country.name} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            right: '10px',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            {country && (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={countries.find(c => c.name === country)?.flag}
                                        alt={`${country} flag`}
                                        style={{ width: '20px', marginLeft: '260px', paddingRight: '5px' }}
                                    />
                                    <span>{country}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" style={{ marginBottom: '16px', flex: 1 }}>
                    <label htmlFor="start-date" style={{ display: 'block', marginBottom: '8px', color: '#bdbdbd' }}>Start Date</label>
                    <input type="date" id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="form-control" style={{ backgroundColor: '#424242', color: '#e0e0e0', border: '2px solid #616161', borderRadius: '6px', padding: '12px', width: '100%' }} />
                </div>
                <div className="form-group" style={{ marginBottom: '16px', flex: 1 }}>
                    <label htmlFor="end-date" style={{ display: 'block', marginBottom: '8px', color: '#bdbdbd' }}>End Date</label>
                    <input type="date" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="form-control" style={{ backgroundColor: '#424242', color: '#e0e0e0', border: '2px solid #616161', borderRadius: '6px', padding: '12px', width: '100%' }} />
                </div>
                <button type="submit" className="btn" style={{ backgroundColor: '#388e3c', color: '#fff', borderRadius: '6px', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s, transform 0.2s', width: '200px', marginTop: '20px', padding: '14px 24px' }}>Add Trip</button>
            </form>
        </div>
    );
}