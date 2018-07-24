import React from 'react';
import ReactDOM from 'react-dom';
import LoginModal from './login-modal.jsx';
import Lobby from './Lobby/lobby.jsx';
import WaitingForGame from './WaitingForGame/waitingForGame.jsx';


export default class BaseContainer extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            showLogin: true,
            currentUser: {
                name: '',
                isInRoom: false,
            }
        };
        
        this.updateUserInRoom = this.updateUserInRoom.bind(this);
        this.handleSuccessedLogin = this.handleSuccessedLogin.bind(this);
        this.handleLoginError = this.handleLoginError.bind(this);
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
        this.logoutHandler= this.logoutHandler.bind(this);

        this.getUserName();
    }
    
    render() {        
        if (this.state.showLogin) {
            return (<LoginModal loginSuccessHandler={this.handleSuccessedLogin} loginErrorHandler={this.handleLoginError}/>)
        }
        return this.renderLobbyRoom();
    }


    handleSuccessedLogin() {
        this.setState(()=>({showLogin:false}), this.getUserName);        
    }

    handleLoginError() {
        console.error('login failed');
        this.setState(()=>({showLogin:true}));
    }

    // () {
    //     return(
    //         <div className="chat-base-container">
    //             <div className="user-info-area">
    //                 Hello {this.state.currentUser.name}
    //                 <button className="logout btn" onClick={this.logoutHandler}>Logout</button>
    //             </div>
    //             <ChatContaier />                
    //         </div>
    //     )
    // }

    renderLobbyRoom() {
        if(this.state.currentUser.isInRoom){
            return(<WaitingForGame user = {this.state.currentUser} updateUserInRoom = {this.updateUserInRoom} />) 
        }
        return(
            <div>
                <Lobby userName = {this.state.currentUser.name} updateUserInRoom={this.updateUserInRoom}/>
            </div>
        );
    }


    updateUserInRoom(flag){
        console.log("updateUserInRoom", flag);
        const user = this.state.currentUser;
        user.isInRoom = flag;

        this.setState(()=>({currentUser : user}));
    }


    getUserName() {
        this.fetchUserInfo()
        .then(userInfo => {
            this.setState(()=>({currentUser:userInfo, showLogin: false}));
        })
        .catch(err=>{            
            if (err.status === 401) { // incase we're getting 'unautorithed' as response
                this.setState(()=>({showLogin: true}));
            } else {
                throw err; // in case we're getting an error
            }
        });
    }

    fetchUserInfo() {        
        return fetch('/users',{method: 'GET', credentials: 'include'})
        .then(response => {            
            if (!response.ok){
                throw response;
            }
            return response.json();
        });
    }

    logoutHandler() {
        fetch('/users/logout', {method: 'GET', credentials: 'include'})
        .then(response => {
            if (!response.ok) {
                console.log(`failed to logout user ${this.state.currentUser.name} `, response);                
            }
            this.setState(()=>({currentUser: {name:''}, showLogin: true}));
        })
    }
}