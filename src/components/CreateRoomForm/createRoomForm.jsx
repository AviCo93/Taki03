import React from 'react';
import ReactDOM from 'react-dom';
import { userList } from '../../server/auth.js'
import "./createRoomForm.css"

export default class CreateRoomForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currRoom: {
                name: "",
                id:0,
                username: "",
                numOfPlayers: 0,
                numOfRegisterd: 0,
                isActive: false
            },

            errorMessage: ""

        }
        this.handleSubmitBtn = this.handleSubmitBtn.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePlayersNumChange = this.handlePlayersNumChange.bind(this);
        this.fetchUserInfo = this.fetchUserInfo.bind(this);

    }

    handleNameChange(event) {
        const room = this.state.currRoom;
        room.name = event.target.value;
        this.setState({ currRoom: room });
    }

    handlePlayersNumChange(event) {
        const room = this.state.currRoom;
        const value = Number(event.target.value);
        if(Number.isInteger(value) && value >= 2 && value <= 4){
            room.numOfPlayers = value;            
            this.setState({ 
                currRoom: room ,
                errorMessage: "" 
            });
        }
        else{
            this.setState(() => ({ errorMessage: "Number of players input must be integer number between 2 - 4" }));
        }
    }

    fetchUserInfo() {
        return fetch('/users', { method: 'GET', credentials: 'include' })
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            });
    }

    handleSubmitBtn(event) {
        event.preventDefault();
        this.fetchUserInfo()
        .then(userInfo => {
            this.state.currRoom.userName = (userInfo && userInfo.name) ? userInfo.name : '';
            fetch('/rooms/addRoom', { method: 'POST', body: JSON.stringify(this.state.currRoom), credentials: 'include' })
                .then(response => {
                    if (response.ok) {
                        this.setState(() => ({ errorMessage: "" }));
                        this.props.changeHiddenProperty();
                    } 
                    else {
                        if (response.status === 403) {
                            this.setState(() => ({ errorMessage: "Room name already exists, please try another one" }));
                        }
                        //TODO: must check also if number is between 2-4 !!!!!
                    }
                });
        });

        return false;

    }

    render(){
        return(
            <div className = "">
                <div className="createNewRoom-wrapper" >
                    <label className="roomName-label" htmlFor="roomsName"> Room's name: </label>
                    <input className="roomName-input" name="roomsName" onChange={this.handleNameChange} />     <br />
                    <label className="playersNum-label" htmlFor="playersNum"> Number of players: </label><br />
                    <input className="playersNum-input" name="playersNum" onChange={this.handlePlayersNumChange} />     <br />                
                    <input onClick={this.handleSubmitBtn} className="submit-btn btn" type="submit" value="Submit" />
                    {this.renderErrorMessage()}
                </div>
            </div>
        )
    }

    renderErrorMessage() {
        if (this.state.errorMessage) {
            return (
                <div className="errorMessage">
                    {this.state.errorMessage}
                </div>
            );
        }
        return null;
    }
}