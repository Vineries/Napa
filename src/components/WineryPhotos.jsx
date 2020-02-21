import React from 'react'

export default class Wine extends React.Component {
    render() {
        return (
            <div className="winery-photo-viewer">
                {
                    this.props.pictures.map(x => {
                        return (<img key={x} alt={`${x.name} wine`} src={process.env.REACT_APP_API_URL + "/winery/photo/" + x} />)
                    })
                }
            </div>
        )
    }
}