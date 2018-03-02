import React from 'react';
import './App.css';

var createReactClass = require('create-react-class');

var GameBoard = createReactClass({
    // for setInterval
    getInitialState() {
        return {
            gameState: 0,
            heroLoc: 0,
            enemyLoc: 0,
            enemyType : 0,
            // aniEnd : true,
            kilometer:0,
        }
    },

    gameStart() {
        this.setState({
            gameState: 1
        })
        this.createEnemy(true);
        this.gameTick(true);
    },

    gameHandle(e) {
        if (this.state.gameState) {
            switch (e.keyCode) {
                case 37:
                    this.setState({ heroLoc: 0 });
                    break;
                case 39:
                    this.setState({ heroLoc: 1 });
                    break;
            }
        }
    },

    changeEnemyType(){
        var type = Math.floor(Math.random()*3);
        var loc = Math.round(Math.random());
        this.setState({enemyLoc : loc});
        this.setState({enemyType : type});
    },

    createEnemy(turnOn){
        // var enemies = 0;
        if(turnOn){
            this.Enemies = setInterval(this.changeEnemyType, 1000);
        }
        else{
            clearInterval(this.Enemies);
        }
    },

    bombOrNot(){
        var heroAt = 500-150;   // top of hero - height of enemy
        var trs, dis, kilometer = 0;

        var heroLoc = this.state.heroLoc,
            enemyLoc = this.state.enemyLoc;

        trs = window.getComputedStyle(enemy).getPropertyValue("transform");

        if(trs!="none"){
            dis = trs.split(",")[5].replace(")","");
        }

        // in the same road and cross each other
        if(dis > heroAt && dis < (heroAt + 300) && heroLoc == enemyLoc){
            this.gameOver();
        }
        kilometer ++;
        this.setState({kilometer: kilometer});
    },

    gameTick(turnOn){
        // Tick;
        if(turnOn){
           this.Tick = setInterval(this.bombOrNot, 100);
        }
        else{
            clearInterval(this.Tick);
        }
    },

    gameOver(){
        console.log('Game Over!')
        this.setState({gameState: 0});
        this.createEnemy(false);
        this.gameTick(false);
    },

    // componentWillMount(){
    // },

    componentDidMount(){
        window.addEventListener("keydown", this.gameHandle, false);
        // var enemy = document.getElementById('enemy')
        // enemy.addEventListener("webkitAnimationEnd",this.setAniEnd,false);
    },

    // componentDidUpdate(){
    // },

    render() {
        var state = this.state
        var enemyCls = state.gameState? ("enemy enemy"+ state.enemyType  + " loc" + state.enemyLoc):"enemy";
        return (
            <div className = "board" >
                <div className={ state.gameState? "roadbed roadrun":"roadbed"}></div>
                <div className="road">
                    <div className={state.heroLoc? "hero hero-right":"hero hero-left"} id="hero"></div>
                    <div className={enemyCls} id="enemy" ref="enemy"></div>
                </div>
                <span className = { state.gameState? "start hide":"start" } onClick = { this.gameStart }> Start </span>
                <span className="kilo"></span>
                <div className="failbub">
                    <span className="failtext"></span>
                    <span className="retry"></span>
                </div>
            </div>
        )
    }
});


class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return ( <GameBoard/>
        );
    }
}

// class Content extends React.Component {
//    render() {
//       return (
//          <h1>{this.props.id}</h1>
//       );
//    }
// }
// // App.defaultProps = {
// //    animal1: "Dog1",
// //    animal2: "Cat2"
// // }

export default App;
