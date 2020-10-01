import React, { memo, useState, useEffect } from "react";
import TranslateIcon from "@material-ui/icons/Translate";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useLanguages, i18n } from "features/localization/localization";
import { useStyles } from "./LanguageSwitcher.styles";

const LanguageSwitcher = () => {
  const [showMenu, setShowMenu] = useState<null | HTMLElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const languages = useLanguages();

  const classes = useStyles();

  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, []);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowMenu(event.currentTarget);
  };

  const handleClick = (lang: string) => {
    setShowMenu(null);
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
  };

  return (
    <>
      <Tooltip title="Languages Switch">
        <IconButton
          aria-label="Language Switch"
          color="inherit"
          onClick={openMenu}
        >
          <TranslateIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={showMenu}
        keepMounted
        open={Boolean(showMenu)}
        onClose={() => setShowMenu(null)}
      >
        {languages.map(lang => (
          <MenuItem
            className={classes.menuItem}
            key={lang}
            onClick={() => handleClick(lang)}
            selected={selectedLanguage === lang}
          >
            {lang}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default memo(LanguageSwitcher);
