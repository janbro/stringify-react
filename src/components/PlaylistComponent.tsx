import React, { Component } from 'react';
import Playlist from '../models/Playlist';
import { Card, Row, Col, Spinner } from 'react-bootstrap';

type PlaylistInterface = {
    playlist?: Playlist;
}

type BoolMap = {
    [iFrameLoader: string]: any;
}

class PlaylistComponent extends Component<PlaylistInterface, BoolMap> {
    state: BoolMap = {
        iFrameLoader: {}
    };

    render() {
        return (
            <React.Fragment>
                { this.props && this.getTracks() }
            </React.Fragment>
        );
    }

    disableSpinner(track_id: string) {
        this.setState((prev: any) => {
            let state = Object.assign({}, prev);
            state.iFrameLoader[track_id] = true;
            return state;
        });
    }

    getTracks() {
        if(this.props.playlist)
            return (
                <Card>
                    <Card.Header>{this.props.playlist.name}</Card.Header>
                    <Card.Body>
                        <Row>
                        {
                            this.props.playlist.tracks.items.map(({track}) => {
                                return (
                                    <Col style={ { textAlign: 'center' } } xs={2} key={track.id}>
                                    {
                                        (this.state.iFrameLoader === {} ||
                                        (this.state.iFrameLoader && this.state.iFrameLoader[track.id] !== true)) &&
                                        <Spinner
                                            key={track.id+'_spinner'}
                                            animation="border"
                                            style={ {
                                                width: '80px',
                                                height: '80px'
                                            } } />
                                    }
                                        <iframe src={ "https://open.spotify.com/embed/track/" + track.id }
                                            key={track.id}
                                            title={track.id}
                                            width="80px"
                                            height="80px"
                                            frameBorder="0"
                                            style={ {
                                                visibility: (this.state.iFrameLoader[track.id]) ? 'visible' : 'hidden',
                                                position: (this.state.iFrameLoader[track.id]) ? 'inherit' : 'absolute'
                                            } }
                                            allow="encrypted-media"
                                            onLoad={ (() => {this.disableSpinner(track.id) }) }>
                                        </iframe>
                                        <footer>
                                            <p style={ { fontSize: '12px' } }>
                                                {track.name}
                                            </p>
                                        </footer>
                                    </Col>
                                );
                            })
                        }
                        </Row>
                    </Card.Body>
                </Card>
            );
    }
}

export default PlaylistComponent;
