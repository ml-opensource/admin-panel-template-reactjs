import { BrowserRouter as Router } from "react-router-dom";

import LoadingSpinner from "@app/components/atoms/LoadingSpinner/LoadingSpinner";
import Routes from "@app/routes/Routes";

import { useLocalization } from "./features/localization/localization";

const App = () => {
  const { loadingTranslation } = useLocalization({ shouldCall: true });

  if (loadingTranslation) {
    return <LoadingSpinner isFullscreen text="Loading Admin Panel" />;
  }

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
