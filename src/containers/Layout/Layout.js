import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import classes from './Layout.module.css';
import Header from '../../components/Header/Header';
import Artists from '../Artists/Artists';
import ArtistInfo from '../../components/Artist/ArtistInfo/ArtistInfo';
import Albums from '../Albums/Albums';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';
import styled from 'styled-components'

const Main = styled.main`
   overflow: auto;
   padding: 20px 0; 
   flexGrow: 1; 
   backgroundColor: #f9fbfc
`;

class Layout extends Component {
    render() {
        return (
            <div className={classes.Container}>
                <Header/>
                <Main>
                    <h1 className="sr-only">Lastfm Info</h1>
                    <Switch>
                        <Route path="/" exact component={this.props.showArtistInfo ? ArtistInfo : Artists}/>
                        <Route path={"/:id"} component={Albums}/>}/>
                    </Switch>
                </Main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        showArtistInfo: state.showArtistInfo,
        artistInfo: state.artistInfo
    }
};

export default connect(mapStateToProps)(withErrorHandler(Layout, axios));