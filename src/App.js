import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class App extends Component {
    constructor() {
        super();
        this.state = {
            response: {},
            endpoint: "http://dcodeit.net:5001",

        };
        this.symbols = ['ETHBTC', 'BTCUSDT', 'ETHUSDT']

    }
    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint+'?symbols='+this.symbols.join());
        socket.on("TradesAPI", data => {
            let result = JSON.parse(data)
            let response = {...this.state.response, [result.symbol]: result};
            this.keys=Object.keys(result);
            this.setState({response})
        });
    }
    render() {
        const { response } = this.state;
        console.log(response)
        if(Object.keys(response).length){
            let resultObject = {...this.state.response}
            let keys =  <tr>{this.keys.map(k=><td>{k}</td>)}</tr>
            let values =  Object.keys(resultObject).map(function(key, index) {
                return <tr>
                    {Object.keys(resultObject[key]).map((key2, index2) => <td>{resultObject[key][key2]}</td>)}
                </tr>
            });

            // let result = Object.keys(resultObject).map(function(key) {
            //     return Object.keys(resultObject[key]).map(function(key2) {
            //         return <tr>
            //             <td>{resultObject[key][key2]}</td>
            //         </tr>
            //     });});

        return (
            <div>
                <h2>Response</h2>
                <div>
                    <table>
                        {values}
					</table>
                </div>


            </div>
        )}else{
            return 'Loading...'
        }
    }
}
export default App;