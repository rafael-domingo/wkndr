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
            const { tripId, cityName, coordinates, destinations, tripBuilder, tripName } = action.payload
            state.tripList.push({
                tripId, tripId,
                tripName: tripName,
                cityName: cityName,
                coordinates: coordinates,
                destinations: destinations,
                tripBuilder: tripBuilder                
            })
            updateFirestore(state.tripList, state.user.uid)
        },        
        deleteTrip: (state, action) => {
            const { tripId } = action.payload
            const newTripList = []
            state.tripList.map(trip => {
                if (trip.tripId !== tripId) {
                    newTripList.push(trip)
                } 
            })
            
            updateFirestore(newTripList, state.user.uid)
            return {
                ...state,
                tripList: newTripList
            }
        },
        updateDestinationsList: (state, action) => {
            const { tripId, newList, tripBuilder } = action.payload
            const tripListArray = state.tripList.map(trip => {
                if (trip.tripId !== tripId) {
                    return trip
                } else {
                    return {
                        ...trip,
                        destinations: newList,
                        tripBuilder: tripBuilder
                    }
                }
            })
            updateFirestore(tripListArray, state.user.uid)
            return {
                ...state,
                tripList: tripListArray
            }
        },
        updateTripName: (state, action) => {
            const { tripName, tripId } = action.payload
            const tripListArray = state.tripList.map(trip => {
                if (trip.tripId !== tripId) {
                    return trip
                } else {
                    return {
                        ...trip,
                        tripName: tripName
                    }
                }
            })
            updateFirestore(tripListArray, state.user.uid)
            return {
                ...state,
                tripList: tripListArray
            }
        },
        deleteDestination: (state, action) => {
            const { tripId, wkndrId } = action.payload             
            const tripListArray = state.tripList.map(trip => {
                if (trip.tripId !== tripId) {
                    return trip
                }
                else {
                    const updatedDestinations = trip.destinations.filter(item => {
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
                        destinations: updatedDestinations
                    }
                }
                
            })
            updateFirestore(tripListArray, state.user.uid)
            return {
                ...state,
                tripList: tripListArray
            }
        },
        addDestination: (state, action) => {
            const { tripId, newDestination } = action.payload  
            // define new location as user-selected
            const location = {
                user: newDestination
            }            
            const tripListArray = state.tripList.map(trip => {
                if (trip.tripId !== tripId) {
                    return trip
                }
                else {
                    const updatedDestinations = trip.destinations
                    updatedDestinations.push(location)              
                    return {
                        ...trip,  
                        destinations: updatedDestinations                      
                    }
                }
            })            
            updateFirestore(tripListArray, state.user.uid)        
        },
        resetUserState: () => initialState
    }
})

export const {
    setUserState,
    resetUserState,
    setUser,
    setTripList,
    updateDestinationsList,
    updateTripName,
    deleteDestination,
    addDestination,
    addTrip,
    deleteTrip
} = userSlice.actions;

export default userSlice.reducer