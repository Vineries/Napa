import React from 'react';
import {
    Link
} from 'react-router-dom';

export default class MobileSearchNavBar extends React.Component {
    render() {
        return (
            <div className="ui menu winery-search-nav" style={{ margin: "0px" }}>
                <div className="header item">
                    <Link to="/">Home</Link>
                </div>
                <div className="right menu desktop-hidden">
                    <div className="item" onClick={this.props.toggleMap}>
                        {
                            this.props.map &&
                            <span>List</span>
                        }
                        {
                            !this.props.map &&
                            <span>Map</span>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

