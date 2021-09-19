import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userName: '',
    userPicture: '',
    userId: '',
    tripList: [
        {
            cityName: 'Los Angeles, CA, USA',                
            coordinates: {
                lat: 34.0522,
                lng: -118.2437
            },
            autoBuild: {

            },
            destinations: {

            },
            tripBuilder: {
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
        },
        {
            cityName: 'New York City, NY, USA',
            coordinates: {
                lat: 40.7128,
                lng: -74.0060
            },
            destinations: {

            },
            tripBuilder: {
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
        },
        {
            cityName: 'Austin, TX, USA',
            coordinates: {
                lat: 30.2672,
                lng: -97.7431
            },
            destinations: {

            },
            tripBuilder: {
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
        }
    ]
}

export const userSlice = createSlice({
    name: 'User',
    initialState: initialState,
    reducers: {
        setUserState: (state, action) => {
            state = {...action.payload}
            return state
        },
        resetUserState: () => initialState
    }
})

export const {
    setUserState,
    resetUserState
} = userSlice.actions;

export default userSlice.reducer