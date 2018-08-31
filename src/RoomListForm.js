import React, { Component } from 'react'
import { ChatManager, TokenProvider } from '@pusher/chatkit'

import {
  ListView,
  ListViewSection,
  ListViewRow,
  Button
} from 'react-desktop/macOs'

class RoomListForm extends Component {
    constructor() {
        super()
        this.state = {
            rooms: [],
            roomId: null
        }
    }

    componentDidMount(){
        const chatkit = new ChatManager({
            instanceLocator: 'INSTANCE LOCATOR',
            userId: this.props.currentId,
            tokenProvider: new TokenProvider({
                url: 'URL'
            })
        })

        chatkit
        .connect()
        .then(currentUser => {
            return currentUser.getJoinableRooms()
                .then(rooms => {
                    this.setState({ rooms });
                })
                .catch(error => console.error('error', error))
        })
    }

    roomClicked = id => {
        this.props.roomClicked(id);
    }
    
    render() {
        return (
            <ListView className="room-list">
                <ListViewSection>
                    {this.state.rooms &&
                        this.state.rooms.map((room, index) => {
                            return this.renderItem(room.id, room.isPrivate, room.name)
                        })
                    }
                </ListViewSection>
            </ListView>
        )
    }

    renderItem(id, isPrivate, name) {
        const itemStyle = {}
        return (
            <ListViewRow key={id}>
                <Button color="blue" onClick={() => this.roomClicked(id)}>{name}</Button>
            </ListViewRow>
        )
    }
}

export default RoomListForm