import { createSlice } from '@reduxjs/toolkit';
import { updateFirestore } from '../util/Firestore';

const initialState = {
    user: {},
    tripList: []
}

export const userSlice = createSlice({
    name: 'User',
    initialState: initialState,
    reducers: {
        setUserState: (state, action) => {
            state = {...action.payload}
            return state
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setTripList: (state, action) => {
            state.tripList = action.payload
        },
        addTrip: (state, action) => {
            const { tripId, cityName, coordinates, destinations, tripBuilder } = action.payload
            state.tripList.push({
                tripId, tripId,
                cityName: cityName,
                coordinates: coordinates,
                destinations: destinations,
                tripBuilder: tripBuilder                
            })
            updateFirestore(state.tripList, state.user.uid)
        },
        resetUserState: () => initialState
    }
})

export const {
    setUserState,
    resetUserState,
    setUser,
    setTripList,
    addTrip
} = userSlice.actions;

export default userSlice.reducer