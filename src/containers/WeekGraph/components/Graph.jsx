/* eslint-disable react/prop-types */
import { CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { css } from 'emotion';
import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Graph = props => {
  const { dropdownOpen, toggle, graphData, year, dataYears, setNewYear } = props;
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
        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
    </div>
  );
};

export default Graph;
