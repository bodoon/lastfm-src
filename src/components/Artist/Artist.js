import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from "../../store/actions/actions";
import Card from '../Card/Card';

class Artist extends Component {

    getInfoHandler = () => {
        this.props.initArtistSearch(this.props.name)
    };

    render() {
        return (
            <Card
                src={this.props.src}
                title={this.props.name}
                clicked={this.getInfoHandler}/>
        );
    }
}

const mapDispatchToProps = {
    initArtistSearch: actions.fetchArtistInfoInit,
};

export default connect(null, mapDispatchToProps)(Artist);

