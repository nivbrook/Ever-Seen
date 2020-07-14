import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from 'react-router-dom'
import Search from "../search/Search";
import SearchPeople from "../search/SearchPeople"
import axios from "axios";
import getSeeList from "../../actions/getSeeList";
class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    localStorage.setItem("user", JSON.stringify(user))
    // getSeeList();
    console.log(JSON.parse(localStorage.getItem("seeList")))
    
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}<br/>
              <h4>Your <Link to="/seen">"SEEN"</Link> List</h4>
              <p className="flow-text grey-text text-darken-1">
                Enter a Movie You've Seen
              </p>
            </h4>
            <Search/>
            <p className="flow-text grey-text text-darken-1">Enter an Actor, Director, or Writer</p>
            <SearchPeople/>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
