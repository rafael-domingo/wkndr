import { v4 as uuidv4 } from 'uuid';

export const Yelp = {
    async tripBuilder(tripState) {
        console.log(tripState)
        return fetch('https://us-central1-wkndr-326514.cloudfunctions.net/yelpTripBuilder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cityName: tripState.cityName,
                lat: tripState.coordinates.lat,
                lng: tripState.coordinates.lng,
                autoBuild: tripState.autoBuild,
                morning: tripState.time.morning,
                afternoon: tripState.time.afternoon,
                evening: tripState.time.evening,
                transportation: tripState.transportation,
                coffee: tripState.activities.coffee,
                food: tripState.activities.food,
                shop: tripState.activities.shop,
                drink: tripState.activities.drink,
                thrifting: tripState.activities.thrifting,
                landmarks: tripState.activities.landmarks,
                zoos: tripState.activities.zoos,
                museums: tripState.activities.museums,
                hiking: tripState.activities.hiking,
                utcOffset: tripState.utcOffset
            })
        }).then(response => response.json())
        .then(data => {            
            // format output from trip builder function into single-dimension array
            const destinationArray = [];
            data.map(subArray => {
                subArray.map(item => {
                    destinationArray.push(item)
                })                
            })
            // assign unique id to each destination to help with modifying trip later on
            destinationArray.map(object => {
                for (var key in object) {
                    object[key].wkndrId = uuidv4()
                }
                return object
            })
            return destinationArray
        })
        .catch(error => console.log(error))
    },

    autoComplete(term) {
        return fetch('https://us-central1-wkndr-326514.cloudfunctions.net/yelpAutoComplete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                term: term
            })
        }).then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error))

    },

    search(term, lat, lng) {
        return fetch('https://us-central1-wkndr-326514.cloudfunctions.net/yelpSearch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                term: term,
                lat: lat,
                lng: lng
            })
        }).then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error))

    },

    detail(id) {
        return fetch('https://us-central1-wkndr-326514.cloudfunctions.net/yelpDetail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        }).then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error))
    }
}