import React from 'react';

class Handshake extends React.Component {
    constructor(props) {
        super(props);
        this.state = { result: "Loading..." };
    }

    componentWillMount() {
        fetch("/handshake").then(x => {
        }).catch(x => {
            throw x;
        })
    }
    render(){
        return (<div></div>)
    }
}

export default Handshake;
