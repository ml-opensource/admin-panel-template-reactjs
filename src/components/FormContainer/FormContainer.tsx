import * as React from "react";

import { Form, useFormikContext } from "formik";

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
