import firebase from './Firebase';

export const updateFirestore = (tripList, uid) => {
    console.log('firestore')
    try {
        console.log('try firestore')
        const dbh = firebase.firestore();

        dbh.collection('tripList').doc(uid).set({tripList: tripList})
        .catch(error => console.log(error))
    } catch (error) {
        console.log('firestore error')
        console.log(error)
        return
    }
    
}

export const getFirestore = async (uid) => {
    console.log('get firestore')
    try {
        console.log('try get firestore')
        const result = await firebase.firestore().collection('tripList').doc(uid).get().then((doc) => {
            if (doc.exists) {
                console.log('doc exists')
                return doc.data()
            } else {
                console.log('new user')      
                return 'new user'        
            }
        })
        return result
    } catch (error) {
        console.log(error)
        return
    }
}