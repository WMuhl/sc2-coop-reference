import React from 'react';
import './App.css';
import CommanderList from './components/CommanderList';
import MapList from "./components/MapList";

const App: React.FC = () => {
    return (
        <div className="App container-fluid">
            <h1>Starcraft 2 Co-op Reference</h1>
            <small>Big thanks to <a href="https://starcraft2coop.com/">https://starcraft2coop.com/</a> for all the awesome resources, this is for reference only. Check out their site for more in-depth information.</small>
            <br/>
            <small>Built using Reactjs and PicoCSS. Head to the <a href="https://github.com/waltiplayer/sc2-coop-reference">GitHub page</a> if you want to submit additions or corrections.</small>
            <hr/>
            <div className="grid">
                <CommanderList/>
                <MapList/>
            </div>
        </div>
    );
}

export default App;
