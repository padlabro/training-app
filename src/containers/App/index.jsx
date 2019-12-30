/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "./components/Table";
import Filter from "./components/Filter";
import Sort from "./components/Sort";
import Container from "./styled/Container";
import MainModal from "../../shared/modal/MainModal";
import WeekGraph from "../WeekGraph/index";
import {
  fetchTrainings,
  handleFilterTrainings,
  handleSortTrainings,
  handleDeleteTraining,
  sortNewData
} from "./Redux/actions";

class App extends Component {
  state = {
    filter: {},
    sortBy: { type: "date", direction: "decrease", text: "New first" }
  };

  async componentDidMount() {
    await this.props.fetchTrainings();
    this.sortData();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.data === this.props.data) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    if (this.props.edit !== null || this.props.addedNewTraining) {
      this.props.sortNewData();
      this.filterData();
      this.sortData();
    }
  }

  handleFilterChange = e => {
    const { name, checked } = e.target;
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        [name]: checked
      }
    }));
  };

  filterData = () => {
    const filters = [];
    // eslint-disable-next-line func-names
    Object.keys(this.state.filter).forEach(function(key) {
      if (this[key]) {
        filters.push(key);
      }
    }, this.state.filter);
    if (filters.length) {
      const filteredTrainings = this.props.initialData.filter(item =>
        filters.includes(item.type)
      );
      this.props.handleFilterTrainings(filteredTrainings);
    } else {
      this.props.handleFilterTrainings(this.props.initialData);
    }
  };

  handleSortData = e => {
    this.setState(
      {
        sortBy: {
          type: e.target.name,
          direction: e.target.id,
          text: e.target.innerText
        }
      },
      () => this.sortData()
    );
  };

  sortData = filteredData => {
    const { type } = this.state.sortBy;
    const direction = this.state.sortBy.direction === "increase" ? 1 : -1;
    const { data } = filteredData || this.props;
    const sortedData = [].slice.call(data).sort((a, b) => {
      if (type === "distance") {
        if (a[type] === b[type]) {
          return 0;
        }
        return a[type] > b[type] ? direction : direction * -1;
      }
      if (new Date(a[type]) === new Date(b[type])) {
        return 0;
      }
      return new Date(a[type]) > new Date(b[type]) ? direction : direction * -1;
    });
    this.props.handleSortTrainings(sortedData);
  };

  setFilter = async e => {
    e.preventDefault();
    await this.filterData();
    this.sortData();
  };

  deleteData = async e => {
    await this.props.handleDeleteTraining(e.currentTarget.id);
    this.filterData();
    this.sortData();
  };

  render() {
    return (
      <Container>
        <Filter
          trainings={this.state.trainings}
          handleFilterChange={this.handleFilterChange}
          handleSortChange={this.handleSortChange}
          handleSubmit={this.setFilter}
        />
        <Sort sortData={this.handleSortData} sortBy={this.state.sortBy} />
        <Table trainings={this.props.data} deleteData={this.deleteData} />
        <WeekGraph />
        <MainModal />
      </Container>
    );
  }
}

export default connect(
  ({ table }) => ({
    data: table.data,
    initialData: table.initialData,
    edit: table.edit,
    addedNewTraining: table.addedNewTraining
  }),
  {
    fetchTrainings,
    handleFilterTrainings,
    handleSortTrainings,
    handleDeleteTraining,
    sortNewData
  }
)(App);
