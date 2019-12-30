/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { css } from "emotion";
import Edit from "react-icons/lib/md/mode-edit";
import Delete from "react-icons/lib/md/delete-forever";
import { connect } from "react-redux";
import { handleEditTraining } from "../Redux/actions";

const Training = props => {
  const editTraining = e => {
    props.handleEditTraining(e.currentTarget.id);
  };

  return (
    <tr>
      <th scope="row">{props.data.date}</th>
      <td>{props.data.type}</td>
      <td>{props.data.distance}</td>
      <td>{props.data.comment}</td>
      <td
        className={css`
          text-align: right;
        `}
      >
        <Edit
          id={props.i}
          size={24}
          className={css`
            margin-right: 20px;
            cursor: pointer;
          `}
          onClick={editTraining}
        />
        <Delete
          id={props.data.id}
          onClick={props.deleteData}
          size={24}
          className={css`
            cursor: pointer;
          `}
        />
      </td>
    </tr>
  );
};

export default connect(null, { handleEditTraining })(Training);
