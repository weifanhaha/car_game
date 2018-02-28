import React from 'react';
import './App.css';

var createReactClass = require('create-react-class');

var GameBoard = createReactClass({
    getInitialState() {
        return {
            gameState: 0,
            heroLoc: 0,
            enemyLoc: 0,
            enemyType : 0,
            aniEnd : true,
        }
    },

    gameStart() {
        this.setState({
            gameState: 1
        })
        this.createEnemy();
    },

    gameHandle(e) {
        if (this.state.gameState == 1) {
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

    createEnemy(){
        var that = this;
        var enemyClass,enemyLoc,enemyType,
              animationEnd = true;

        setInterval(function(){
            if(that.state.aniEnd && that.state.gameState == 1){
                that.setState({aniEnd : false});
                enemyType = Math.floor(Math.random()*3);
                enemyLoc = Math.round(Math.random());
                that.setState({enemyLoc : enemyLoc});
                that.setState({enemyType : enemyType});
            }
        },1000);
        that.refs.enemy.addEventListener("webkitAnimationEnd",
            // that.setState({aniEnd : true}),
            function(){that.setState({aniEnd : true});}
            , false);
    },

    componentDidMount(){
        window.addEventListener("keydown", this.gameHandle, false);
    },

    render() {
        var state = this.state
        var enemyCls = state.gameStart? ("enemy enemy"+ state.enemyType  + " loc" + state.enemyLoc):"enemy";
        return (
            <div className = "board" >
                <div className={ state.gameState? "roadbed roadrun":"roadbed"}></div>
                <div className="road">
                    <div className={state.heroLoc? "hero hero-right":"hero hero-left"}></div>
                    <div className={enemyCls}></div>
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
        // this.state = {
        //    name:"Wei"
        // }
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
