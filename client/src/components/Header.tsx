import React from 'react';

import '../scss/Header.scss'

class Header extends React.Component {
    render() {
        return (
            <div className="headerMain">
                <p className="appTitle">NewsPortal</p>
            </div>
        )
    }
}

export default Header;