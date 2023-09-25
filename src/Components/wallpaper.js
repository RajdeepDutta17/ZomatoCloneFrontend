import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Wallpaper extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      inputText: "",
      suggestions: [],
    };
  }

  handleLocation = (e) => {
    const locID = e.target.value;
    sessionStorage.setItem("LocationId", locID);

    axios({
      method: "GET",
      url: `https://zomatoclonebackend-k1p2.onrender.com/getAllRestaurantsByLocationID/${locID}`,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) =>
        this.setState({ restaurants: response.data.restaurants })
      )
      .catch((err) => console.log(err));
  };

  handleSearch = (e) => {
    const inputText = e.target.value;
    const { restaurants } = this.state;
    let suggestions = [];

    if (inputText !== "") {
      suggestions = restaurants.filter((item) =>
        item.name.toLowerCase().includes(inputText.toLowerCase())
      );
    }
    this.setState({ suggestions, inputText });
  };

  selectingRestaurant = (resObj) => {
    this.props.history.push(`/details?restaurant=${resObj._id}`);
  };

  showSuggestions = () => {
    const { suggestions, inputText } = this.state;

    if (suggestions.length === 0 && inputText === undefined) {
      return null;
    } else if (suggestions.length > 0 && inputText === undefined) {
      return null;
    } else if (suggestions.length === 0 && inputText) {
      return (
        <ul>
          <li>No Search Results Found</li>
        </ul>
      );
    } else {
      return (
        <ul>
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => this.selectingRestaurant(item)}
            >{`${item.name}--${item.locality},${item.city}`}</li>
          ))}
        </ul>
      );
    }
  };

  render() {
    const { locationsData } = this.props;
    return (
      <div className="topSection">
        <img src="./Assets/images.avif" alt="Wallpaper" />
        {/* <div className="topSection__btn">
          <button className="btn-1">Login</button>
          <button className="btn-2">Create Account</button>
        </div> */}
        <div className="topSection__content">
          <div className="logo">Zomato!</div>
          <div className="heading">
            Find the best restaurants,cafes and bars
          </div>
          <div className="topSection__searchOptions">
            <div className="dropDown">
              <select
                className="content-dropDown"
                onChange={this.handleLocation}
              >
                <option value="0" disabled selected>
                  Select
                </option>
                {locationsData.map((item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.location_id}
                    >{`${item.name},${item.city}`}</option>
                  );
                })}
              </select>
            </div>
            <div className="searchIcon">
              <img src="./Assets/search.svg" alt="logo" />
            </div>
            <div className="searchBar">
              <input
                className="content-searchBar"
                type="search"
                placeholder="Search for Restaurants"
                onChange={this.handleSearch}
              />
              <div className="suggestionBox">{this.showSuggestions()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Wallpaper);
