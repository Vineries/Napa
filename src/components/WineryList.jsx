import React from 'react'
import WineryListItem from './WineryListItem'

import {
    Item,
    Card
} from 'semantic-ui-react';

export default class WineryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        if (this.props.grid) {
            return (
                <Card.Group>
                    {this.props.wineries.map((res, i) => {
                        return (<WineryListItem
                            grid={this.props.grid}
                            key={res._id}
                            selectedItem={this.state.selectedItem}
                            item={res}
                            history={this.props.history}
                            date={this.props.date}
                            guests={this.props.guests}
                            onListItemClicked={this.onListItemClicked} />)
                    })}
                </Card.Group>
            )
        } else {
            return (
                <Item.Group divided>
                    {this.props.wineries.map((res, i) => {
                        return (<WineryListItem
                            grid={this.props.grid}
                            key={res._id}
                            selectedItem={this.state.selectedItem}
                            item={res}
                            history={this.props.history}
                            date={this.props.date}
                            guests={this.props.guests}
                            onListItemClicked={this.onListItemClicked} />)
                    })}
                    {this.props.wineries.map((res, i) => {
                        return (<WineryListItem
                            grid={this.props.grid}
                            key={res._id}
                            selectedItem={this.state.selectedItem}
                            item={res}
                            history={this.props.history}
                            date={this.props.date}
                            guests={this.props.guests}
                            onListItemClicked={this.onListItemClicked} />)
                    })}
                    {this.props.wineries.map((res, i) => {
                        return (<WineryListItem
                            grid={this.props.grid}
                            key={res._id}
                            selectedItem={this.state.selectedItem}
                            item={res}
                            history={this.props.history}
                            date={this.props.date}
                            guests={this.props.guests}
                            onListItemClicked={this.onListItemClicked} />)
                    })}
                    {this.props.wineries.map((res, i) => {
                        return (<WineryListItem
                            grid={this.props.grid}
                            key={res._id}
                            selectedItem={this.state.selectedItem}
                            item={res}
                            history={this.props.history}
                            date={this.props.date}
                            guests={this.props.guests}
                            onListItemClicked={this.onListItemClicked} />)
                    })}
                    {this.props.wineries.map((res, i) => {
                        return (<WineryListItem
                            grid={this.props.grid}
                            key={res._id}
                            selectedItem={this.state.selectedItem}
                            item={res}
                            history={this.props.history}
                            date={this.props.date}
                            guests={this.props.guests}
                            onListItemClicked={this.onListItemClicked} />)
                    })}
                </Item.Group>
            )
        }
    }
}