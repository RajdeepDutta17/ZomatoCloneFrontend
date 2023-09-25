import React from "react";
import "../Styles/header.css";
import Modal from "react-modal";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "Poppins",
  },
};

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      bgc: "",
      visblty: "",
      loginModalIsOpen: false,
      createAccountModalIsOpen: false,
      isLoggedIn: false,
      loggedInUser: undefined,
      userEmail: undefined,
      userPassword: undefined,
      firstName: undefined,
      lastName: undefined,
    };
  }

  componentDidMount() {
    const path = this.props.location.pathname;
    this.setDisplay(path);
  }

  setDisplay = (path) => {
    let bgcl, visb;
    if (path === "/") {
      bgcl = "#000000";
      visb = "hidden";
      this.setState({ bgc: bgcl, visblty: visb });
    }
  };

  handleModal = (state, value) => {
    this.setState({ [state]: value });
  };

  handleGoogleResponse = (response) => {
    const userData = jwt_decode(response.credential);
    this.setState({
      loggedInUser: userData.name,
      isLoggedIn: true,
      loginModalIsOpen: false,
    });
  };

  handleLogo = () => {
    this.props.history.push("/");
  };

  handleLoginData = (e, state) => {
    this.setState({ [state]: e.target.value });
  };

  handleLogin = () => {
    const { userEmail, userPassword } = this.state;

    const userDataObj = {
      email: userEmail,
      password: userPassword,
    };

    if (userEmail && userPassword) {
      axios({
        method: "POST",
        url: "http://localhost:3500/login",
        headers: { "Content-Type": "application/json" },
        data: userDataObj,
      })
        .then((response) => {
          console.log(response);
          if (response.data.user.length > 0) {
            this.setState({
              loggedInUser: `${response.data.user[0].firstName} ${response.data.user[0].lastName}`,
              isLoggedIn: true,
              loginModalIsOpen: false,
            });
          }
        })
        .catch(() => {
          this.setState({ loginModalIsOpen: false });
          alert(
            "You are not a registered user.Please create an account in order to login"
          );
        });
    } else {
      alert("Please fill in the Login details to proceed!!!");
    }
  };

  handleCreateAccount = () => {
    const { firstName, lastName, userEmail, userPassword } = this.state;

    const userDataObj = {
      email: userEmail,
      password: userPassword,
      firstName: firstName,
      lastName: lastName,
    };

    if (firstName && lastName && userEmail && userPassword) {
      axios({
        method: "POST",
        url: "http://localhost:3500/signup",
        headers: { "Content-Type": "application/json" },
        data: userDataObj,
      })
        .then(() => {
          this.setState({ createAccountModalIsOpen: false });
          alert("Account created successfully!!!");
        })
        .catch(() => {
          this.setState({ createAccountModalIsOpen: false });
          alert("Account is already registered!!!");
        });
    } else {
      alert("Please provide the details in order to create an account!!!!");
    }
  };

  render() {
    const {
      bgc,
      visblty,
      loginModalIsOpen,
      isLoggedIn,
      loggedInUser,
      createAccountModalIsOpen,
    } = this.state;
    return (
      <div className="navbar" style={{ backgroundColor: bgc }}>
        <div
          className="logo"
          style={{ visibility: visblty, cursor: "pointer" }}
          onClick={this.handleLogo}
        >
          Zomato!
        </div>
        {!isLoggedIn ? (
          <div className="button">
            <div
              className="btn-1"
              onClick={() => this.handleModal("loginModalIsOpen", true)}
            >
              Login
            </div>
            <div
              className="btn-2"
              onClick={() => this.handleModal("createAccountModalIsOpen", true)}
            >
              Create an account
            </div>
          </div>
        ) : (
          <div className="button">
            <div className="btn-1" style={{ border: "none" }}>
              {loggedInUser}
            </div>
            <div
              className="btn-2"
              onClick={() => this.handleModal("isLoggedIn", false)}
            >
              Logout
            </div>
          </div>
        )}

        <Modal isOpen={loginModalIsOpen} style={customStyles}>
          <div className="loginHeader">
            <h2>Login</h2>
            <div
              onClick={() => this.handleModal("loginModalIsOpen", false)}
              style={{ cursor: "pointer" }}
            >
              &#10005;
            </div>
          </div>
          <div className="inputBox">
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => this.handleLoginData(e, "userEmail")}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => this.handleLoginData(e, "userPassword")}
            />
          </div>
          <div className="buttons">
            <button
              type="button"
              className="btn btn-success"
              onClick={this.handleLogin}
            >
              Login
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => this.handleModal("loginModalIsOpen", false)}
            >
              Cancel
            </button>
          </div>
          <div className="socialMediaBtn">
            <GoogleOAuthProvider clientId="64496077712-33q2t03jk06selp9b6l15n82ado3c088.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={this.handleGoogleResponse}
                onError={() => {
                  console.log("Login Failed");
                }}
                size="large"
                theme="filled_blue"
                text="Continue with Google"
                width="310px"
                auto_select={false}
              />
            </GoogleOAuthProvider>
          </div>
        </Modal>
        <Modal isOpen={createAccountModalIsOpen} style={customStyles}>
          <div className="loginHeader">
            <h2>SignUp</h2>
            <div
              onClick={() =>
                this.handleModal("createAccountModalIsOpen", false)
              }
              style={{ cursor: "pointer" }}
            >
              &#10005;
            </div>
          </div>
          <div className="inputBox">
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => this.handleLoginData(e, "firstName")}
            />
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => this.handleLoginData(e, "lastName")}
            />
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => this.handleLoginData(e, "userEmail")}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => this.handleLoginData(e, "userPassword")}
            />
          </div>
          <div className="buttons">
            <button
              type="button"
              className="btn btn-success"
              onClick={this.handleCreateAccount}
            >
              Proceed
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() =>
                this.handleModal("createAccountModalIsOpen", false)
              }
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Header;
