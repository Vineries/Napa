import React from 'react'
import {
    Item,
    Card,
    Image
} from 'semantic-ui-react';

class WineryListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true }
    }

    loadingTask = () => {
        this.setState({ isLoading: false });
    }

    selectWinery = () => {
        this.props.history.push("/Winery/" + this.props.item._id)
    }

    moveTo = (item) => {
        const args = {
            lat: item.location.coordinates[1],
            lng: item.location.coordinates[0],
            _id: item._id
        };
        this.props.onHover(args);

    }

    onListItemClicked = this.props.onListItemClicked;

    render() {
        /*
        return (
            <div className="ui item winery-list-item" style={!this.props.grid ? { } : { marginTop: "10px",gridTemplateColumns: "auto", height:"400px" }} onClick={this.selectWinery}>
                <div className={this.props.grid ? "ui image" : "list-image"} style={{width:"100%", height:"100%", background:`url(${process.env.REACT_APP_API_URL + "/winery/photo/" + this.props.item.photos[0]})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
                </div>
                {
                    !this.props.grid &&
                    <div className="content">
                        <p className="header">{this.props.item.name}</p>
                        <div className="meta">
                            <span>{this.props.item.address}</span>
                        </div>
                        <div className="description">
                            <p>{this.props.item.phone}</p>
                        </div>
                        <div className="extra">
                            Additional Details
                        </div>
                    </div>
                }
            </div>
        );
        */
       if (this.props.grid) {
        return (
            <Card onClick={this.selectWinery}>
                <Image src={process.env.REACT_APP_API_URL + "/winery/photo/" + this.props.item.photos[0]} />
            </Card>
        )

       } else {
        return (
            <Item onClick={this.selectWinery}>
                <Item.Image src={process.env.REACT_APP_API_URL + "/winery/photo/" + this.props.item.photos[0]} />
                <Item.Content>
                    <Item.Header as='a'>{this.props.item.name}</Item.Header>
                    <Item.Meta>{this.props.item.address}</Item.Meta>
                    <Item.Description>
                        <span>{this.props.item.address}</span>
                        <span>{this.props.item.phone}</span>
                    </Item.Description>
                    <Item.Extra><span>{this.props.item.address}</span></Item.Extra>
                </Item.Content>
            </Item>
        )
       }
    }
}

export default WineryListItem;