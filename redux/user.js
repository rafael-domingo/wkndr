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
        deleteDestination: (state, action) => {
            const { tripId, wkndrId, time } = action.payload 
            const tripListArray = state.tripList.map(trip => {
                if (trip.tripId !== tripId) {
                    return trip
                }
                else {
                    const updatedDestinations = trip.destinations[time].filter(item => {
                        // need to extract the 'activity' key
                        for (var key in item) {
                            if (item[key].wkndrId !== wkndrId) {
                                return item
                            } else {
                                return
                            }
                        }
                    })                    
                    return {
                        ...trip,
                        destinations: {
                            ...trip.destinations,
                            [time]: updatedDestinations
                        }
                    }
                }
                
            })
            updateFirestore(tripListArray, state.user.uid)
            return {
                ...state,
                tripList: tripListArray
            }
        },
        resetUserState: () => initialState
    }
})

export const {
    setUserState,
    resetUserState,
    setUser,
    setTripList,
    deleteDestination,
    addTrip
} = userSlice.actions;

export default userSlice.reducer