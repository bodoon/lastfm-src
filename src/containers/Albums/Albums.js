import React, {Component} from 'react';
import {connect} from 'react-redux';

import Card from '../../components/Card/Card';
import classes from './Albums.module.css'
import * as actions from '../../store/actions/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import musicPlaceholder from '../../assets/img/album-placeholder.jpg';

/*Would be better to load 10 albums initially and then load more when needed, but API doesn't provide such functionality*/
class Albums extends Component {
    state = {
        name: null,
        page: 1,
        limit: 20,
        albumsToShow: 10
    };

    componentDidMount() {
        let artistName = decodeURI(this.props.location.search.slice(1));
        this.setState({name: artistName});
        this.props.onAlbumsInit(artistName, this.state.page, this.state.limit);
    }

    openDetailsHandler = (link) => {
        window.open(link, "_blank")
    };

    selectHandler = (event) => {
        this.setState({
            albumsToShow: event.target.value
        });
    };

    render() {
        let albums = this.props.loading ? <Spinner/> : (
            this.props.albums.slice(0, this.state.albumsToShow).map((album) => {
                if (album.link.indexOf('(null)') === -1) {
                    return (
                        <Card
                            key={album.id}
                            src={album.src ? album.src : musicPlaceholder}
                            title={album.name !== '(null)' ? album.name : 'No Data'}
                            clicked={() => {
                                this.openDetailsHandler(album.link)
                            }}/>
                    );
                } else {
                    return null;
                }
            })
        );

        return (
            <div className={classes.AlbumsContainer}>
                <h2 className={classes.Subheading}>{this.state.name ? `${this.state.name} Top Albums` : 'Not Found'}</h2>
                <div className={classes.SelectWrapper}>
                    <select
                        className={classes.AlbumsSelector}
                        onChange={(event) => {this.selectHandler(event)}}
                        value={this.state.albumsToShow}
                        aria-label="Albums amount">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                    </select>
                </div>
                {albums}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        albums: state.albums,
        loading: state.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAlbumsInit: (name, page, limit) => {
            dispatch(actions.fetchAlbumsInit(name, page, limit))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Albums);