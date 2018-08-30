import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class App extends Component {
    constructor() {
        super();
        this.state = {
            response: false,
            endpoint: "http://dcodeit.net:5001"
        };
    }
    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint+'?symbols=ETHBTC,BTCUSDT');
        socket.on("TradesAPI", data => this.setState({ response: data }));
    }
    render() {
        const { response } = this.state;
        if(response){
            let resultObject = JSON.parse(response);
            let result =  Object.keys(resultObject).map(function(key, index) {
                return <div>{resultObject[key]}</div>
            });
        return (
            <div>
                <b>Response</b>:
                <div>
                    {
                        result
                    }
                </div>


            </div>
        )}else{
            return 'Loading...'
        }
    }
}
export default App;