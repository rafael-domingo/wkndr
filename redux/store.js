import { configureStore, } from '@reduxjs/toolkit';
import userReducer from './user';
import tripBuilderReducer from './tripBuilder';

export default configureStore({
    reducer: {
        user: userReducer,
        tripBuilder: tripBuilderReducer,
    },
})