import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';


export const showArtistsHandler = () => {
    return {
        type: actionTypes.SHOW_ARTISTS_HANDLER
    }
};

/*Get Top Artists START*/
const fetchArtistsStart = () => {
    return {
        type: actionTypes.FETCH_ARTISTS_START
    }
};

const fetchArtistsSuccess = (artists) => {
    let transformedArtists = artists.data.artists.artist.map((artist => {
        return {
            name: artist.name,
            src: artist.image[3]["#text"],
            /*should use mbid (unique identifier) from the response for id, but for some artists it's missing*/
            id: Math.random()
        };

    }));

    return {
        type: actionTypes.FETCH_ARTISTS_SUCCESS,
        artists: transformedArtists
    }
};

const fetchArtistsFail = () => {
    return {
        type: actionTypes.FETCH_ARTISTS_FAIL
    }
};

export const fetchArtistsInit = () => {
    return dispatch => {
        dispatch(fetchArtistsStart());
        axios.get(`https://cors-anywhere.herokuapp.com/http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`)
            .then(res => {
                dispatch(fetchArtistsSuccess(res));
            })
            .catch(e => {
                dispatch(fetchArtistsFail())
            });
    }
};
/*Get Top Artists END*/


/*Get Artist Info START*/
const fetchArtistInfoStart = () => {
    return {
        type: actionTypes.FETCH_ARTIST_INFO_START
    }
};

const fetchArtistInfoSuccess = artistInfo => {
    let transformedArtistInfo = null;
    if (artistInfo.data.error === 6) {
        transformedArtistInfo = {
            notFound: true
        };
    } else {
        let summary = artistInfo.data.artist.bio.content;
        transformedArtistInfo = {
            name: artistInfo.data.artist.name,
            image: artistInfo.data.artist.image[3]['#text'],
            bio: summary.slice(0, summary.indexOf('<a href'))
        };
    }
    return {
        type: actionTypes.FETCH_ARTIST_INFO_SUCCESS,
        artistInfo: transformedArtistInfo
    }
};

const fetchArtistInfoFail = () => {
    return {
        type: actionTypes.FETCH_ARTIST_INFO_FAIL
    }
};

export const fetchArtistInfoInit = (name) => {
    return dispatch => {
        dispatch(fetchArtistInfoStart());
        axios.get(`https://cors-anywhere.herokuapp.com/http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&autocorrect=1&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`)
            .then(res => {
                dispatch(fetchArtistInfoSuccess(res));
            })
            .catch(e => {
                dispatch(fetchArtistInfoFail())
            });
    }
};
/*Get Artist Info END*/


/*Get Albums Info START*/
const fetchAlbumsStart = () => {
    return {
        type: actionTypes.FETCH_ALBUMS_START
    }
};

const fetchAlbumsSuccess = albums => {
    let transformedAlbums = albums.data.topalbums.album.map((album => {
        return {
            name: album.name,
            src: album.image[3]["#text"],
            link: album.url,
            id: Math.random()
        };
    }));
    return {
        type: actionTypes.FETCH_ALBUMS_SUCCESS,
        albums: transformedAlbums
    }
};

const fetchAlbumsFail = () => {
    return {
        type: actionTypes.FETCH_ALBUMS_FAIL
    }
};

export const fetchAlbumsInit = (name, page, limit) => {
    return dispatch => {
        dispatch(fetchAlbumsStart());
        axios.get(`https://cors-anywhere.herokuapp.com/http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&page=${page}&autocorrect=1&limit=${limit}&artist=${name}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`)
            .then(res => {
                dispatch(fetchAlbumsSuccess(res));
            })
            .catch(e => {
                dispatch(fetchAlbumsFail())
            });
    }
};
/*Get Albums Info END*/