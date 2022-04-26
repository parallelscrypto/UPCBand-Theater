import React, { useState, useEffect } from 'react';
import './Results.css'
import VideoCard from './VideoCard';
import UPCBR_Channel from './App2';
// importing axios from the file created ==> instance
import axios from '../api/axios'

// Modal
import ReactModal from 'react-modal';
import ReactPlayer from 'react-player/youtube';
import movieTrailer from 'movie-trailer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton } from '@material-ui/core';
import { FadeTransform } from 'react-animation-components'; // Animation related stuff


function Results({ selectedOption }) {
    const [movies, setMovies] = useState([]);
    // run once whenever the component loads


    async function upcbrFetch() {
    var channel0 = await UPCBR_Channel('000000000000');
    }

    var stuff = upcbrFetch();
    // modal (trailer related)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [currentMovie, setCurrentMovie] = useState({})
    const modalControl = (movie) => {
        setCurrentMovie(movie)
        setIsModalOpen(true)
        movieTrailer(movie?.title || movie.original_name || movie.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            })
            .catch((error) => console.log(error))
    }

    const baseYTurl = 'https://www.youtube.com/watch?v=';
    const baseImgURL = 'https://image.tmdb.org/t/p/original';

    const [vids, setVids] = useState([1,2,3]);
    return (
        <div className="results">
	    <UPCBR_Channel setVids={setVids} vids={vids} channel={'000000000001'} />
        </div>
    )
};

export default Results;
