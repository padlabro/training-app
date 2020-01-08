/* eslint-disable no-param-reassign */
export default ({ values, errors }) => {
  const rules = {
    distance: value => {
      if (!value) {
        errors.distance = 'Required';
      }
      if (values.distance >= 200) {
        errors.distance = 'More than 200km by day? Nah';
      }
      if (values.distance < 0) {
        errors.distance = 'Must be a positive number';
      }
    },
    date: value => {
      if (new Date(value).setHours(0, 0, 0, 0) > new Date()) {
        errors.date = 'Future date is not valid';
      }
      if (!value) {
        errors.date = 'Required';
      }
    },
    comment: value => {
      if (value.length >= 100) {
        errors.comment = 'Must be less than 100 symbols';
      }
    }
  };

  Object.keys(values).forEach(key => rules[key] && rules[key](values[key]));
};
