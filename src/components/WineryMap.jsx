import React from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

class WineryMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wineries: this.props.wineries,
            selectedItem: this.props.selectedItem,
            center: this.props.center,
            zoom: 14
        }
    }
    showWindow = true;

    onMarkerClick = this.props.onMarkerClick;

    render() {
        var bounds = new this.props.google.maps.LatLngBounds();
        bounds.extend(this.props.center);
        for (var i = 0; i < this.props.wineries.length; i++) {
            try {
                bounds.extend({ lat: this.props.wineries[i].location.coordinates[1], lng: this.props.wineries[i].location.coordinates[0] });
            } catch (err) {

            }
        }
        return (
            <Map
                google={this.props.google}
                zoom={14}
                onIdle={this.props.onBoundsChanged}
                onZoomChanged={this.changeZoom}
                initialCenter={this.props.center}>
                {
                    this.props.wineries
                        .map(x => {
                            return (<Marker
                                key={x._id}
                                onClick={this.props.onMarkerClick}
                                name={x.name}
                                position={{ lng: x.location.coordinates[0], lat: x.location.coordinates[1] }} />);
                        })
                }
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_KEY)
})(WineryMap);