import React from 'react';

import { Button, Form } from 'semantic-ui-react';

import { enUS } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

import Plus from '../img/plus.png';
import Minus from '../img/minus.png';

import Autocomplete from 'react-google-autocomplete';

import {
    getDate,
    getGuests,
    getLocation,
    getWineryId
} from '../redux/bookingSelectors';
import bookingActions from '../redux/bookingActions';

import { connect } from 'react-redux';
import store from '../redux/store';

class FilterBar extends React.Component {
    submit = (event) => {
        event.preventDefault();
        this.props.onSearch(this.props.location, { guests: this.props.guests, date: this.props.date });
    };

    incGuests = () => {
        if (parseInt(this.props.guests) >= 19) {
            this.props.setGuests({}, { value: 19 })
        } else {
            this.props.setGuests({}, { value: (parseInt(this.props.guests) + 1).toString() })
        }
    }

    decGuests = () => {
        if (parseInt(this.props.guests) > 1) {
            this.props.setGuests({}, { value: (parseInt(this.props.guests) - 1).toString() })
        }
    }

    styles = {
        imgButton: {
            height:"35px",
            width:"35px",
            display:"flex",
            alignSelf: "center",
            cursor: "pointer",
        }
    }

    render() {
        return (
            <Form
                className="ui filter-bar"
                onSubmit={this.submit}
                autoComplete='off'
                style={{ ...this.props.style, display: "inline-flex" }}>
                <Form.Group>
                    <Button onClick={this.props.controllers.toggleMap}>map</Button>
                    <Button onClick={this.props.controllers.toggleGrid}>grid</Button>
                    <Form.Field>
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
                    <Form.Field>
                        <DatePicker date={this.props.date} onDateChange={this.props.setDate} locale={enUS} format='dd/MM'>
                            {({ inputProps, focused }) => (
                                <input
                                    className={'input' + (focused ? ' -focused' : '')}
                                    {...inputProps} />
                            )}
                        </DatePicker>
                    </Form.Field>
                    <img src={Minus} onClick={this.decGuests} style={this.styles.imgButton} />
                    <h4 style={{ margin: "0px 5px" }}>{this.props.guests}</h4>
                    <img src={Plus} onClick={this.incGuests} style={this.styles.imgButton} />
                    <Button>search</Button>
                </Form.Group>

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
)(FilterBar);