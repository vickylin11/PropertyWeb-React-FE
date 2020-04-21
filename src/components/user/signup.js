import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd/lib/index';
import '../app/app.css';

class Signup extends Component {
    constructor(props) {
        super(props);
    }

    onFinish = values => {
        const { signUp, history } = this.props;
        signUp(
            {user: values },
            {history: history}
            );
    };

    onFinishFailed = errorInfo => {
        message.error("Sign up failed." + errorInfo);
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
                {errorMessage && message.error(`Sign up failed. ${errorMessage}`)}
                <h1 className="page-head">Sign Up</h1>
                <Form
                    {...layout}
                    name="signup-form"
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
                    <Form.Item label="First Name" name="first_name"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Please input your first name!',
                                   },
                               ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Last Name" name="last_name"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Please input your last name!',
                                   },
                               ]}
                    >
                        <Input />
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
        signUp: (params, meta) => dispatch({type: 'SIGN_UP', payload: params, meta})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);