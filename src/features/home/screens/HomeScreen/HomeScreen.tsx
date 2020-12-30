import FormCustom, { FormData } from "components/Form/Form";
import React, { FC, memo } from "react";

enum FORM_MODE {
  CREATE = "create",
  UPDATE = "update",
}

const HomeScreen: FC = () => {
  const [data, setData] = React.useState<FormData | undefined>(undefined);
  const [mode, setMode] = React.useState<FORM_MODE>(FORM_MODE.CREATE);

  React.useEffect(() => {
    if (mode === "update")
      setTimeout(() => {
        setData({
          email: "email@gmail.com",
          password: "password",
        });
      }, 1000);
  }, [mode]);

  return (
    <>
      <button
        type="button"
        onClick={() =>
          setMode(
            mode === FORM_MODE.CREATE ? FORM_MODE.UPDATE : FORM_MODE.CREATE
          )
        }
      >
        Change to {mode === "create" ? "update" : "create"}
      </button>
      <FormCustom mode={mode} data={data} />
    </>
  );
};

export default memo(HomeScreen);
