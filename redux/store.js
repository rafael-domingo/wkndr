import { configureStore, } from '@reduxjs/toolkit';
import tripBuilderReducer from './tripBuilder';

export default configureStore({
    reducer: {
        tripBuilder: tripBuilderReducer,
    },
})