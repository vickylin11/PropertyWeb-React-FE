import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { HomeOutlined, CommentOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons';
import './navigation.css';


class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    handleLogOut = () => {
        const { signOut, user } = this.props;
        signOut(user.id);
    };

    render() {
        const { user } = this.props;
        console.log(user);
        return(
            <div>
                <h2 className="logo">Best Home</h2>
                <nav>
                    <ul className="nav-links">
                        <Link to="/">
                            <div className="nav-home">
                                <HomeOutlined />
                                <li>Home</li>
                            </div>
                        </Link>
                        <Link to="/property">
                            <div className="nav-property">
                                <ShopOutlined />
                                <li>Property</li>
                            </div>
                        </Link>
                        <Link to="/request">
                            <div className="nav-request">
                                <CommentOutlined />
                                <li>Request</li>
                            </div>
                        </Link>
                    </ul>
                    <div className="nav-button">
                        <UserOutlined />
                        {user && user.type === "admin" && "admin"}
                        {user && user.type === "client" && user.lastName}
                        {user && user.login ?
                            <Button href={`/property`} onClick={this.handleLogOut}>Logout</Button> : <Button href={`/login`}>Login</Button>}
                        <Button href={`/sign-up`}> Sign Up </Button>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: (id) => dispatch({type: 'SIGN_OUT', payload: id})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);