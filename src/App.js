import React, { Component } from 'react'
import UsernameForm from './UsernameForm'
import RoomListForm from './RoomListForm'
import Chat from './Chat'

class App extends Component {
  state = {
    currentUsername: null,
    currentId: null,
    roomId: null,
    currentScreen: 'usernameForm'
  }

  onRoomSelected = roomId => {
    this.setState({
      roomId: roomId,
      currentScreen: 'chat'
    })
  }

  onUsernameSubmitted = username => {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
      .then(response => response.json())
      .then(data => {

        this.setState({
          currentId: data.id,
          currentUsername: data.name,
          rooms: data.rooms,
          currentScreen: 'rooms'
        })

      })
      .catch(error => {
        console.error('error', error)
      })
  }

  render() {
    if (this.state.currentScreen === 'usernameForm') {
      return <UsernameForm handleSubmit={this.onUsernameSubmitted} />
    }

    if (this.state.currentScreen === 'rooms') {
      return <RoomListForm currentId={this.state.currentId} roomClicked={this.onRoomSelected} />
    }

    if (this.state.currentScreen === 'chat') {
      return <Chat currentId={this.state.currentId} roomId={this.state.roomId}/>
    }
  }
}

export default App
