import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

import classes from './ArtistInfo.module.css';
import Spinner from '../../UI/Spinner/Spinner';
import artistPlaceholder from '../../../assets/img/artist-placeholder.jpg';

class ArtistInfo extends Component {

    render() {

        if (this.props.loading) {
            return (
                <Spinner/>
            );
        } else if (this.props.artistInfo.notFound) {
            return (
                <div className={classes.ArtistInfoContainer}>
                    <h2>Not Found</h2>
                </div>
            );
        } else {
            return (
                <div className={classes.ArtistInfoContainer}>
                    <h2>{this.props.artistInfo.name}</h2>
                    <Link
                        className={classes.AlbumsLink}
                        to={{
                            pathname: '/albums',
                            search: `?${this.props.artistInfo.name}`
                        }}
                    >Top Albums</Link>
                    <div className={classes.ArtistInfoImage}>
                        <img
                            src={this.props.artistInfo.image ? this.props.artistInfo.image : artistPlaceholder}
                            alt={this.props.artistInfo.name}/>
                    </div>
                    <p className={classes.ArtistInfoBio}>{this.props.artistInfo.bio}</p>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        artistInfo: state.artistInfo
    }
};

export default connect(mapStateToProps)(ArtistInfo);