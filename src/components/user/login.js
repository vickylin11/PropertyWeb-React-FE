import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd/lib/index';
import '../app/app.css';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    onFinish = values => {
        const { login, history} = this.props;
        login(
            {user: values },
            {history: history}
            );
            // setTimeout(() => {  this.props.history.push('/property'); }, 2000);
    };

    onFinishFailed = errorInfo => {
        message.error(errorInfo);
    };

    render() {
        const { errorMessage } = this.props;
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
                {errorMessage && message.error(`Login failed. ${errorMessage}`)}
                <h1 className="page-head"> Login </h1>
                <Form
                    {...layout}
                    name="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={value => this.onFinish(value)}
                    onFinishFailed={error => this.onFinishFailed(error)}
                >
                    <Form.Item label="Email" name="email"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Please input your email!',
                                   },
                               ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="password"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Please input your password!',
                                   },
                               ]}
                    >
                        <Input.Password style={{width: '50%'}}/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.user.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (params, meta) => dispatch({type: 'LOGIN', payload: params, meta})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);