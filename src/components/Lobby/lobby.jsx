import React from 'react';
import ReactDOM from 'react-dom';
import UsersContainer from '../UsersContainer/usersContainer.jsx';
import CreateRoomBtn from '../CreateRoomBtn/createRoomBtn.jsx';
import CreateRoomForm from '../CreateRoomForm/createRoomForm.jsx';
import RoomsContainer from '../RoomsContainer/roomsContainer.jsx';
import "./lobby.css"

export default class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreateRoomFormVisible : false
        }
    }

    render(){
        return(
            <div className="lobbyRoomContainer">
                <div className = "" hidden={this.state.isCreateRoomFormVisible}>
                    <div className="user-info-area">
                        Hello {this.props.userName}
                        <button className="logout btn" onClick={this.logoutHandler}>Logout</button>
                    </div>
                    <UsersContainer />
                    <RoomsContainer userName = {this.props.userName} updateUserInRoom = {this.props.updateUserInRoom}/>
                    <CreateRoomBtn func={this.changeCreateRoomFormVisible.bind(this)}/>
                </div>
                <div className = "createRoomForm" hidden={!this.state.isCreateRoomFormVisible}>
                    <CreateRoomForm changeHiddenProperty={this.changeCreateRoomFormVisible.bind(this)}/>
                </div>
            </div>
        )
    }

    
    changeCreateRoomFormVisible(){
        this.setState({isCreateRoomFormVisible: !this.state.isCreateRoomFormVisible});
    }
}
