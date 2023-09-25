import React from "react";
import axios from "axios";
import Wallpaper from "./wallpaper";
import QuickSearch from "./QuickSearch";
import "../Styles/home.css";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      mealtypes: [],
    };
  }

  componentDidMount() {
    sessionStorage.clear();
    axios({
      method: "GET",
      url: "https://zomatoclonebackend-k1p2.onrender.com/getAllLocations",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        this.setState({ locations: response.data.locations });
      })
      .catch((err) => console.log(err));

    axios({
      method: "GET",
      url: "https://zomatoclonebackend-k1p2.onrender.com/getAllMealtypes",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        this.setState({ mealtypes: response.data.mealtypes });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { locations, mealtypes } = this.state;
    return (
      <div className="containerBox">
        <Wallpaper locationsData={locations} />
        <QuickSearch mealtypesData={mealtypes} />
      </div>
    );
  }
}

export default Home;
