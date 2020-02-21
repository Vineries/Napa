import React from 'react';
import bookingActions from '../redux/bookingActions';

import { enUS } from 'date-fns/locale';
import { DatePickerCalendar } from 'react-nice-dates';

import { connect } from 'react-redux';
import { Input, Form } from 'semantic-ui-react';

import store from '../redux/store';
import {
    getDate,
    getLocation,
    getGuests,
    getWineryId
} from '../redux/bookingSelectors';

import './Booking.css';

class Booking extends React.Component {
    constructor(props) {
        super(props);
        var search = window.location.search.substring(1);
        this.state = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
        console.log(this.props);
    }

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

    render() {
        return (
            <div className='booking-page'>
                <Form>
                    <div className="location">
                        <Form.Group>
                            <Input value={this.props.match.params.id} onChange={this.props.setLocation} />
                        </Form.Group>
                    </div>
                    <div className="date">
                    <DatePickerCalendar date={this.props.date} onDateChange={this.props.setDate} locale={enUS} format='dd/MM'>
                            {({ inputProps, focused }) => (
                                <input
                                    className={'input' + (focused ? ' -focused' : '')}
                                    {...inputProps} />
                            )}
                        </DatePickerCalendar>                    </div>
                    <div className="people">
                        <Form.Group>
                            <Form.Button onClick={this.decGuests}>-</Form.Button>
                            <h4 style={{ margin: "0" }}>{this.props.guests}</h4>
                            <Form.Button onClick={this.incGuests}>+</Form.Button>
                        </Form.Group>
                    </div>
                    <div className="requests">

                    </div>
                </Form>
            </div>
        )
    }
};

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
)(Booking);