'use client'

import { useState, useEffect } from 'react';

export default function TestApiPage() {
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/hello');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMessage(data.message);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
            fetchData();
        };
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }   

    if (error) {
        return <p style={{ color: 'red' }} >Error: {error}</p>; }
    return (
        <div>
            <h1>Backend API Test</h1>
            <p>Message from API: <strong>{message}</strong></p>
        </div>
    )
    
    return (
        <div>
        <h1>Test API Page</h1>
        <p>Message from API: {message}</p>
        </div>
    );

}