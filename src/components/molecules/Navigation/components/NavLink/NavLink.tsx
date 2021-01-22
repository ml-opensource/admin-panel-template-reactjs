import { memo } from "react";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { RouteItemDef } from "@app/types/route.types";

interface NavLinkProps {
  navItem: RouteItemDef;
}

const NavLink = memo(({ navItem }: NavLinkProps) => {
  const { t } = useTranslation();

  return (
    <Link to={navItem.path}>
      {navItem.navigationTitle
        ? t(navItem.navigationTitle)
        : `Missing navigationTitle for "${navItem.id}"`}
    </Link>
  );
});

export default NavLink;
