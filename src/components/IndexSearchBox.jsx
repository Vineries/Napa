import React from 'react';
import { enUS } from 'date-fns/locale'
import { DatePicker  } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import Autocomplete from 'react-google-autocomplete';

import { connect } from 'react-redux';

import store from '../redux/store';
import {
    getDate,
    getLocation,
    getGuests,
    getWineryId
} from '../redux/bookingSelectors';

import {
    Form,
    Header
} from 'semantic-ui-react';

import bookingActions from '../redux/bookingActions';

class IndexSearchBox extends React.Component {
    options = ["1", "2", "3", "4", "5+"].map(x => { return { text: x, value: x } });

    submit = (event) => {
        event.preventDefault();
        if(this.props.index) {
            this.props.history.push(`${this.props.method}?location=${this.props.location}&date=${this.props.date}&guests=${this.props.guests}`)
        } else {
            this.props.history.push(`${this.props.method}?selectedWinery=${this.props.wineryInfo._id}&date=${this.props.date}&guests=${this.props.guests}`)
        }
    };

    render() {
        console.log(store.getState())
        return (
            <Form className="ui container" onSubmit={this.submit} autoComplete='off' style={this.props.style}>
                <Header as='h1' dividing>Find your next tasting.</Header>
                {
                    this.props.index &&
                    <Form.Field>
                        <label>Where</label>
                        <Autocomplete
                            type="text"
                            id="location"
                            name="location"
                            onPlaceSelected={(place) => {
                                this.props.setLocation({}, place);
                            }}
                            value={this.props.location}
                            onChange={this.props.setLocation}
                            types={['(regions)']}
                        />
                    </Form.Field>
                }
                {
                    !this.props.index &&
                    <Form.Field>
                        <label>Where</label>
                        <Form.Input
                            value={this.props.wineryInfo.name}
                            onChange={this.props.setLocation}
                            disabled
                        />
                    </Form.Field>
                }
                <Form.Field>
                    <label>When</label>
                    <DatePicker date={this.props.date} onDateChange={this.props.setDate} locale={enUS}>
                        {({ inputProps, focused }) => (
                            <input
                                className={'input' + (focused ? ' -focused' : '')}
                                {...inputProps}
                            />
                        )}
                    </DatePicker>
                </Form.Field>
                <Form.Field>
                    <label>Guests</label>
                    <Form.Dropdown
                        name="guests"
                        placeholder="Guests"
                        options={this.options}
                        value={(["1","2","3","4","5+"].includes(this.props.guests)?this.props.guests:"5+")}
                        onChange={this.props.setGuests}
                        fluid selection />
                </Form.Field>
                <Form.Button color={"purple"} floated={"right"}>{this.props.index?"Search":"Book Now!"}</Form.Button>
            </Form>
        );
    };
}

const mapStateToProps = state => {
    var date = getDate(store);
    var guests = getGuests(store);
    var location = getLocation(store);
    var wineryId = getWineryId(store);
    return {
        date: date,
        guests: guests,
        location: location,
        wineryId: wineryId
    };
};

export default connect(
    mapStateToProps,
    bookingActions
)(IndexSearchBox);