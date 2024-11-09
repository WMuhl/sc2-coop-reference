import React, {useEffect, useState} from "react";

interface Map {
    name: string;
    mapTimings: MapTiming[];
}

interface MapTiming {
    name: string;
    description: string;
    columns: Column[];
    timings: Timing[];
}

interface Timing {
    [key: string]: string | number;
}

interface Column {
    title: string;
    key: string;
}

const MapList: React.FC = () => {
    const [maps, setMaps] = useState<Map[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMaps = async () => {
            try {
                const response = await fetch(`${process.env.PUBLIC_URL}/maps.json`);
                if (!response.ok) {
                    throw new Error('Could not fetch maps');
                } 
                const data: Map[] = await response.json();
                setMaps(data);
            } catch (e) {
                setError(e instanceof Error ? e.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };
        fetchMaps();
    }, []);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
        <div>
            <h1>Maps</h1>
            <select name="mapSelector" id="mapSelector">
                {maps.map(map => (
                    <option value={map.name}>{map.name}</option>
                ))}
            </select>
        </div>
    );
}

export default MapList;