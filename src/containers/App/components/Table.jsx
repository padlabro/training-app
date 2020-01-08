import React from 'react';
import { Table } from 'reactstrap';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import Training from './Training';

const Main = props => {
  const { trainings, deleteData, children } = props;
  return (
    <div
      className={css`
        min-height: 140px;
        max-height: 500px;
        grid-area: table;
        overflow-y: auto;
      `}
    >
      <Table
        dark
        hover
        className={css`
          margin-bottom: 0;
        `}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Type of training</th>
            <th>Distance</th>
            <th>Сomment</th>
          </tr>
        </thead>
        <tbody>
          {trainings.length ? (
            trainings.map((item, i) => {
              return <Training id={i} key={item.id} data={item} deleteData={deleteData} />;
            })
          ) : (
            <tr>
              <th scope="row">---</th>
              <td>---</td>
              <td>---</td>
            </tr>
          )}
        </tbody>
      </Table>
      {children}
    </div>
  );
};

Main.propTypes = {
  deleteData: PropTypes.func.isRequired,
  trainings: PropTypes.array.isRequired,
  children: PropTypes.object
};
Main.defaultProps = {
  children: undefined
};
export default Main;
