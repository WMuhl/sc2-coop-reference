import React from 'react';
import './App.css';
import CommanderList from './components/CommanderList';
import MapList from "./components/MapList";

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Starcraft 2 Co-op Reference</h1>
            <CommanderList/>
            <MapList/>
            {/* Add other components like MapList, BuildOrder, and EnemyTimings here */}
        </div>
    );
}

export default App;
