import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Upload, Button, Icon, message } from "antd";
import axios from "axios";
const FormItem = Form.Item;

class UploadForm extends Component {
    state = {
        fileList: [],
        uploading: false
    };

    handleUpload = async () => {
        this.props.reset();
        const { fileList } = this.state;
        const formData = new FormData();
        formData.append("file", fileList[0]);

        this.setState({
            uploading: true
        });

        try {
            let response = await axios.post("/api/report/file", formData);           
            this.props.setReport(response.data.reportLines);
            // console.log(response.data);
        } catch (error) {
            this.props.setError(error.response.data.message);
            // console.log(error);
        }
        this.setState({
            uploading: false
        });
    };

    render() {
        const { uploading } = this.state;
        const props = {
            accept: "text/*",
            action: "/api/report/file",
            onRemove: file => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList
                    };
                });
            },
            beforeUpload: file => {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (isLt2M) {
                    this.setState({
                        fileList: [file]
                    });
                } else {
                    message.error('The file must be smaller than 2MB!');
                }
                return false;
            },
            fileList: this.state.fileList
        };

        return (
            <Form>
                <FormItem>
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> Select File
                        </Button>
                    </Upload>
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        onClick={this.handleUpload}
                        disabled={this.state.fileList.length === 0}
                        loading={uploading}
                    >
                        {uploading ? "Uploading" : "Submit"}
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default UploadForm;