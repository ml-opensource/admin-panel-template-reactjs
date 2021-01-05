import { Form, useFormikContext } from "formik";
import * as React from "react";

const FormContainer: React.FC = ({ children }) => {
  const { status } = useFormikContext();

  return (
    <Form>
      {status === "loading" && <p>Loading</p>}
      {status !== "loading" && children}
    </Form>
  );
};

export default FormContainer;
