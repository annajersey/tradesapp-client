import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class App extends Component {
    constructor() {
        super();
        this.state = {
            response: false,
            endpoint: "http://127.0.0.1:5001"
        };
    }
    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint+'?symbols=ETHBTC,BTCUSDT');
        socket.on("TradesAPI", data => this.setState({ response: data }));
    }
    render() {
        const { response } = this.state;
        return (git init
            <div style={{ textAlign: "center" }}>
                {response
                    ? <p>
                        response2: {JSON.parse(response).curDayClose}
                    </p>
                    : <p>Loading...</p>}
            </div>
        );
    }
}
export default App;