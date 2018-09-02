import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

class App extends Component {
    constructor() {
        super();
        this.state = {
            response: {},
            endpoint: "http://localhost:5001",
        };
        this.symbols = ['ETHBTC', 'BTCUSDT', 'ETHUSDT', 'KEYETH', 'NASBTC', 'NASETH',
            'NASBNB', 'MFTBTC']

    }

    componentDidMount() {
        const {endpoint} = this.state;

        axios.get(endpoint + '/symbols')
            .then(response => {

                this.symbols = {};
                for (let i in response.data) {
                    this.symbols[response.data[i].symbol] = response.data[i].baseasset + '/' + response.data[i].quoteasset;
                }

            })
            .catch(error => {
                console.log(error);
            });

        const socket = socketIOClient(endpoint + '?symbols=' + this.symbols.join());
        socket.on("TradesAPI", data => {
            let result = JSON.parse(data)
            let response = {...this.state.response, [result.symbol]: result};
            this.keys = Object.keys(result);
            this.setState({response})
        });
    }

    render() {
        const {response} = this.state;
        console.log(response)
        if (Object.keys(response).length) {
            let resultObject = {...this.state.response}
            let result = []
            for (var i in resultObject) {
                for (var j in  resultObject[i]) {
                    result[j] ? result[j].push(resultObject[i][j]) : result[j] = [resultObject[i][j]]
                }
            }
            return (
                <div>
                    <h2>Response</h2>
                    <div>
                        <table>
                            {Object.keys(result).map((key, index) => {
                                return <tr className={index % 2 ? 'odd' : 'even'}>
                                    <td>{key}</td>

                                    {result[key].map(item => <td>{key === 'symbol' ? this.symbols[item] : item}</td>)}
                                </tr>
                            })
                            }
                        </table>
                    </div>
                </div>
            )
        } else {
            return <div className="loading">Loading...</div>
        }
    }
}

export default App;