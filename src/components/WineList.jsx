import React from 'react'
import Wine from './Wine'

export default class WineList extends React.Component {
    render() {
        return (
            <div className="winery-grid">
                {
                    this.props.wines.map(x => {
                        return <Wine key={Math.random()} wine_id={x}></Wine>
                    })
                }
            </div>
        )
    }
}