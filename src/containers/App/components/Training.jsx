import React from 'react';
import { css } from 'emotion';
import Edit from 'react-icons/lib/md/mode-edit';
import Delete from 'react-icons/lib/md/delete-forever';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleEditTraining } from '../Redux/actions';

const Training = props => {
  const { data, id, deleteData } = props;

  const editTraining = e => {
    props.handleEditTraining(Number(e.currentTarget.id));
  };

  return (
    <tr>
      <th scope="row">{data.date}</th>
      <td>{data.type}</td>
      <td>{data.distance}</td>
      <td>{data.comment}</td>
      <td
        className={css`
          text-align: right;
        `}
      >
        <Edit
          id={id}
          size={24}
          className={css`
            margin-right: 20px;
            cursor: pointer;
          `}
          onClick={editTraining}
        />
        <Delete
          id={data.id}
          onClick={deleteData}
          size={24}
          className={css`
            cursor: pointer;
          `}
        />
      </td>
    </tr>
  );
};

Training.propTypes = {
  id: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  deleteData: PropTypes.func.isRequired,
  handleEditTraining: PropTypes.func.isRequired
};

export default connect(null, { handleEditTraining })(Training);
