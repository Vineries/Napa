import React from 'react';
import {
    Link
} from 'react-router-dom';

function NavBar() {
    return (
        <div className="ui menu" style={{margin:"0px"}}>
            <div className="header item">
                <Link to="/">Home</Link>
            </div>
        </div>
    );
}

export default NavBar;
