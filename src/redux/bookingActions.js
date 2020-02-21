import { SET_DATE, SET_GUESTS, SET_LOCATION, SET_WINERY_ID } from "./actionTypes";

const setDate = (date, b) => {
    return ({
        type: SET_DATE,
        payload: {
            date
        }
    });
}

const setGuests = (_, event) => {
    var guests = event.value;
    return ({
        type: SET_GUESTS,
        payload: {
            guests
        }
    });
}

const incGuests = (state) => {
    console.log(state);
    var guests = 1
    return ({
        type: SET_GUESTS,
        payload: {
            guests
        }
    });
}

const decGuests = (state) => {
    console.log(state);
    var guests = 1
    return ({
        type: SET_GUESTS,
        payload: {
            guests
        }
    });
}


const setLocation = (a, b) => {
    var location;
    if (!b) {
        location = a.target.value
        return ({
            type: SET_LOCATION,
            payload: {
                location
            }
        });
    } else {
        location = b.formatted_address;
        return ({
            type: SET_LOCATION,
            payload: {
                location
            }
        });
    }
}

const setWineryId = wineryId => ({
    type: SET_WINERY_ID,
    payload: {
        wineryId
    }
});

export default {
    setDate: setDate,
    setGuests: setGuests,
    setLocation: setLocation,
    setWineryId: setWineryId,
    incGuests: incGuests,
    decGuests: decGuests
}