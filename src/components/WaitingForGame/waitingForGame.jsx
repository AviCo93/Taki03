import React from 'react';
import ReactDOM from 'react-dom';

export default class WaitingForGameScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currGame: {}
        }
        //this.getCurrGameData = this.getCurrGameData.bind(this);
        //this.updateUserQuitGame = this.updateUserQuitGame.bind(this);
    }
    /*

    componentDidMount() {
        this.getCurrGameData();
    }

    updateUserQuitGame() {
        // const { user } = this.props;
        const gameToUpdate = this.state.currGame;
        gameToUpdate.numOfRegisterd--;
        fetch('/games/updateGameData', { method: 'POST', body: JSON.stringify(gameToUpdate), credentials: 'include' });
        this.props.updateUserInGame(false, '');
    }


    getCurrGameData() {
        const { user } = this.props;

        console.log("getCurrGameData")
        return fetch(`/games/getGameById/?id=${user.usersGame.id}`, { method: 'GET', credentials: 'include' })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                this.timeoutId = setTimeout(this.getCurrGameData, 1000);
                return response.json();
            })
            .then((currGame) => currGame && this.setState({ currGame }))
            .catch(err => { throw err });
    }
    */

    render() {
        // const { user } = this.props;
        // const { currGame } = this.state;
        // let isGameActive = currGame.Active;

        // console.log("isGameActive? " + isGameActive);
        // console.log("user= " + user);

        // if (!isGameActive) {
        //     return (
        //         <div className="GameContainer">
        //             <div className="WaitingScreen" >
        //                 <div> There are {currGame.numOfRegisterd} players in the game <br />waiting for {currGame.numOfPlayers - currGame.numOfRegisterd} players to join </div>
        //                 <button onClick={() => this.updateUserQuitGame()}>
        //                     Quit Game</button>
        //             </div>
        //         </div>
        //     )
        // }
        return (<div> GAME BOARD </div>);
    }
}