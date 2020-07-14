import React, { Component } from 'react';
import axios from 'axios';

import PeopleList from './PeopleList';

class App extends Component {
  state = {
    people: null,
    loading: false,
    value: ''
  };

  search = async val => {
    this.setState({ loading: true });
    const res = await axios(
      `https://api.themoviedb.org/3/search/person?query=${val}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`
    );
    const people = await res.data.results;

    this.setState({ people, loading: false });
  };

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };

  get renderPeople() {
    let people = ""
    if (this.state.people && this.state.value.length>0) {
      people = <PeopleList list={this.state.people} />;
    }

    return people;
  }

  render() {
    return (
      <div>
        <input
          value={this.state.value}
          onChange={e => this.onChangeHandler(e)}
          placeholder="Type something to search"
        />
        {this.renderPeople}
      </div>
    );
  }
}

export default App;