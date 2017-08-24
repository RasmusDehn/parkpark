import React, { Component } from 'react';
import moment from 'moment';
import './Park.css';

class Park extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parkingDataFiveMinutes: []
        }

    }
    sortByCompany() {
        var sorted = this.state.parkingDataFiveMinutes.sort((a, b) => a.providerId > b.providerId)
        this.setState({ parkingDataFiveMinutes: sorted })
    }
    componentDidMount() {

        //Moment library benyttet til at formatere tid, og trække fem minutter fra
        //Tilføjet fem minutters "forsinkelse", da jeg oplevede problemer med at hente de sidste fem minutter fra "nu"
        var nowMinutes = moment().subtract(5,'minutes').format("HH:mm").toString()
        var FiveMinAgo = moment().subtract(10, 'minutes').format("YYYY/MM/DD/HH:mm").toString()

        //loading takes time
        fetch('http://data.kk.dk/parking/' + FiveMinAgo + "-" + nowMinutes)
            .then((response) => response.json())
            .then((json) => {
                this.setState({ parkingDataFiveMinutes: json.results })
            })
            .catch((err) => {
                // Handle error
            })
    }

    render() {
        var parkingFiveMinutes = this.state.parkingDataFiveMinutes

        if (parkingFiveMinutes.length < 1) {

            return (
                <div>
                    Indlæser parkeringer for de sidste fem minutter...
                </div>
            )
        }
        else {
            return (
                <div>
                    Antal parkeringer de sidste 5 minutter: {
                        parkingFiveMinutes.length
                    }
                    <br />
                    Parkeringer for EasyPark: {
                        parkingFiveMinutes.filter(x => x.providerId === "EasyPark").length

                    }
                    <br />
                    Liste over parkeringer: <br />{
                        <table>
                            <tr>
                                <td>
                                    <b>Area</b>
                                </td>
                                <td>
                                    <b>AreaManager</b>
                                </td>
                                <td>
                                    <b className="pointer underline" onClick={this.sortByCompany.bind(this)}>Provider(klik for at sortere)</b>
                                </td>
                                <td>
                                    <b>Selling point</b>
                                </td>
                                <td>
                                    <b>Valid from</b>
                                </td>
                                <td>
                                    <b>Valid until</b>
                                </td>
                                <td>
                                    <b>Coordinates</b>
                                </td>
                            </tr>
                            {
                                parkingFiveMinutes.map((park) =>
                                    <tr>
                                        <td>{park.areaId}</td>
                                        <td>{park.areaManagerId}</td>
                                        <td>{park.providerId}</td>
                                        <td>{park.sellingPointId}</td>
                                        <td>{park.validityBegin}</td>
                                        <td>{park.validityEnd}</td>
                                        <td>{park.sellingPointLocation}</td>
                                    </tr>

                                )
                            }
                        </table>
                    }
                </div>
            )
        }

    }
}

export default Park;