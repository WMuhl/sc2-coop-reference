import React, {useEffect, useState} from "react";

interface Map {
    name: string;
    mapTimings: MapTiming[];
    id: string;
    link:string;
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
    const [selectedMap, setSelectedMap] = useState<Map | null>(null);
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
                setSelectedMap(data[0]);
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
            <h1>Map Timings</h1>
            <select
                value={selectedMap?.id}
                onChange={e => setSelectedMap(maps.find(m => m.id === e.target.value) ?? null)}
                name="mapSelector"
                id="mapSelector"
            >
                {maps.map(map => (
                    <option key={map.id} value={map.id}>{map.name}</option>
                ))}
            </select>
            <p><a href={selectedMap?.link}>{selectedMap?.link}</a></p>
            {selectedMap?.mapTimings.map((mapTiming, mapTimingIndex) => (
                <div className={'scroll-flow'} key={mapTimingIndex}>
                    <h3>{mapTiming.name}</h3>
                    <p>{mapTiming.description}</p>
                    <table>
                        <thead>
                        <tr>
                            {mapTiming?.columns.map((column, colIndex) => (
                                <th key={colIndex}>{column.title}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {mapTiming.timings.map((timing, index) => (
                            <tr key={index}>
                                {mapTiming.columns.map((column, colIndex) => (
                                    <td key={colIndex}>{timing[column.key]}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default MapList;