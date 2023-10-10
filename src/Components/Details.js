import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../Styles/details.css";
import queryString from "query-string";
import axios from "axios";
import Modal from "react-modal";
import { loadStripe } from "@stripe/stripe-js";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "Poppins",
    cursor: "pointer",
  },
};

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurantData: [],
      menuItems: [],
      menuModalIsOpen: false,
      formModalIsOpen: false,
      subTotal: 0,
      userName: undefined,
      userEmail: undefined,
      userAddress: undefined,
      userNumber: undefined,
    };
  }

  componentDidMount() {
    const qs = queryString.parse(this.props.location.search);
    const { restaurant } = qs;

    axios({
      method: "GET",
      url: `https://zomatoclonebackend-k1p2.onrender.com/getAllRestaurantsById/${restaurant}`,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        this.setState({ restaurantData: response.data.restaurants });
      })
      .catch((err) => console.log(err));
  }

  handleModal = (state, value) => {
    this.setState({ [state]: value });

    if (state === "menuModalIsOpen" && value === true) {
      const { restaurantData } = this.state;
      const restaurant_id = restaurantData.map((item) => item.restaurant_id);

      axios({
        method: "GET",
        url: `https://zomatoclonebackend-k1p2.onrender.com/getAllMenuItemsByResId/${restaurant_id}`,
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          this.setState({ menuItems: response.data.items });
        })
        .catch((err) => console.log(err));
    }
  };

  addItems = (index, operationType) => {
    const { menuItems } = this.state;
    let total = 0;
    const items = [...menuItems];
    const item = items[0].menu[index];

    if (operationType === "add") {
      item.qty += 1;
    } else {
      item.qty -= 1;
    }
    items[0].menu[index] = item;
    items[0].menu.map((item) => {
      return (total += item.qty * item.price);
    });
    this.setState({ menuItems: items, subTotal: total });
  };

  handleFormData = (e, state) => {
    this.setState({ [state]: e.target.value });
  };

  handlePayment = async () => {
    const { userEmail, menuItems } = this.state;
    if (!userEmail) {
      alert("Please fill all the field and then click on proceed...");
    } else {
      // payment API
      const paymentObj = {
        email: userEmail,
        menu: menuItems,
      };
      const stripe = await loadStripe(process.env.REACT_APP_KEY);

      const response = await axios({
        method: "POST",
        url: "https://zomatoclonebackend-k1p2.onrender.com/payments",
        headers: { "Content-Type": "application/json" },
        data: paymentObj,
      });

      console.log(response);
      const session = await response.json();
      console.log(session);

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      }
    }
  };
  render() {
    const {
      restaurantData,
      menuItems,
      menuModalIsOpen,
      formModalIsOpen,
      subTotal,
    } = this.state;
    return (
      <div>
        <Carousel showThumbs={false} showIndicators={false}>
          <div className="imageBox">
            <img src="./Assets/dosa.webp" alt="Wallpaper" />
          </div>
          <div className="imageBox">
            <img src="./Assets/pancake.webp" alt="Wallpaper" />
          </div>
          <div className="imageBox">
            <img src="./Assets/Rice.jpg" alt="Wallpaper" />
          </div>
        </Carousel>
        <div className="headingBox">
          <div className="heading">
            {restaurantData.map((item) => item.name)}
          </div>
          <button
            className="btn-order"
            onClick={() => this.handleModal("menuModalIsOpen", true)}
          >
            Place Online Order
          </button>
        </div>
        <Tabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Contact</Tab>
          </TabList>
          <TabPanel style={{ marginLeft: "15px" }}>
            <h2 className="about">About this place</h2>
            <h5 className="head">Cuisine</h5>
            <p className="value">Bakery,Fast-Food.</p>
            <h5 className="head">Average Cost</h5>
            <p className="value">
              &#8377;{restaurantData.map((item) => item.min_price)} for two
              people(approx).
            </p>
          </TabPanel>
          <TabPanel style={{ marginLeft: "15px" }}>
            <h3 className="head">Phone Number</h3>
            <p className="value">
              +{restaurantData.map((item) => item.contact_number)}
            </p>
            <h3 className="head">{restaurantData.map((item) => item.name)}</h3>
            <p className="value">
              Shop 1,Plot D,Samruddhi Complex,Chincholi,Mumbai-40000 2,
              Maharastra.
            </p>
          </TabPanel>
        </Tabs>
        <Modal
          ariaHideApp={false}
          isOpen={menuModalIsOpen}
          style={customStyles}
        >
          <div className="restaurantBar">
            <h1 className="restaurantName">
              {restaurantData.map((item) => item.name)}
            </h1>
            <div
              className="cross"
              onClick={() => this.handleModal("menuModalIsOpen", false)}
            >
              &#10005;
            </div>
          </div>
          <div className="totalAmount">{`SubTotal: ${subTotal}`}</div>
          <button
            className="payBtn"
            onClick={() => {
              this.handleModal("formModalIsOpen", true);
              this.handleModal("menuModalIsOpen", false);
            }}
          >
            Pay Now
          </button>
          {menuItems.map((item) => (
            <div>
              {item.menu.map((items, index) => {
                return (
                  <div>
                    <div className="menuList">
                      <div>
                        <h3>{items.name}</h3>
                        <p>&#8377;{items.price}</p>
                        <p>{items.description}</p>
                      </div>
                      {items.qty === 0 ? (
                        <div className="orderBoxImage">
                          <img
                            className="orderImg"
                            src="./Assets/photo-1.avif"
                          />
                          <button
                            className="addBtn"
                            onClick={() => this.addItems(index, "add")}
                          >
                            Add
                          </button>
                        </div>
                      ) : (
                        <div className="orderBoxImage">
                          <img
                            className="orderImg"
                            src="./Assets/photo-1.avif"
                          />
                          <div>
                            <button
                              className="addBtn"
                              onClick={() => this.addItems(index, "subtract")}
                            >
                              -
                            </button>
                            <span className="addNumber">{items.qty}</span>
                            <button
                              className="addBtn"
                              onClick={() => this.addItems(index, "add")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          ))}
        </Modal>
        <Modal isOpen={formModalIsOpen} style={customStyles}>
          <div className="mainBox">
            <h1>{restaurantData.map((item) => item.name)}</h1>
            <div onClick={() => this.handleModal("formModalIsOpen", false)}>
              &#10005;
            </div>
          </div>
          <div className="detailsBox">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) => {
                this.handleFormData(e, "userName");
              }}
            />
          </div>
          <div className="detailsBox">
            <label>Email:</label>
            <input
              type="text"
              placeholder="Enter Your Email"
              onChange={(e) => {
                this.handleFormData(e, "userEmail");
              }}
            />
          </div>
          <div className="detailsBox">
            <label>Address:</label>
            <input
              type="text"
              placeholder="Enter Your Address"
              onChange={(e) => {
                this.handleFormData(e, "userAddress");
              }}
            />
          </div>
          <div className="detailsBox">
            <label>Contact Number:</label>
            <input
              type="number"
              placeholder="Enter Your Contact Details"
              onChange={(e) => {
                this.handleFormData(e, "userNumber");
              }}
            />
          </div>
          <div className="mainBoxBtn">
            <button className="proceedBtn" onClick={this.handlePayment}>
              Proceed
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Details;
