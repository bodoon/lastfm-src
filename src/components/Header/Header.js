import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import classes from './Header.module.css';
import * as actions from '../../store/actions/actions';

class Header extends Component {
    state = {
        searchValue: ''
    };

    inputChangedHandler = (event) => {
        this.setState({
            searchValue: event.target.value
        });
    };

    submitHandler = (event) => {
        event.preventDefault();

        if (this.props.location !== '/') {
            this.props.history.push('/');
        }

        if (this.state.searchValue) {
            this.props.initArtistSearch(this.state.searchValue);
        } else {
            this.props.showArtistsHandler();
        }
    };

    render() {
        return (
                <header className={classes.Header}>
                    <div className={classes.HeaderContainer}>
                        <Link to="/" onClick={this.props.showArtistsHandler} className={classes.HomeLink}>Top Artists</Link>
                        <form
                            className={classes.SearchForm}
                            onSubmit={(event) => {
                                this.submitHandler(event)
                            }}>
                            <div role="search" className={classes.SearchField}>
                                <input
                                    aria-label="search"
                                    placeholder="Search..."
                                    value={this.state.searchValue}
                                    onChange={(event) => {this.inputChangedHandler(event)}}
                                    onBlur={(event) => {this.submitHandler(event)}}/>
                            </div>
                        </form>
                    </div>
                </header>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initArtistSearch: name => {
            dispatch(actions.fetchArtistInfoInit(name))
        },
        showArtistsHandler: () => {
            dispatch(actions.showArtistsHandler())
        }
    }
};

export default withRouter(connect(null, mapDispatchToProps)(Header));