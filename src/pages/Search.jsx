import React from 'react';
import Navbar from '../components/Navbar'

import WineryList from '../components/WineryList'
import WineryMap from '../components/WineryMap'
import FilterBar from '../components/FilterBar'
import Geocode from "react-geocode";
import "./Search.css"

import MobileSearchNavBar from '../components/MobileSearchNavBar';

class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        var search = this.props.location.search.substring(1);
        this.state = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
        this.state.geo = false;
        this.state.search = false;
        this.state.grid = false;
        this.state.map = false;
        this.state.search_results = []
    }

    componentDidMount() {
        this.geoLocate(this.state.location, this.state)

        this.setState({ selectedItem: {} })
        setTimeout(() => {
            if(!this.state.search) {
                alert("Timeout");
                this.props.history.push("/");
            }
        },5000)
    }

    geoLocate = (location, args) => {
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
        Geocode.enableDebug();
        Geocode.fromAddress(decodeURIComponent(location.replace(/[+]/g, "%20"))).then(
            response => {
                this.setState({ center: response.results[0].geometry.location })
                console.log({...args, center: response.results[0].geometry.location})
                if (this.state.bounds){
                    this.doSearch({...args, bounds: this.state.bounds})
                } else {
                    this.doSearch({...args, center: this.state.center})
                }
            }
        ).catch(err => {
            console.error(err);
        })
    }

    onMarkerClick = (item) => {
        this.setState({ selectedItem: item })
    };

    doSearch = (data) => {
        fetch(process.env.REACT_APP_API_URL + "/winery/search", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    this.setState({ search_results: res.data, search: true })
                } else {
                console.error(res.err_msg);
                this.setState({ search: true })
                }   
            }).catch(err => {
                console.error(err);
            })
    }

    wineryListItemHover = (args) => {
        this.setState({
            selectedItem: args._id
        })
    }

    boundsChanged = (_, map) => {
        this.setState({
            center: {
                lat: map.center.lat(),
                lng: map.center.lng()
            },
            bounds: map.getBounds()
        });
        this.doSearch(this.state);
    }

    toggleGrid = () => {
        this.setState({
            grid: !this.state.grid
        })
    }

    toggleMap = () => {
        this.setState({
            map: !this.state.map
        })
    }

    controllers = {
        toggleMap: this.toggleMap,
        toggleGrid: this.toggleGrid
    }

    render() {
        if (!this.state.search && !this.state.geo) {
            return (
                <div className="winery-search-div">
                    <Navbar />
                    <div className="middle-loader">
                        <div className="inner-loader">
                            <div className="ui active centered inline loader"></div>
                            <h3>Looking for wineries in</h3>
                            <h3>{decodeURIComponent(this.state.location.replace(/[+]/g, "%20"))}</h3>
                            <h3>on {new Date(decodeURIComponent(this.state.date.replace(/[+]/g, "%20"))).toDateString()}</h3>
                            <h3>for  {this.state.guests}  {(this.state.guests < 2) ? "person" : "people"}</h3>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="winery-search">
                    <MobileSearchNavBar/>
                    <div className={this.state.map ? "winery-search-inner map" : "winery-search-inner"}>
                        <FilterBar controllers={this.controllers} map={this.state.map} history={this.props.history} onSearch={this.geoLocate}  />
                        <div className="winery-search-left">
                            <WineryList wineries={this.state.search_results} grid={this.state.grid} date={this.state.date} guests={this.state.guests} history={this.props.history} />
                        </div>
                        <div className="winery-search-right">
                            <WineryMap
                                onBoundsChanged={this.boundsChanged}
                                selectedItem={this.state.selectedItem}
                                wineries={this.state.search_results}
                                center={this.state.center}
                                onMarkerClicked={this.onMarkerClick} />
                        </div>

                    </div>
                </div>
            );
        }
    }
}

export default SearchResults;
