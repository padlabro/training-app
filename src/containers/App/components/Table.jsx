/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { Table } from "reactstrap";
import { css } from "emotion";
import Training from "./Training";

const Main = props => {
  return (
    <div
      className={css`
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
          {props.trainings.length ? (
            props.trainings.map((item, i) => {
              return (
                <Training
                  i={i}
                  key={item.id}
                  data={item}
                  deleteData={props.deleteData}
                />
              );
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
    </div>
  );
};

export default Main;
