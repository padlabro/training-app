import { withFormik } from "formik";
import { connect } from "react-redux";
import validateForm from "../../../utils/validate";
import ModalForm from "../components/ModalForm";
import {
  handleSaveTraining,
  handleAddTraining
} from "../../../containers/App/Redux/actions";

export default connect(null, {
  handleSaveTraining,
  handleAddTraining
})(
  withFormik({
    mapPropsToValues: props => ({
      date: props.data.date || "",
      distance: props.data.distance || "",
      type: props.data.type || "Running",
      comment: props.data.comment || "",
      id: props.data.id || ""
    }),

    validate: values => {
      const errors = {};
      validateForm({ values, errors });

      return errors;
    },

    handleSubmit: (values, { props }) => {
      if (values.id) {
        props.handleSaveTraining(values);
      } else {
        props.handleAddTraining(values);
      }
    }
  })(ModalForm)
);
