import { useSquid } from "@squidcloud/react"
import { useState } from "react"

const AskAI = () => {
    const squid = useSquid()
    const [input, setInput] = useState('')
    const [response, setResponse] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        setIsLoading(true)
        const response = await squid.executeFunction('askAI', input)
        setResponse(response)
        setInput('')
        setIsLoading(false)
    }

    return (
        <div style={{ textAlign: 'center', padding: '20px', maxWidth: '600px', margin: '0 auto 20px auto', backgroundColor: '#303030', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', color: '#e0e0e0' }}>
            <h3 style={{ color: '#e0e0e0', marginBottom: '20px' }}>Ask Question related to your trip!!!</h3>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question related to your trip"
                cols={70}
                rows={4}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #424242', boxSizing: 'border-box', marginBottom: '20px', backgroundColor: '#424242', color: '#e0e0e0' }}
                disabled={isLoading}
            ></textarea>
            <button
                onClick={handleSubmit}
                style={{ padding: '10px 20px', borderRadius: '4px', border: 'none', backgroundColor: isLoading ? '#616161' : '#388e3c', color: '#fff', cursor: isLoading ? 'not-allowed' : 'pointer', fontSize: '16px' }}
                disabled={isLoading}
            >
                {isLoading ? 'Submitting...' : 'Submit'}
            </button>
            <p style={{ marginTop: '20px', color: '#e0e0e0' }}>{response}</p>
        </div>
    )
}

export default AskAI