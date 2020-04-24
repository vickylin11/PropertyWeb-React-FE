import React, { Component } from 'react';
import HomeImg from "../../resource/homeimg.jpg"


class Home extends Component {
    render() {
        return(
            <div>
                <img src={HomeImg} alt="This is the home page" className="home-img"/>
            </div>
        );
    }
}

export default Home;