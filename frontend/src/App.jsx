import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Tabs, Alert } from 'antd';
const TabPane = Tabs.TabPane;
import axios from 'axios';
import { TextForm, UploadForm, Report } from './components/index';
import './style.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportLines: [],
            error: ""
        };
    }

    setReport = reportLines => {
        this.setState({
            reportLines
        })
    }

    setError = error => {
        this.setState({
            error
        })
    }

    reset = () => {
        this.setState({
            reportLines: [],
            error: ""
        });
    }

    render() {
        return (
            <div style={{width: "600px", margin: "0 auto"}}>
                <div>
                    <Tabs defaultActiveKey="paste" >
                        <TabPane tab="Paste" key="paste">
                            <TextForm setReport={this.setReport} setError={this.setError} reset={this.reset} />
                        </TabPane>
                        <TabPane tab="Attach" key="attach">
                            <UploadForm setReport={this.setReport} setError={this.setError} reset={this.reset} />
                        </TabPane>
                    </Tabs>
                </div>
                { this.state.error && <Alert message={ this.state.error } type="error" showIcon /> }
                { this.state.reportLines && <Report reportLines={this.state.reportLines} /> }
            </div>
        );
    }
}

export default App;

/*
<Router>
    <Switch>
        <Route exact path="/" render={() => (
            
        )}/>

        <Route render={() => (
            <Redirect to="/"/>
        )}/>
    </Switch>
</Router>
*/