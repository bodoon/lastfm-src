import * as actionTypes from '../actions/actionTypes';

const initialState = {
    artists: [],
    artistInfo: {},
    albums: [],
    showArtistInfo: false,
    loading: false,
    error: false
};

const showArtistsHandler = (state) => {
  return {
      ...state,
      showArtistInfo: false
  }
};

/*Get Top Artists START*/
const fetchArtistStart = (state) => {
    return {
        ...state,
        loading: true,
        showArtistInfo: false,
        error: false
    }
};

const fetchArtistSuccess = (state, action) => {
    return {
        ...state,
        artists: action.artists,
        loading: false
    }
};


const fetchArtistFail = (state) => {
    return {
        ...state,
        loading: false,
        error: true
    }
};
/*Get Top Artists END*/


/*Get Artist Info START*/
const fetchArtistInfoStart = (state) => {
    return {
        ...state,
        loading: true,
        showArtistInfo: true,
        error: false
    }
};

const fetchArtistInfoSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        artistInfo: action.artistInfo
    }
};

const fetchArtistInfoFail = (state) => {
    return {
        ...state,
        loading: false,
        error: true
    }
};
/*Get Artist Info END*/


/*Get Top Albums START*/
const fetchAlbumsStart = (state) => {
    return {
        ...state,
        loading: true,
        error: false
    }
};

const fetchAlbumsSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        albums: action.albums
    }
};

const fetchAlbumsFail = (state) => {
    return {
        ...state,
        loading: false,
        error: true
    }
};
/*Get Albums Info END*/


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_ARTISTS_HANDLER:
            return showArtistsHandler(state);
        case actionTypes.FETCH_ARTISTS_START:
            return fetchArtistStart(state);
        case actionTypes.FETCH_ARTISTS_SUCCESS:
            return fetchArtistSuccess(state, action);
        case actionTypes.FETCH_ARTISTS_FAIL:
            return fetchArtistFail(state);
        case actionTypes.FETCH_ARTIST_INFO_START:
            return fetchArtistInfoStart(state);
        case actionTypes.FETCH_ARTIST_INFO_SUCCESS:
            return fetchArtistInfoSuccess(state, action);
        case actionTypes.FETCH_ARTIST_INFO_FAIL:
            return fetchArtistInfoFail(state);
        case actionTypes.FETCH_ALBUMS_START:
            return fetchAlbumsStart(state);
        case actionTypes.FETCH_ALBUMS_SUCCESS:
            return fetchAlbumsSuccess(state, action);
        case actionTypes.FETCH_ALBUMS_FAIL:
            return fetchAlbumsFail(state);
        default:
            return state;
    }
};

export default reducer;