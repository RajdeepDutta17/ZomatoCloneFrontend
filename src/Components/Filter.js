import React from "react";
import "../Styles/filter.css";
import queryString from "query-string";
import axios from "axios";

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      locations: [],
      mealtype: undefined,
      location: undefined,
      cuisine: [],
      lcost: undefined,
      hcost: undefined,
      sort: 1,
      page: 1,
      pageCount: [],
    };
  }

  componentDidMount() {
    const qs = queryString.parse(this.props.location.search);
    const { mealtype, location } = qs;

    const filterObj = {
      mealtype: Number(mealtype),
      location: Number(location),
    };

    axios({
      method: "POST",
      url: "https://zomatoclonebackend-k1p2.onrender.com/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.restaurants,
          mealtype: Number(mealtype),
          location: Number(location),
          pageCount: response.data.pageCount,
        });
      })
      .catch((err) => console.log(err));

    axios({
      method: "GET",
      url: "https://zomatoclonebackend-k1p2.onrender.com/getAllLocations",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        this.setState({ locations: response.data.locations });
      })
      .catch((err) => console.log(err));
  }

  handleLocationChange = (e) => {
    const { mealtype, cuisine, lcost, hcost, sort, page } = this.state;

    const location = e.target.value;

    const filterObj = {
      mealtype,
      location,
      cuisine: cuisine.length === 0 ? undefined : cuisine,
      lcost,
      hcost,
      sort,
      page,
    };

    axios({
      method: "POST",
      url: "https://zomatoclonebackend-k1p2.onrender.com/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.restaurants,
          location,
          cuisine,
          lcost,
          hcost,
          sort,
          page,
          pageCount: response.data.pageCount,
        });
      })
      .catch((err) => console.log(err));
  };

  handleCuisineChange = (cuisineId) => {
    const { mealtype, cuisine, location, lcost, hcost, sort, page } =
      this.state;

    const index = cuisine.indexOf(cuisineId);

    if (index === -1) {
      cuisine.push(cuisineId);
    } else {
      cuisine.splice(index, 1);
    }

    const filterObj = {
      mealtype,
      cuisine: cuisine.length === 0 ? undefined : cuisine,
      location,
      lcost,
      hcost,
      sort,
      page,
    };

    axios({
      method: "POST",
      url: "https://zomatoclonebackend-k1p2.onrender.com/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.restaurants,
          cuisine,
          location,
          lcost,
          hcost,
          sort,
          page,
          pageCount: response.data.pageCount,
        });
      })
      .catch((err) => console.log(err));
  };

  handleCostChange = (lcost, hcost) => {
    const { mealtype, cuisine, location, sort, page } = this.state;

    const filterObj = {
      mealtype,
      cuisine: cuisine.length === 0 ? undefined : cuisine,
      location,
      lcost,
      hcost,
      sort,
      page,
    };

    axios({
      method: "POST",
      url: "https://zomatoclonebackend-k1p2.onrender.com/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.restaurants,
          cuisine,
          location,
          lcost,
          hcost,
          sort,
          page,
          pageCount: response.data.pageCount,
        });
      })
      .catch((err) => console.log(err));
  };

  handleSortChange = (sort) => {
    const { mealtype, cuisine, location, lcost, hcost, page } = this.state;

    const filterObj = {
      mealtype,
      cuisine: cuisine.length === 0 ? undefined : cuisine,
      location,
      lcost,
      hcost,
      sort,
      page,
    };

    axios({
      method: "POST",
      url: "https://zomatoclonebackend-k1p2.onrender.com/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.restaurants,
          cuisine,
          location,
          lcost,
          hcost,
          sort,
          page,
          pageCount: response.data.pageCount,
        });
      })
      .catch((err) => console.log(err));
  };

  handleNavigate = (resID) => {
    this.props.history.push(`/details?restaurant=${resID}`);
  };

  handlePageNumber = (page) => {
    const { mealtype, location, cuisine, lcost, hcost, sort } = this.state;

    const filterObj = {
      mealtype,
      location,
      cuisine: cuisine.length === 0 ? undefined : cuisine,
      lcost,
      hcost,
      sort,
      page,
    };

    axios({
      method: "POST",
      url: "https://zomatoclonebackend-k1p2.onrender.com/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.restaurants,
          mealtype,
          cuisine,
          location,
          lcost,
          hcost,
          sort,
          page: response.data.currentPage,
          pageCount: response.data.pageCount,
        });
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handlePageChange = (operationType) => {
    let { mealtype, location, cuisine, lcost, hcost, sort, page, pageCount } =
      this.state;

    if (page < pageCount[pageCount.length - 1] && operationType === "add") {
      page = page + 1;

      const filterObj = {
        mealtype,
        location,
        cuisine: cuisine.length === 0 ? undefined : cuisine,
        lcost,
        hcost,
        page,
        sort,
      };

      axios({
        method: "POST",
        url: "https://zomatoclonebackend-k1p2.onrender.com/filter",
        headers: { "Content-Type": "application/json" },
        data: filterObj,
      })
        .then((response) => {
          this.setState({
            restaurants: response.data.restaurants,
            mealtype,
            cuisine,
            location,
            lcost,
            hcost,
            sort,
            page: response.data.currentPage,
            pageCount: response.data.pageCount,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (page > pageCount[0] && operationType === "subtract") {
      page = page - 1;

      const filterObj = {
        mealtype,
        location,
        cuisine: cuisine.length === 0 ? undefined : cuisine,
        lcost,
        hcost,
        page,
        sort,
      };

      axios({
        method: "POST",
        url: "https://zomatoclonebackend-k1p2.onrender.com/filter",
        headers: { "Content-Type": "application/json" },
        data: filterObj,
      })
        .then((response) => {
          this.setState({
            restaurants: response.data.restaurants,
            mealtype,
            cuisine,
            location,
            lcost,
            hcost,
            sort,
            page: response.data.currentPage,
            pageCount: response.data.pageCount,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    const { restaurants, locations, pageCount, page } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row heading">Breakfast Places in Mumbai</div>
          <div className="row">
            <div className="col-3 col-sm-12 col-md-4 col-lg-3">
              <div className="filterPanel">
                <div className="filterPanelHeading">Filters</div>
                <div className="filterPanelSubHeading">Select Location</div>
                <select
                  name=""
                  id=""
                  className="locationSelection"
                  onChange={this.handleLocationChange}
                  defaultValue="0"
                >
                  <option value="0">Select Location</option>
                  {locations.map((item, index) => {
                    return (
                      <option
                        key={index}
                        value={item.location_id}
                      >{`${item.name},${item.city}`}</option>
                    );
                  })}
                </select>
                <div className="filterPanelSubHeading">Cusine</div>
                <input
                  type="checkbox"
                  className="cusineOption"
                  onChange={() => this.handleCuisineChange(1)}
                />
                <label>North Indian</label>
                <br />
                <input
                  type="checkbox"
                  className="cusineOption"
                  onChange={() => this.handleCuisineChange(2)}
                />
                <label>South Indian</label>
                <br />
                <input
                  type="checkbox"
                  className="cusineOption"
                  onChange={() => this.handleCuisineChange(3)}
                />
                <label>Chinese</label>
                <br />
                <input
                  type="checkbox"
                  className="cusineOption"
                  onChange={() => this.handleCuisineChange(4)}
                />
                <label>Fast Food</label>
                <br />
                <input
                  type="checkbox"
                  className="cusineOption"
                  onChange={() => this.handleCuisineChange(5)}
                />
                <label>Street Food</label>
                <br />
                <div className="filterPanelSubHeading">Cost for two</div>
                <input
                  type="radio"
                  className="cusineOption"
                  name="cost"
                  onChange={() => this.handleCostChange(1, 500)}
                />
                <label>Less than &#8377;500</label>
                <br />
                <input
                  type="radio"
                  className="cusineOption"
                  name="cost"
                  onChange={() => this.handleCostChange(500, 1000)}
                />
                <label>&#8377;500 to &#8377;1000</label>
                <br />
                <input
                  type="radio"
                  className="cusineOption"
                  name="cost"
                  onChange={() => this.handleCostChange(1000, 1500)}
                />
                <label>&#8377;1000 to &#8377;1500</label>
                <br />
                <input
                  type="radio"
                  className="cusineOption"
                  name="cost"
                  onChange={() => this.handleCostChange(1500, 2000)}
                />
                <label>&#8377;1500 to &#8377;2000</label>
                <br />
                <input
                  type="radio"
                  className="cusineOption"
                  name="cost"
                  onChange={() => this.handleCostChange(2000, 50000)}
                />
                <label>&#8377;2000+</label>
                <br />
                <div className="filterPanelSubHeading">Sort</div>
                <input
                  type="radio"
                  className="cusineOption"
                  name="price"
                  onChange={() => this.handleSortChange(1)}
                />
                <label>Price low to high</label>
                <br />
                <input
                  type="radio"
                  className="cusineOption"
                  name="price"
                  onChange={() => this.handleSortChange(-1)}
                />
                <label>Price high to low</label>
                <br />
              </div>
            </div>
            <div className="col-9 col-sm-12 col-md-8 col-lg-9 ">
              {restaurants.length > 0 ? (
                restaurants.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="resultsPanel cursor"
                      onClick={() => this.handleNavigate(item._id)}
                    >
                      <div className="row upperSection">
                        <div className="col-2">
                          <img
                            src={`./Assets/photo-${item.restaurant_id}.avif`}
                            alt="Food Image"
                            className="resultsImage"
                          />
                        </div>
                        <div className="col-10">
                          <div className="resultsHeading">{item.name}</div>
                          <div className="resultsSubHeading">
                            {item.locality}
                          </div>
                          <div className="resultsAddress">{item.city}</div>
                        </div>
                      </div>
                      <hr />
                      <div className="row lowerSection">
                        <div className="col-2">
                          <div className="reultsAddress">CUSINES:</div>
                          <div className="reultsAddress">COST FOR TWO:</div>
                        </div>
                        <div className="col-10">
                          <div className="resultsSubHeading">
                            {item.cuisine.map(
                              (cuisineItem) => `${cuisineItem.name}\t\t`
                            )}
                          </div>
                          <div className="resultsSubHeading">
                            &#8377;{item["min_price"]}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-records">No Records Found....</div>
              )}

              {/* <div className="resultsPanel">
                <div className="row upperSection">
                  <div className="col-2">
                    <img
                      src="./Assets/photo-1.avif"
                      alt="Food Image"
                      className="resultsImage"
                    />
                  </div>
                  <div className="col-10">
                    <div className="resultsHeading">The Bake Shop</div>
                    <div className="resultsSubHeading">FORT</div>
                    <div className="resultsAddress">
                      Shop 8,Plot E,Samruddhi Complex,Chincholi
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row lowerSection">
                  <div className="col-2">
                    <div className="reultsAddress">CUSINES:</div>
                    <div className="reultsAddress">COST FOR TWO:</div>
                  </div>
                  <div className="col-10">
                    <div className="resultsSubHeading">Bakery</div>
                    <div className="resultsSubHeading">&#8377;900</div>
                  </div>
                </div>
              </div> */}
              {restaurants.length > 0 ? (
                <div className="pagination">
                  <div
                    className="paginationButton"
                    onClick={() => this.handlePageChange("subtract")}
                    style={{ cursor: "pointer" }}
                  >
                    &laquo;
                  </div>
                  {pageCount.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="paginationButton"
                        style={{
                          cursor: "pointer",
                          backgroundColor: page === item ? "lightBlue" : null,
                        }}
                        onClick={() => this.handlePageNumber(item)}
                      >
                        {item}
                      </div>
                    );
                  })}
                  <div
                    className="paginationButton"
                    onClick={() => this.handlePageChange("add")}
                    style={{ cursor: "pointer" }}
                  >
                    &raquo;
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
