import React from 'react';
import './Index.css';
import IndexSearchBox from '../components/IndexSearchBox'
import Handshake from '../components/Handshake'

function Index(props) {
    return (
        <div className="jumbo cover background">
            <Handshake />
            <div id="EntryField" className="hover ui box">
                <IndexSearchBox method="/Search" history={props.history} index={true} />
            </div>
        </div>
    )
};

export default Index;
