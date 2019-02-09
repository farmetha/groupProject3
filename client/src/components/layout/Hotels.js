import React, { Component, Fragment } from "react";
import axios from "axios";

class Hotels extends Component {
  state = {
    selectedHotel: {}
  }

  handleClick = (event) => {
    event.preventDefault();
    let queryURL = encodeURI(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyDPmxGsaHT-silFQUJO898ABopWlQswjB8&placeid=${this.props.hotels[event.target.id].place_id}`);
    console.log(queryURL);

    axios.get(queryURL)
      .then(res => {
        console.log(res.data);
        this.setState({ selectedHotel: res.data.result });
      });
    console.log(this.state.selectedHotel);
  }

  render() {

    return (
      <div>
        <ul>
          {this.props.hotels.map((hotel, index) =>
            <li data-key={hotel.id}>
              {hotel.name}<br></br>
              {this.state.selectedHotel.id === hotel.id ? (
                <Fragment>
                  {this.state.selectedHotel.formatted_address}
                </Fragment>
              ) : (
                <Fragment>
                  <button onClick={this.handleClick} id={index} className="btn btn-outline-dark waves-effect waves-light hoverable">Get More Info</button>
                </Fragment>
              )}
            </li>
          )}
        </ul>

        {/* {this.state.selectedEvent ? (
        <Fragment>
          <SelectedEvent selectedEvent={this.state.selectedEvent}/>
          <button onClick={this.handleBack} className="btn btn-outline-dark waves-effect waves-light hoverable">Back to All Events</button>
        </Fragment>  
        ) : (
          <Fragment>
            <h1>{`${this.props.artist}`}</h1>
            <ul>
              {this.state.events.map((event, index) =>
                <li key={event.id}>
                  {event.name} - {event._embedded.venues[0].name} - {event._embedded.venues[0].city.name}, {event._embedded.venues[0].state.name} - {event.dates.start.localDate} {event.dates.start.localTime}<br></br>
                  <button onClick={this.handleClick} id={index} className="btn btn-outline-dark waves-effect waves-light hoverable">Select Event</button>
                </li>
              )}
            </ul>
          </Fragment>
        )} */}
      </div>
    );
  }
};

export default Hotels;