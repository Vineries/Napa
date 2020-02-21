import React from 'react'
import ImageMasthead from '../components/ImageMasthead';
import WineList from '../components/WineList';
import IndexSearchBox from '../components/IndexSearchBox';
import WineryPhotos from '../components/WineryPhotos';

import "./Winery.css"

class Winery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            winery: {},
            wines: [],
        };
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + "/winery/" + this.props.match.params.id)
            .then(x => x.json())
            .then(x => {
                this.setState({
                    loading: false,
                    winery: x[0],
                    wines: x[0].wines
                });
            });
    }

    render() {
        if (this.state.loading) {
            return (<div>
                Loading...
            </div>)
        } else {
            return (<div>
                <ImageMasthead url={process.env.REACT_APP_API_URL + "/winery/photo/" + this.state.winery.photos[0]} {...this.props} />
                <br />
                <div className="ui container winery-description">
                    <div className='left-info'>
                        <WineryPhotos pictures={this.state.winery.photos} />
                        <h1>
                            {this.state.winery.name}
                        </h1>
                        <h2>
                            {this.state.winery.address} {this.state.winery.region}
                        </h2>
                        <br />
                        {this.state.winery.address1}
                        <br />
                        {this.state.winery.address2}
                        <br />
                        {this.state.winery.phone}
                        <br />
                        {this.state.winery.email}
                        <br />
                        <WineList wines={this.state.wines} />
                    </div>
                    <div className='ui section right-booking'>
                        <IndexSearchBox wineryInfo={{ id: this.state.winery._id, name: this.state.winery.name }} history={this.props.history} date={this.state.date} guests={this.state.guests} method={`/Booking/${this.state.winery._id}`} />
                    </div>
                </div>
            </div>)
        }
    }
};

export default Winery;