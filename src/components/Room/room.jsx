import React from 'react';
import ReactDOM from 'react-dom';
// import room from '../WaitingForGame/waitingForGame.jsx';
import "./room.css"


export default class Room extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     userJoined: false
        // }

        this.userJoinToRoom = this.userJoinToRoom.bind(this);
        this.removeRoom = this.removeRoom.bind(this);
    }

    userJoinToRoom() {
        const {roomDetails} = this.props;
        console.log("userJoinToRoom ", roomDetails)
        roomDetails.numOfRegisterd++;
        // this.setState({userJoined:true});
        this.props.updateUserInRoom(true, roomDetails); //////////////////// TODO: to continue
        if (roomDetails.numOfRegisterd === roomDetails.numOfPlayers) {
            roomDetails.isActive = true;
        }
        fetch('/rooms/updateRoom', { method: 'POST', body: JSON.stringify(roomDetails), credentials: 'include' });
    }

    removeRoom(room) {
        console.log("removeRoom ", room)
        fetch('/rooms/removeRoom', { method: 'POST', body: JSON.stringify(room), credentials: 'include' });
    }

    render() {
        const { roomDetails, userName, updateUserInRoom} = this.props;
        //const {userJoined} = this.state;
        let borderStyle = roomDetails.isActive ? { border: 'solid green' } : { border: 'solid red' }
        let isUserCanRemoveTheRoom = roomDetails.userName === userName;
        let isNoOneRegisterd = roomDetails.numOfRegisterd === 0;

        return (
            <div className="roomInfo">
                <div className={"room_" + roomDetails.id} style={borderStyle}>
                    <div>
                        Room's Name: {roomDetails.name}
                    </div>
                    <div>
                        Created Username: {roomDetails.userName}
                    </div>
                    <div>
                        Number Of Players: {roomDetails.numOfPlayers}
                    </div>
                    <div>
                        Number Of Registerd: {roomDetails.numOfRegisterd}
                    </div>
                    <div>
                        Game's Status: {roomDetails.isActive ? "Game Started" : "Game didn't start"}
                    </div>
                    <button className="joinRoomBtn" hidden={roomDetails.isActive} onClick={() => this.userJoinToRoom()}>Join Game</button>
                    <button hidden={!(isUserCanRemoveTheRoom && isNoOneRegisterd)} className="RemoveGame" onClick={() => this.removeRoom(roomDetails)}> Remove Game </button>
                </div>
            </div>
        );
    }
}