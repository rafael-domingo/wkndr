import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cityName: '',
    coordinates: {
        lat: '',
        lng: ''
    },
    autoBuild: false,
    time: {
        morning: false,
        afternoon: false,
        evening: false,
    },
    transportation: '',
    activities: {
        coffee: false,
        food: false,
        shop: false, 
        drink: false, 
        thrifting: false, 
        landmarks: false, 
        zoos: false, 
        museums: false,
        hiking: false
    }
}

export const tripBuilderSlice = createSlice({
    name: 'TripBuilder',
    initialState: initialState,
    reducers: {
        setTripBuilder: (state, action) => {
            state = {...action.payload}
            return state
        },
        resetTripBuilder: () => initialState
    } 
})

export const { 
    setTripBuilder,
    resetTripBuilder
} = tripBuilderSlice.actions;

export default tripBuilderSlice.reducer