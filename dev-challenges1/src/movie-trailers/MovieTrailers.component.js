import React from 'react';
import './MovieTrailers.css';

import LazyLoad from "react-lazyload";

import {
    trailerData,
    languages
} from './MovieData';

const VideoPlayerId = "videoPlayer";
const MovieId = "movies";
const MovieTrailer = (props) => {
    let trailerUrl = props.movie.TrailerURL;
    trailerUrl = trailerUrl.replace('watch?v=', 'embed/');

    let genres = props.movie.EventGenre.split('|');

    return (
        <div className="movie-trailer">
            <div className="movie-trailer__content">
                <embed controls="controls" src={ trailerUrl } ></embed>
            </div>
            <div className="movie-trailer__details">
                <div className="movie-trailer__name">{ props.movie.EventTitle }</div>
                <div className="movie-trailer__language">{ props.movie.EventLanguage }</div>
                <div className="movie-trailer__genres">
                    {
                        genres.map((item) => {
                            return <span key={item}  className="movie-trailer__genre">{ item }</span>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

const MovieCard = (props) => {
    let eventShowTime = props.movie.ShowDate || "";
    eventShowTime = eventShowTime.replace(',', '');
    eventShowTime = eventShowTime.split(' ');
    
    // Get day and month
    let day = eventShowTime[0]
    let month = eventShowTime[1];

    let activeClass = props.runTrailer ? 'live' : '';
    return(
        <div id={ props.id }className={`movie-card inline-block ${ activeClass }`} onClick={ () => props.onMovieClick(props.movie) }>
            <video control="control" poster={`https://in.bmscdn.com/events/moviecard/${props.movie.EventImageCode}.jpg`}>
            </video>
            <div className="movie-card__loader clickable"></div>
            {
               day &&
               month &&
               <div className="movie-card__show-date">
                   <div>{day}</div>
                   <div>{month}</div>
               </div>   
            }
            {
                props.movie.wtsPerc > 0 &&
                props.movie.dwtsCount > 0 &&
                <div className="movie-card__response">
                    {
                        props.movie.wtsPerc > 0 &&
                        <div className="movie-card__response-perc">{`${props.movie.wtsPerc} %` }</div>
                    }
                    {
                        props.movie.dwtsCount > 0 &&
                        <div className="movie-card__response-votes">{`${props.movie.dwtsCount} votes` }</div>
                    }
                </div>            
            }
            <div className="movie-card__event">{ props.movie.EventName }</div>
            {
                props.runTrailer &&
                <div className="movie-card__trailer" id={ VideoPlayerId }>
                    <MovieTrailer movie={ props.movie }/>
                </div>
            }
        </div>
    )
};

const FilterItem = (props) => <span className="filters__item clickable" onClick={ () => props.removeFilter(props.type, props.name) }>{props.name}</span>


class MovieTrailers extends React.Component {
    constructor() {
        super();
        this.state = {
            languages: this.generateLang(), 
            genres: this.generateGenres(),
            movies: Object.values(trailerData)
        };

        this.LangRef = React.createRef();
        this.GenresRef = React.createRef();
        this.MoviesRef = React.createRef();
    }


    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside.bind(this));
        window.addEventListener('resize', this.onResizeHandler);
    }


    componentDidUpdate() {
        this.computeVideoRect();
    }

    computeVideoRect = () => {
        try {
            let videoPlayerRect = document.getElementById(VideoPlayerId);
            let movieRect = document.getElementById(MovieId);
            if(videoPlayerRect && 
                movieRect &&
                videoPlayerRect.getBoundingClientRect() &&
                movieRect.getBoundingClientRect()) {
                let obj1 = videoPlayerRect.getBoundingClientRect();
                let obj2 = movieRect.getBoundingClientRect()
                let left = obj2.left - obj1.left;
                videoPlayerRect.style.left = left + 'px';
            }          
        } catch(e) {
            console.error('E:', e);
        }
    }

    onResizeHandler = () => {
        setImmediate(() => {
            this.computeVideoRect();
        });
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        window.addEventListener('resize', this.onResizeHandler);
    }

    handleClickOutside(event) {
        if (this.LangRef && this.LangRef.current && !this.LangRef.current.contains(event.target)) {
            this.setState({
                langPanelOpen: false
            });
        }

        if (this.GenresRef && this.GenresRef.current && !this.GenresRef.current.contains(event.target)) {
            this.setState({
                isGenresPanelOpen: false
            });
        }
    }

    generateLang = () => {
        let langLen = languages.length;
        let langObj = {};
        for(let i = 0; i < langLen; i++) {
            let lang = languages[i];
            langObj[lang] = false;
        }
        return langObj;
    }

    generateGenres = () => {
        let genresArr = [];
        let allData = Object.values(trailerData);
        
        genresArr = allData.map(item => item.EventGenre);
        genresArr = genresArr.map(item => item.split('|'));
        genresArr = genresArr.flat();

        genresArr = [...new Set(genresArr)];

        let genres = {};

        let genresArrLen = genresArr.length;

        for(let i = 0; i < genresArrLen; i++) {
            let genre = genresArr[i];
            genres[genre] = false;
        }

        return genres;
    }

    resetFilter =  () => {
        let languages = this.generateLang();
        let genres = this.generateGenres();
        this.setState({
            languages,
            genres
        });
    }

    onLangChangeHandler = (lang) => {
        let {languages} = this.state;
        languages[lang] = !languages[lang];
        this.setState({
            languages
        });
    }

    onGenresChangeHandler = (item) => {
        let {genres} = this.state;
        genres[item] = !genres[item];
        this.setState({
            genres
        });
    }

    toggleLangPanel = (e) => {
        e.preventDefault();

        let {langPanelOpen} = this.state;
        langPanelOpen = !langPanelOpen;

        this.setState({
            langPanelOpen
        });

    }

    renderLanguagesDropDown = () => {
        if(!this.state.languages) {
            return null;
        }
        let languages = Object.keys(this.state.languages);

        languages = languages.map((lang, index) => {
            return (
                <label className="option clickable" key={ `${index}-${lang}` }>
                    <input className="option__value clickable" 
                        type="checkbox" 
                        name={lang} 
                        onChange={ () => this.onLangChangeHandler(lang) } 
                        defaultChecked={ this.state.languages[lang] }
                        value={ this.state.languages[lang] }/>
                    <span className="option__title">{ lang }</span>
                </label>
            )
        });   

        languages = <div className="drop-down-menu">{languages}</div>

        let selectedLang = [];
        for(let i in this.state.languages) {
            if(this.state.languages[i]) {
                selectedLang.push(i);
            }
        }

        let view  = <form onSubmit={ this.toggleLangPanel }>
                        <input type="submit" value={selectedLang.length > 0 ? selectedLang.join(', '): "All Language"}/>
                        { this.state.langPanelOpen && languages }
                    </form>;


        return view;
    }

    toggleGenresPanel = (e) => {
        e.preventDefault();

        let {isGenresPanelOpen} = this.state;
        isGenresPanelOpen = !isGenresPanelOpen;

        this.setState({
            isGenresPanelOpen
        });
    }

    removeFilter = (type, name) => {
        let filters = this.state[type];
        filters[name] = false;
        this.setState({
            type: filters
        });
    }

    onMovieClick = (activeMovie) => {
        this.setState({
            activeMovie: null
        }, () => {
            this.setState({
                activeMovie
            });
        })
    }

    renderGenresDropDown = () => {
        if(!this.state.genres) {
            return null;
        }
        let genres = Object.keys(this.state.genres);

        genres = genres.map((item, index) => {
            return (
                <label className="option clickable" key={ `${index}-${item}` }>
                    <input type="checkbox" className="option__value clickable"
                        name={item} 
                        onChange={ () => this.onGenresChangeHandler(item) } 
                        defaultChecked={ this.state.genres[item] }
                        value={ this.state.genres[item] }/>
                    <span  className="option__title">{ item }</span>
                </label>
            )
        });   

        genres = <div className="drop-down-menu">{genres}</div>

        let selectedItem = [];
        for(let i in this.state.genres) {
            if(this.state.genres[i]) {
                selectedItem.push(i);
            }
        }


        let view  = <form onSubmit={ this.toggleGenresPanel }>
                        <input type="submit" value={selectedItem.length > 0 ? selectedItem.join(', ') : "All genres"}/>   
                        { this.state.isGenresPanelOpen && genres }
                    </form>;

        return view;
    }

    renderHeader = () => {
        let view = <div className="project-2__header flex">
                        <div className="flex1">
                            <span className="movie-title inline-block">Movie Trailer</span>
                            <span  className="comming-soon-title inline-block">COMMING SOON</span>
                            <span  className="now-showing-title inline-block">NOW SHOWING</span>
                        </div>
                        <div className="header-controls flex">
                            <div className="dropdown-wrapper inline-block" ref={this.LangRef}>{ this.renderLanguagesDropDown() }</div>
                            <div className="dropdown-wrapper inline-block" ref={this.GenresRef}>{ this.renderGenresDropDown() }</div>
                            <div className="header-action__close clickable" onClick={ this.resetFilter }>X</div>
                        </div>
                    </div>;
        return view;
    }

    getAppliedFilters = () => {
        let {languages, genres} = this.state;
        let langSelected = [], genresSelected = [];
        let view = null;
        
        for(let i in languages) {
            if(languages[i]) {
                langSelected.push(i);
            }
        }

        for(let i in genres) {
            if(genres[i]) {
                genresSelected.push(i);
            }
        }

        if(genresSelected.length === 0 && langSelected.length === 0) {
            return view;
        }

        view = <div className="filters">
                    <span className="filters__title">Applied Filters:</span>
                    {
                        langSelected &&
                        langSelected.length > 0 &&
                        langSelected.map(item => <FilterItem key={ `languages_${item}` } 
                                                                name={ item }
                                                                type="languages"
                                                                removeFilter={ this.removeFilter }/>)
                    }
                    {
                        genresSelected &&
                        genresSelected.length > 0 &&
                        genresSelected.map(item => <FilterItem key={ `genres_${item}` } 
                                                                name={ item }
                                                                type="genres"
                                                                removeFilter={ this.removeFilter } />)
                    }
                </div>;

        return view;
    }

    renderMoviesWithLazyLoading = () => {
        let movies = this.state.movies.map((movie, index) => {
            let runTrailer = false;
            
            if(this.state.activeMovie) {
                runTrailer = movie.EventCode === this.state.activeMovie.EventCode;
            }

            return <LazyLoad key={ movie.EventCode } height={500} offset={[10000, 0]}>
                        <MovieCard key={ movie.EventCode } 
                                id={ index === 0 ? MovieId : null }
                                movie={ movie } 
                                runTrailer={ runTrailer }
                                onMovieClick={ this.onMovieClick }/></LazyLoad>
        });
        return <div className="project-2__movies" id="movies">{movies}</div>;
    }

    renderMovies = () => {
        let movies = this.state.movies.map((movie, index) => {
            let runTrailer = false;
            
            if(this.state.activeMovie) {
                runTrailer = movie.EventCode === this.state.activeMovie.EventCode;
            }

            return <MovieCard key={ movie.EventCode } 
                                id={ index === 0 ? MovieId : null }
                                movie={ movie } 
                                runTrailer={ runTrailer }
                                onMovieClick={ this.onMovieClick }/>
        });
        return <div className="project-2__movies">{movies}</div>;
    }

    render() {
        return(<div className="project-2__content">
            { this.renderHeader() }
            { this.getAppliedFilters() }
            { this.renderMovies() }  
        </div>)
    }
}

export default MovieTrailers;