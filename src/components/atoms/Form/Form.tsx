import { RefObject, useCallback, useEffect } from "react";

import { Form as AntdForm } from "antd";
import { FormProps as AntdFormProps, FormInstance } from "antd/lib/form";
import { useForm } from "antd/lib/form/Form";
import _isEqual from "lodash/isEqual";
import { usePrevious } from "react-use";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormValues = any;

export type FormErrors = Record<string, string | string[]> | undefined;

export interface FormProps extends AntdFormProps {
  values?: FormValues;
  formRef?: RefObject<FormInstance>;
}

const Form = ({
  values = undefined,
  children,
  formRef = undefined,
  form,
  ...props
}: FormProps) => {
  const [formInstance] = useForm(form);

  const bindValues = useCallback(() => {
    formInstance.resetFields();
  }, [formInstance]);

  const prevValues = usePrevious(values);

  useEffect(() => {
    if (!_isEqual(prevValues, values)) {
      bindValues();
    }
  }, [bindValues, values, prevValues]);

  return (
    <AntdForm
      layout="vertical"
      {...props}
      form={formInstance}
      ref={formRef}
      initialValues={values}
    >
      {children}
    </AntdForm>
  );
};

export const { Item, List } = AntdForm;

export default Form;

export { useForm };
