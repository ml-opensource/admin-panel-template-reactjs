import { BrowserRouter as Router } from "react-router-dom";

import Routes from "@app/routes/Routes";

import { useLocalization } from "./features/localization/localization";

const App = () => {
  const { loadingTranslation } = useLocalization({ shouldCall: true });

  if (loadingTranslation) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
