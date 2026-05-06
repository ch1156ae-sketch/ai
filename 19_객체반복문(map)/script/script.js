$(function () {
    // 서버에서 영화 data 가져오는 배열 변수
    let movieData = [];

    // 이미지 기본 주소
    let imgurl = "https://image.tmdb.org/t/p/original";

    // API 서버에 data를 요청해서 JSON 형식으로 가져오는 함수
    const getMovieData = async () => {
        let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=89cd17cad7e22c215ad4f71512bb1452&language=ko-KR&page=1&region=KR`;

        console.log(url);

        let response = await fetch(url);
        let data = await response.json();

        console.log(data);

        // 실제 영화 목록 배열
        movieData = data.results;

        console.log(movieData);

        render();
    };

    // card UI 반복문 함수
    const render = () => {
        let movieCard = "";

        movieData.map((item) => {
            movieCard += `
                <li>
                    <a href="#">
                        <div class="imgbox">
                            <img
                                src="${imgurl}${item.poster_path}"
                                alt="${item.title}"
                            />
                        </div>
                        <div class="txtbox">
                            <h3>${item.title}</h3>
                            <p>
                                <span>평점:${item.vote_average}</span>
                                <span>개봉일:${item.release_date}</span>
                            </p>
                            <div class="btn_wrap">
                                <button class="btn_like">♡${item.vote_count}</button>
                                <button class="btn_date">예매</button>
                                <button class="btn_cinema">CINEMA</button>
                            </div>
                        </div>
                    </a>
                </li>
            `;
        });

        // HTML의 <ul id="list"> 안에 카드 넣기
        $("#list").html(movieCard);
    };

    getMovieData();
});
