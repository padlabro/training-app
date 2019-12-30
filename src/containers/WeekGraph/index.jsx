/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area
} from "recharts";
import { css } from "emotion";
import { connect } from "react-redux";
import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const RenderLineChart = props => {
  const [dropdownOpen, setOpen] = useState(false);
  const [graphData, setGraphData] = useState({});
  const [year, setYear] = useState(2019);
  const [dataYears, setDataYears] = useState([]);

  useEffect(() => {
    const arr = [];
    const set = new Set();
    let numOfweeks = 1;
    props.data.forEach(item => {
      set.add(moment(item.date).year());
    });
    setDataYears(Array.from(set));
    const func = moment({ year });
    if (
      func.startOf("isoWeek").format("DD") <= 28 &&
      func.startOf("isoWeek").format("MM") === "12"
    ) {
      numOfweeks = 0;
    }
    for (let i = 1; i <= 53; i++) {
      arr.push({
        month: `${func.format("MMMM")}`,
        week: numOfweeks,
        distance: 0,
        name: `${func.startOf("isoWeek").format("DD MMM")}-${func
          .endOf("isoWeek")
          .format("DD MMM")}`
      });
      func.startOf("isoWeek").add(1, "isoWeek");
    }

    props.data.forEach(item => {
      if (moment(item.date).year() === Number(year)) {
        if (
          moment(item.date).isoWeek() >= 52 &&
          moment(item.date).get("month") === 0
        ) {
          arr[0].distance += item.distance;
          return;
        }
        if (
          moment(item.date).isoWeek() === 1 &&
          moment(item.date).get("month") === 11
        ) {
          arr[52].distance += item.distance;
          return;
        }
        arr[moment(item.date).isoWeek() - arr[0].week].distance +=
          item.distance;
      }
      if (moment(item.date).year() === Number(year) + 1) {
        if (
          moment(item.date)
            .endOf("isoWeek")
            .format("M") === "1" &&
          moment(item.date).get("month") === 0
        ) {
          arr[52].distance += item.distance;
          return;
        }
      }
      if (moment(item.date).year() === Number(year) - 1) {
        if (
          moment(item.date)
            .endOf("isoWeek")
            .format("M") === "1" &&
          moment(item.date).get("month") === 0
        ) {
          arr[0].distance += item.distance;
        }
      }
    });
    setGraphData(arr);
  }, [props.data, year]);

  const setNewYear = e => {
    setYear(e.currentTarget.innerText);
  };
  const toggle = () => setOpen(!dropdownOpen);

  return (
    <div
      className={css`
        margin-top: 20px;
        grid-area: graph;
      `}
    >
      <ButtonDropdown
        isOpen={dropdownOpen}
        toggle={toggle}
        className={css`
          margin-bottom: 10px;
        `}
      >
        <DropdownToggle caret>Show {year} data</DropdownToggle>
        <DropdownMenu>
          {dataYears.map(item => {
            return (
              <DropdownItem name="date" key={item} onClick={setNewYear}>
                {item}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </ButtonDropdown>
      <AreaChart
        width={1210}
        height={250}
        data={graphData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#778899" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#778899" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="distance"
          stroke="#778899"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </div>
  );
};

export default connect(({ table }) => ({ data: table.data }))(RenderLineChart);
