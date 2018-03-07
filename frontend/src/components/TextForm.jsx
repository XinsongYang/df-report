import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button } from "antd";
import axios from "axios";
const FormItem = Form.Item;
const TextArea = Input.TextArea;

class TextForm extends Component {
    handleSubmit = async e => {
        e.preventDefault();
        this.props.reset();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // console.log("Received values of form: ", values);
                try {
                    let response = await axios.post(
                        "/api/report/text",
                        values
                    );
                    this.props.setReport(response.data.reportLines);
                    // console.log(response.data);
                } catch (error) {
                    this.props.setError(error.response.data.message);
                    // console.log(error);
                }
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator("text", {
                        rules: [
                            {
                                required: true,
                                message:
                                    "Please input the outputs of teh df command!"
                            }
                        ]
                    })(
                        <Input.TextArea
                            autosize={{ minRows: 6, maxRows: 12 }}
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

TextForm = Form.create()(TextForm);

export default TextForm;