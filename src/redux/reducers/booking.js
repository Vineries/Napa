import { SET_DATE, SET_GUESTS, SET_LOCATION, SET_WINERY_ID, SET_SELECTED_WINERY } from "../actionTypes";

const initialState = {
    date: new Date(),
    guests: "2",
    location: "Ottawa, ON",
    winery_id: ""
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_DATE:
            {
                const { date } = action.payload;
                return {
                    ...state,
                    date: date
                };
            }
        case SET_GUESTS:
            {
                const { guests } = action.payload;
                return {
                    ...state,
                    guests: guests
                };
            }
        case SET_LOCATION:
            {
                const { location } = action.payload;
                return {
                    ...state,
                    location: location
                };
            }
        case SET_WINERY_ID:
            {
                const { winery_id } = action.payload;
                return {
                    ...state,
                    winery_id: winery_id
                };
            }
        default:
            return state;
    }
}