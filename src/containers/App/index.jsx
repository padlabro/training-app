import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from './components/Table';
import Filter from './components/Filter';
import Sort from './components/Sort';
import Container from './styled/Container';
import MainModal from '../MainModal';
import WeekGraph from '../WeekGraph/index';
import ErrorModal from '../ErrorModal';
import withSpinner from '../../shared/hocs/withSpinner';
import {
  fetchTrainings,
  handleFilterTrainings,
  handleSortTrainings,
  handleDeleteTraining,
  sortNewData
} from './Redux/actions';

const SortWithSpinner = withSpinner(Sort);
const MainModalWithSpinner = withSpinner(MainModal);

class App extends Component {
  state = {
    filter: {},
    sortBy: { type: 'date', direction: 'decrease', text: 'New first' }
  };

  async componentDidMount() {
    await this.props.fetchTrainings();
    this.sortData();
  }
  // check

  componentDidUpdate(nextProps) {
    const { data, edit, addedNewTraining } = this.props;
    if (nextProps.data !== data && (edit !== null || addedNewTraining)) {
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
    const { filter } = this.state;
    const { initialData } = this.props;
    const filters = [];
    // eslint-disable-next-line func-names
    Object.keys(filter).forEach(function(key) {
      if (this[key]) {
        filters.push(key);
      }
    }, filter);
    if (filters.length) {
      const filteredTrainings = initialData.filter(item => filters.includes(item.type));
      this.props.handleFilterTrainings(filteredTrainings);
    } else {
      this.props.handleFilterTrainings(initialData);
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
    const direction = this.state.sortBy.direction === 'increase' ? 1 : -1;
    const { data } = filteredData || this.props;
    const sortedData = [].slice.call(data).sort((a, b) => {
      if (type === 'distance') {
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
    const { trainings, sortBy } = this.state;
    const { isFetching, data } = this.props;
    return (
      <Container>
        <Filter
          trainings={trainings}
          handleFilterChange={this.handleFilterChange}
          handleSortChange={this.handleSortChange}
          handleSubmit={this.setFilter}
        />
        <SortWithSpinner isFetching={isFetching} sortData={this.handleSortData} sortBy={sortBy} />
        <Table trainings={data} deleteData={this.deleteData} />
        <WeekGraph />
        <MainModalWithSpinner isFetching={isFetching} />
        <ErrorModal />
      </Container>
    );
  }
}

App.propTypes = {
  fetchTrainings: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  edit: PropTypes.number,
  addedNewTraining: PropTypes.bool.isRequired,
  sortNewData: PropTypes.func.isRequired,
  handleFilterTrainings: PropTypes.func.isRequired,
  handleSortTrainings: PropTypes.func.isRequired,
  handleDeleteTraining: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  initialData: PropTypes.array.isRequired
};
App.defaultProps = {
  edit: null
};

export default connect(
  ({ table }) => ({
    isFetching: table.isFetching,
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
