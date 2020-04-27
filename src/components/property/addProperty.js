import React, { Component } from 'react';
import { connect } from 'react-redux';
import {storage} from "../../config/firebase";
import { Form, Input, InputNumber, Button, Radio, Upload, message } from 'antd/lib/index';
import { UploadOutlined } from '@ant-design/icons';
import './addProperty.css';

class AddProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: null
        };
    }

    normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    onFinish = values => {
        const { addProperty, history } = this.props;
        const { imageUrl } = this.state;
        if(imageUrl) {
            values.image = imageUrl;
            addProperty({
                property: values,
                history: history
            });
        } else {
            message.error("Image is still uploading");
        }
    };

    beforeUpload = (file) => {
        const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJPGorPNG) {
            message.error('You can only upload JPG and PNG file!');
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('Image must smaller than 5MB!');
        }
        return isJPGorPNG && isLt5M;
    };


    customRequest = ({file}) => {
        console.log(file);
        const uploadTask = storage.ref(`images/${file.name}`).put(file);
        uploadTask.on('state_changed',
            (snapshot) => {
                console.log(snapshot);
            },
            (error) => {
                console.log(error);
                },
            () => {
                storage.ref('images').child(file.name).getDownloadURL().then(url => {
                    this.setState({imageUrl: url});
            })
            });
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

        const validateMessages = {
            required: '${label} is required!',
            types: {
                number: '${label} is not a validate number!'
            },
            number: {
                range: '${label} must be not less than ${min}'
            },
        };

        return(
            <div>
                <h1 className='header'> Add Property </h1>
                <Form {...layout} name="nest-messages" onFinish={values => this.onFinish(values)} validateMessages={validateMessages}>
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
                        <Upload listType="picture"
                                beforeUpload={this.beforeUpload}
                                customRequest={this.customRequest}
                                showUploadList={false}
                        >
                            <Button>
                                <UploadOutlined /> Click to upload
                            </Button>
                            <img src={this.state.imageUrl} className="image-display" />
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