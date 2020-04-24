import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, message } from 'antd/lib/index';
import '../app/app.css';
import './requestDetail.css';

class RequestDetail extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { getRequestDetails } = this.props;
        const { id } = this.props.match.params;
        getRequestDetails(id);
    }

    handleButtonClick = () => {
        const { resolveRequest, currentRequest } = this.props;
        resolveRequest(currentRequest.id);
        message.success("Request has been resolved.")
    };

    render() {
        const { currentRequest, user } = this.props;
        return(
            !currentRequest ? <h2> Loading... </h2> :
                <div>
                    <h1 className="page-head"> Request Details </h1>
                    <div className="request-detail">
                        <Button type="primary"
                                onClick={this.handleButtonClick}
                                disabled={user && user.type === "client"}
                                className="status-button"
                        >
                            {currentRequest.resolved ? "Resolved" : "Pending"}
                        </Button>
                        <h2> Request Title: {currentRequest.title} </h2>
                        <h2> Request Time: {currentRequest.createdAt} </h2>
                        <h2> Request Contents: {currentRequest.content}</h2>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentRequest: state.request.currentRequest,
        user: state.user.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRequestDetails: (id) => dispatch({type: 'GET_REQUEST_DETAIL', payload: id}),
        resolveRequest: (id) => dispatch({type: 'RESOLVE_REQUEST', payload: id})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestDetail);