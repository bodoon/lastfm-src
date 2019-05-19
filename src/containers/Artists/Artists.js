import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Artists.module.css';
import Card from '../../components/Card/Card';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/actions';
import artistPlaceholder from '../../assets/img/artist-placeholder.jpg';

class Artists extends Component {

    componentDidMount() {
        this.props.onArtistsInit();
    }

    render() {

        let artists = this.props.loading ? <Spinner/> : this.props.artists.map((artist) => {
            return <Card
                key={artist.id}
                src={artist.src ? artist.src : artistPlaceholder}
                title={artist.name}
                clicked={() => {this.props.initArtistSearch(artist.name)}}/>
        });

        return (
            <div className={classes.ArtistsContainer}>
                <h2 className={classes.Subheading}>Top Last.fm Artists</h2>
                {artists}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        artists: state.artists,
        loading: state.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onArtistsInit: () => {
            dispatch(actions.fetchArtistsInit())
        },
        initArtistSearch: name => {
            dispatch(actions.fetchArtistInfoInit(name))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Artists);