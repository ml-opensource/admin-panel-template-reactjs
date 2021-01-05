import React, { useEffect, useState } from "react";

import { BrowserRouter as Router } from "react-router-dom";

import Routes from "@app/routes/Routes";

import { updateLocalization } from "./features/localization/localization";

const App = () => {
  const [loadingTranslation, setLoadingTranslation] = useState(true);

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        // Fetch the translations when app is started
        await updateLocalization();
      } finally {
        setLoadingTranslation(false);
      }
    };

    fetchTranslation();
  }, []);

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
