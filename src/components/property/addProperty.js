import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, InputNumber, Button, Radio, Upload, message } from 'antd/lib/index';
import { UploadOutlined } from '@ant-design/icons';
import './addProperty.css';

class AddProperty extends Component {
    constructor(props) {
        super(props);
    }

    validateMessages = {
        required: '${label} is required!',
        types: {
            number: '${label} is not a validate number!',
        },
        number: {
            range: '${label} must be not less than ${min}',
        },
    };

    normFile = e => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    onFinish = values => {
        const { addProperty } = this.props;
        addProperty(values);
        message.success('You have successfully added your property.');
    };


    render() {
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };

        return(
            <div>
                <h1 className='header'> Add Property </h1>
                <Form {...layout} name="nest-messages" onFinish={values => this.onFinish(values)} validateMessages={this.validateMessages}>
                    <Form.Item name="name" label="Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="address" label="Address"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Price"
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name="type" label="House Type"
                               rules={[
                                   {
                                       required: true,
                                   },
                               ]}
                    >
                        <Radio.Group>
                            <Radio value="Apartment">Apartment</Radio>
                            <Radio value="House">House</Radio>
                            <Radio value="Unit">Unit</Radio>
                            <Radio value="Other">Other</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="purpose" label="Purpose"
                               rules={[
                                   {
                                       required: true,
                                   },
                               ]}
                    >
                        <Radio.Group>
                            <Radio value="For Rent">For Rent</Radio>
                            <Radio value="For Sale">For Sale</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="upload"
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={this.normFile}
                        extra="Please upload your property image."
                    >
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button>
                                <UploadOutlined /> Click to upload
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProperty: (params) => dispatch({type: 'ADD_PROPERTY', payload: params})
    };
};

export default connect(null, mapDispatchToProps)(AddProperty);