import React from 'react';

import '../scss/App.scss';
import HomePage from './HomePage';

class App extends React.Component {
    render() {
        return(
            <div className="wrapper">
                <HomePage />
            </div>
        )
    }
}

export default App;