import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Form, message } from 'antd/lib/index';
import { BarsOutlined } from '@ant-design/icons';
import '../app/app.css';

class AddRequest extends Component {
    constructor(props) {
        super(props);
    }

    onFinish = values => {
        const { sendRequest, user } = this.props;
        if(user && user.login) {
            values.userId = user.id;
            sendRequest(values);
        } else {
            message.error("Please login in order to send request");
        }
    };

    handleClick = () => {
        const { user, getAllRequests, getMyRequests, history } = this.props;
       if(user && user.type === "admin") {
           getAllRequests();
           history.push("./request");
       } else if(user && user.type === "client") {
           getMyRequests({userId: user.id});
           history.push("./request");
       } else {
           message.error("Please login in order to view requests");
       }
    };

    render() {
        const { TextArea } = Input;
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };
        return(
            <div>
                <Button type="primary"
                        style={{marginTop: "2%", marginLeft: "85%", height: "45px", width: "200px", fontSize: "18px"}}
                        onClick={this.handleClick}
                >
                    <BarsOutlined /> View Requests
                </Button>
                <h1 className="page-head"> Send My Request </h1>
                <Form
                    {...layout}
                    name="request-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                >
                    <Form.Item label="Title" name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your request summary!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Contents" name="content"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your request contents!',
                            },
                        ]}
                    >
                        <TextArea rows={8} />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Send Request
                    </Button>
                    </Form.Item>
                 </Form>
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
        sendRequest: (params) => dispatch({type: 'SEND_REQUEST', payload: params}),
        getAllRequests: (page) => dispatch({type: 'GET_ALL_REQUESTS', payload: page}),
        getMyRequests: (id) => dispatch({type:'GET_CLIENT_REQUESTS', payload: id})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRequest);