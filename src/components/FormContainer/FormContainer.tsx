import { Form, useFormikContext } from "formik";
import * as React from "react";

enum STATUS {
  LOADING,
  READY,
}

const FormContainer: React.FC = ({ children }) => {
  const { status } = useFormikContext();

  return (
    <Form>
      {status === STATUS.LOADING && <p>Loading...</p>}
      {status !== STATUS.LOADING && children}
    </Form>
  );
};

export default FormContainer;
