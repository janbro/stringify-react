import React, { Component } from 'react';
import { authEndpoint, clientId, redirectUri, scopes } from "./config";

import { Button, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import hash from './helpers/hash';
import logo from './logo.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import PlaylistComponent from './components/PlaylistComponent';
import SpotifyService from './services/SpotifyService';

import './App.css';
import Playlist from './models/Playlist';

type State = {
    token?: string,
    playlist?: Playlist,
    logged_in: boolean,
    searchTerm?: string
};

const initState = (): State => {
    return { logged_in: false };
}

class App extends Component<{},State> {
    state = initState();
    progress_ms!: number;
    spotifyService: any;

    componentDidMount() {
        // Set token
        let _token = hash.access_token;

        if (_token) {
            // Set token
            this.setState({
                token: _token,
                logged_in: true
            });
            this.spotifyService = new SpotifyService(_token);
            this.spotifyService.getPlaylists()
                .then((data: any, textStatus: string, xhr: any) => {
                    if (xhr.status === 200) {
                        console.log("data", data.items[0]);
                        this.spotifyService.getPlaylist(data.items[0].href)
                            .then((playlist: any) => {
                                console.log(playlist)
                                this.setState({playlist:playlist});
                            })
                            .catch((error: any) => {
                                throw new Error("Error: " + error);
                            })
                    } else {
                        throw new Error("HTTP error, status = " + xhr.status);
                    }
                }).catch((error: any) => {
                    throw new Error("Error: " + error);            
                });
        }
    }

    search(e: any) {
        e.preventDefault();
        console.log(this.state.searchTerm);
    }

    handleSearchChange(e: any) {
        this.setState({searchTerm: e.target.value});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                {
                    this.state.logged_in && 
                    <Container>
                        <Row>
                            <Col>
                                <Form onSubmit={ (e: any) => { this.search(e) } }>
                                    <InputGroup className="mb-3">
                                        <FormControl id="search_term" aria-label="Search term" onChange={ this.handleSearchChange.bind(this) } />
                                        <InputGroup.Append>
                                        <Button type="submit"><FontAwesomeIcon icon={faSearch}/></Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                }
                    <img src={logo} className="App-logo" alt="logo" />
                    {
                        !this.state.token &&
                        <a className="btn btn--loginApp-link"
                            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                                "%20"
                            )}&response_type=token&show_dialog=true`}>
                            <Button variant="primary">
                                Login to Spotify
                            </Button>
                        </a>
                    }
                    {
                        this.state.token &&
                        <div style={ { width: '80%' } }>
                            <PlaylistComponent
                                playlist={this.state.playlist}
                            />
                        </div>
                    }
                </header>
            </div>
        );
    }
}

export default App;
