import React, { useEffect, useState } from 'react';

interface BuildStep {
    supplyCount: number;
    description: string;
}

interface Commander {
    name: string;
    id: string;
    recommendedBuildOrder: BuildStep[];
}

const CommanderList: React.FC = () => {
    const[ commanders, setCommanders ] = useState<Commander[]>([]);
    const[ selectedCommander, setCommander ] = useState<Commander | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const fetchCommanders = async () => {
            try {
                const response = await fetch(`${process.env.PUBLIC_URL}/commanders.json`);
                if (!response.ok) {
                    throw new Error("Could not fetch commanders");
                }
                const data: Commander[] = await response.json();
                setCommanders(data);
                setCommander(data[0]);
            } catch (e) {
                setError(e instanceof Error ? e.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        }
        fetchCommanders();
    }, []);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
        <div>
            <h1>Commanders</h1>
            <select value={selectedCommander?.id} 
                    onChange={(e) => setCommander(commanders.find(commander => commander.id === e.target.value) ?? null)}
            >
                {commanders.map((commander) => (
                    <option value={commander.id}>
                        {commander.name}
                    </option>
                ))}
            </select>
            <h2>Build Order</h2>
            <pre>
                <code>
                    {selectedCommander?.recommendedBuildOrder.map((buildStep, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <span>{"\n"}</span>}
                            {buildStep.supplyCount} {buildStep.description}
                        </React.Fragment>
                    ))}
                </code>
            </pre>
        </div>
    )
};

export default CommanderList;
