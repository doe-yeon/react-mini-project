import React from 'react'

const Banner = (props) => {
    // console.log('Banner 컴포넌트로 받아온 props(url):', props.data)
    const url = 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces' + props.data.poster_path
    return (
        <div className='banner-box'>
            {/* 배너 이미지를 포스터로 띄우고, 그 위에 제목, overview */}
            <div className='banner-img'
                style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${props.data.poster_path})` }}>
                {/* <img src={url} style={{ width: '100%' }}></img> */}
            </div>
            <div className='banner-item'>
                <h3>{props.data.title}</h3>
                <p>{props.data.overview}</p>
            </div>
        </div>
    )
}

export default Banner