// npm i react-redux @reduxjs/toolkit
import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './movieSlice'

const store = configureStore({ //창고
    reducer: {//창고지기 
        movies: movieReducer
    }
})

export default store