import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';
import { useState } from 'react'
import { Badge } from 'react-bootstrap';
import axios from '../axios';


const MovieDetail = () => {
    // useParams
    // Route 작성하는 부분에 /:id <-path 작성해둠, 이 path를 적어주면된다!
    const { id } = useParams()

    // useSearchParams
    //url을 작성하는 부분에 ?type= 어쩌구저쩌구
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type')

    // console.log(`id = ${id},  type = ${type}`)

    // redux에 있는 데이터 가지고 옴
    const { popularMovies, topRatedMovies, upComingMovies }
        = useSelector(state => state.movies);

    const [movie, setMovie] = useState()

    const [review, setReview] = useState([])

    const getReviewData = () => {
        axios.get(`/${id}/reviews`).then(res => setReview(res.data.results))
    }
    /**내가 가져올 영화에 대한 데이터를 추출하는 함수 */
    const getMovieData = () => {
        if (type === 'popularMovies') {
            setMovie(popularMovies.results.find(item => item.id == id))
        } else if (type === 'topRatedMovies') {
            setMovie(topRatedMovies.results.find(item => item.id == id))
        } else {
            setMovie(upComingMovies.results.find(item => item.id == id))
        }
        // console.log("무비임" + movie)
    }

    useEffect(() => {
        // console.log('현재movie', movie)
        if (movie) {
            //movie라는 state에 새로운 값이 들어가면 그 값을 sessionStorage안에 저장
            sessionStorage.setItem('movie', JSON.stringify(movie))
            getReviewData()
        }
    }, [movie])

    // redux의 값이 가지고와졌을떄 
    useEffect(() => {
        // 세션 안에 값이 존재하면 (이미 클릭한 전적) => 세션 안에 있는 값을 movie 세팅
        const sessionMovie = JSON.parse(sessionStorage.getItem('movie'))
        // console.log('sessionMovie', sessionMovie)
        if (sessionMovie) {
            setMovie(sessionMovie)
        } else {
            // 세션 안에 값이 없다면 (최초 클릭) => Redux로 가서 movie 세팅
            getMovieData()
        }
        // getMovieData()
    }, [popularMovies,
        topRatedMovies,
        upComingMovies,
        id,
        type])


    return (
        <div className='movie-detail'>
            {movie &&
                <div className='movie-box'>
                    <div className='detail-poster'
                        style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path})` }}>
                        {/* <img src={movieImg} width={'30%'} height={'30%'}></img> */}
                    </div>
                    <div className='detail-item'>
                        <div>{movie.adult
                            ? <Badge bg="danger">청소년관람불가</Badge>
                            : <Badge bg="success">전체관람가</Badge>
                        }</div>
                        <h1>{movie.title}</h1>
                        <div>
                            <span>평점 : {movie.vote_average}점</span>
                            <span>개봉일 : {movie.release_date}</span>
                        </div>
                        <div>{movie.overview}</div>
                    </div>
                    <div>
                        <h2>Review</h2>
                        {review.length === 0
                            ? <p>등록된 리뷰가 없습니다.</p>
                            : (
                                review.map(item =>
                                    <div key={item.id}>
                                        <hr />
                                        <p>{item.content}</p>
                                        <p>
                                            작성자 : {item.author}
                                            작성일 : {item.created_at}
                                        </p>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default MovieDetail