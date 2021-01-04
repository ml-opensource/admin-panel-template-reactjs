import React, { FC, memo } from "react";

import { LockFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { Result } from "antd";
import { useTranslation } from "react-i18next";

import { ClientErrors } from "@app/constants/error.constants";

interface ErrorScreenProps {
  status: ClientErrors;
}

const ErrorScreen: FC<ErrorScreenProps> = memo(({ status }) => {
  const { t } = useTranslation();

  return (
    <>
      {
        {
          [ClientErrors.FORBIDDEN]: (
            <Result
              icon={<LockFilled />}
              title={t("clientErrors.forbiddenTitle")}
              subTitle={t("clientErrors.forbidden")}
            />
          ),
          [ClientErrors.NOT_FOUND]: (
            <Result
              icon={<QuestionCircleOutlined />}
              title={t("clientErrors.notFoundTitle")}
              subTitle={t("clientErrors.notFound")}
            />
          ),
        }[status]
      }
    </>
  );
});

export default ErrorScreen;
