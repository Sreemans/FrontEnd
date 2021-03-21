import React from 'react';

export default class Poker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerscount: 0,
            amount: 10,
            players: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.startGame = this.startGame.bind(this);
        this.playerName = this.playerName.bind(this);
    }

    handleChange(e) {
        if(e.target.name === "playerscount" && e.target.value > 100){
            return;
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    playerName(e) {
        const { players } = this.state;
        players[e.target.name] = e.target.value;
        this.setState({ players });
    }
    startGame() {
        const { amount, playerscount, players } = this.state;
        
        const checkAllPlayersFilled = () => {
            if (Object.keys(players).length != playerscount) {
                this.setState({ warning: "Fill all the player names" });
                return false;
            } else if (Object.values(players).includes("")) {
                this.setState({ warning: "Player names cannot be empty" });
                return false;
            } else {
                return true;
            }
        }
        if (amount == 0) {
            this.setState({ warning: "Enter Amount" })
        }
        else if (playerscount == 0) {
            this.setState({ warning: "Enter Players Count" })
        }
        else if (amount == 0 || playerscount == 0) {
            this.setState({ warning: "Enter Players Count, Amount" })
        } else {
            if (!checkAllPlayersFilled()) {
                return;
            } else {
                //localstorage
                this.setState({ warning: "" })
            }
        }

    }
    getPlayerNames() {
        const { playerscount } = this.state;
        let boxes = []
        for (let i = 1; i <= playerscount; i++) {
            boxes.push(<input type='text' placeholder={`Player ${i}`} name={`player${i}`} onChange={this.playerName} />)
        }
        return boxes;
    }
    render() {
        const playerscount = this.state.playerscount;
        return (
            <div>
                <div>
                    <h3>{this.state.warning}</h3>
                    <div style={{ display: "flex" }}>No of Players: <input type="number" name="playerscount" maxLength="2" onChange={this.handleChange}></input></div>
                    <div style={{ display: "flex" }}>Amount: <input type="number" name="amount" onChange={this.handleChange}></input></div>

                </div>
                <div>
                    {playerscount && this.getPlayerNames().map((item, key) => {
                        return (<div key={key}>{item}</div>)
                    })}
                </div>
                <div>
                    <button onClick={this.startGame}>Start Game</button>
                </div>
            </div>
        )
    }
}