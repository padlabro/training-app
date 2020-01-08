/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';

const withSpinner = Component => {
  const Wrapped = ({ isFetching, ...props }) =>
    isFetching ? (
      <>
        <Component {...props}>
          <ClipLoader />
        </Component>
      </>
    ) : (
      <Component {...props} />
    );

  Wrapped.propTypes = {
    isFetching: PropTypes.bool.isRequired
  };

  return Wrapped;
};

export default withSpinner;
