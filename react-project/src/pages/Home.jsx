import React, { useEffect, useState } from 'react'
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import MovieSlice, {
  getPopularMovies,
  getTopRatedMovies,
  getUpComingMovies
} from '../redux/movieSlice';
import Banner from '../components/Banner';

// 스피너
import PuffLoader from "react-spinners/PuffLoader";

import MovieSlide from '../components/MovieSlide';

const Home = () => {

  // 기존에 있던 session Movie를 지워버릴거임!
  sessionStorage.removeItem('movie');
  
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upComingMovies }
    = useSelector(state => state.movies);

  // 스피너 상태 저장
  const [loading, setLoading] = useState(true)

  /* 화면이 렌더링 되자마자, API를 가져올 것 */
  useEffect(() => {
    const popularApi = axios.get('/popular?language=ko-KR&page=1');
    const topRatedApi = axios.get('/top_rated?language=ko-KR&page=1');
    const upComingApi = axios.get('/upcoming?language=ko-KR&page=1');

    // Promise.all을 사용하여 여러 번의 API요청을 병렬로 처리 
    Promise
      .all([popularApi, topRatedApi, upComingApi])
      .then(res => {
        console.log('res', res)

        // API에서 받아온 데이터를 store 안에 넣고싶음! => useDispatch
        dispatch(getPopularMovies(res[0].data));
        dispatch(getTopRatedMovies(res[1].data));
        dispatch(getUpComingMovies(res[2].data));

      })
      .then(() => {
        setLoading(false)
      })
      ;

  }, [])

  //  store에 값이 잘 들어갔는지 확인해보는 용도
  useEffect(() => {
    console.log('store의 상태', popularMovies, topRatedMovies, upComingMovies)
  }, [popularMovies, topRatedMovies, upComingMovies])

  // 스피너
  if (loading) {
    return (
      <PuffLoader
        color="#ffffff"
        loading={loading}
        size={150}
        speedMultiplier={1}
      ></PuffLoader>
    )
  }
  return (
    <div>
      {/* LifeCycle 생명주기 - 컴포넌트
      - poppularMovies라는 애가 존재하면? -> result
      - 존재하지 않는다면 배너 띄울필요 x 
    */}
      {/* 로딩스피너를 만들면 데이터가 안왔을 때는 
      로딩만 리턴이 되기 때문에 
      별도로 조건부 처리를 해 줄 필요가 없다. */}

      {popularMovies.results &&
        <Banner data={popularMovies.results[8]
        } />}

      <p>Popular Movies</p>
      {/* 카드슬라이드 */}
      <MovieSlide movies={popularMovies} type="popularMovies" />

      <p>TopRated Movies</p>
      {/* 카드슬라이드 */}
      <MovieSlide movies={topRatedMovies} type="topRatedMovies" />

      <p>UpComing Movies</p>
      {/* 카드슬라이드 */}
      <MovieSlide movies={upComingMovies} type="upComingMovies" />
    </div>
  )
}

export default Home