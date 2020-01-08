/* eslint-disable react/prop-types */
import { connect } from 'react-redux';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import Graph from './components/Graph';

const RenderLineChart = props => {
  const [dropdownOpen, setOpen] = useState(false);
  const [graphData, setGraphData] = useState({});
  const [year, setYear] = useState(moment().year());
  const [dataYears, setDataYears] = useState([]);

  useEffect(() => {
    fillWeeksSelectedYear();
  }, [props.data, year]);

  const fillWeeksSelectedYear = () => {
    const yearWeeks = [];
    const yearsOfData = new Set();
    let numOfweeks = 1;
    props.data.forEach(item => {
      yearsOfData.add(moment(item.date).year());
    });

    setDataYears(Array.from(yearsOfData));
    const func = moment(year);
    if (
      func.startOf('isoWeek').format('DD') <= 28 &&
      func.startOf('isoWeek').format('MM') === '12'
    ) {
      numOfweeks = 0;
    }
    for (let i = 1; i <= 53; i++) {
      yearWeeks.push({
        month: `${func.format('MMMM')}`,
        week: numOfweeks,
        distance: 0,
        name: `${func.startOf('isoWeek').format('DD MMM')}-${func
          .endOf('isoWeek')
          .format('DD MMM')}`
      });
      func.startOf('isoWeek').add(1, 'isoWeek');
    }
    calcDistanceForSelectedYear(yearWeeks);
  };
  const calcDistanceForSelectedYear = yearWeeks => {
    const weeksOfYear = yearWeeks;
    props.data.forEach(item => {
      if (moment(item.date).year() === Number(year)) {
        if (moment(item.date).isoWeek() >= 52 && moment(item.date).get('month') === 0) {
          weeksOfYear[0].distance += item.distance;
          return;
        }
        if (moment(item.date).isoWeek() === 1 && moment(item.date).get('month') === 11) {
          weeksOfYear[52].distance += item.distance;
          return;
        }
        weeksOfYear[moment(item.date).isoWeek() - yearWeeks[0].week].distance += item.distance;
      }
      if (moment(item.date).year() === Number(year) + 1) {
        if (
          moment(item.date)
            .endOf('isoWeek')
            .format('M') === '1' &&
          moment(item.date).get('month') === 0
        ) {
          weeksOfYear[52].distance += item.distance;
          return;
        }
      }
      if (moment(item.date).year() === Number(year) - 1) {
        if (
          moment(item.date)
            .endOf('isoWeek')
            .format('M') === '1' &&
          moment(item.date).get('month') === 0
        ) {
          weeksOfYear[0].distance += item.distance;
        }
      }
    });
    setGraphData(weeksOfYear);
  };

  const setNewYear = e => {
    setYear(e.currentTarget.innerText);
  };
  const toggle = () => setOpen(!dropdownOpen);

  return (
    <Graph
      dropdownOpen={dropdownOpen}
      setNewYear={setNewYear}
      toggle={toggle}
      graphData={graphData}
      dataYears={dataYears}
      year={year}
    />
  );
};

export default connect(({ table }) => ({ data: table.data }))(RenderLineChart);
