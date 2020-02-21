import React from 'react'

export default class Wine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wine: {}
        }
        fetch(process.env.REACT_APP_API_URL + "/wine/" + props.wine_id)
            .then(x => x.json())
            .then((wine) => {
                this.setState({ wine: wine })
            })
    }
    render() {
        return (
            <div className='wine'>
                <div className='wine-img' style={{ background: `url(${process.env.REACT_APP_API_URL + "/winery/photo/" + this.state.wine.thumbnail})` }}></div>
                <h3 className="wine-title">{this.state.wine.name}</h3>
                <span className="wine-type">{this.state.wine.category}</span>
            </div>
        )
    }
}