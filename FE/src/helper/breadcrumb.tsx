import React from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import routes from "../routers";

import useBreadcrumbs from "use-react-router-breadcrumbs";

import "./Breadcrumb.less";
import { Flex } from "antd";

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routes);

  return (
      <div className="breadcrumb-list">
        {breadcrumbs.map(({ match, breadcrumb }, index) => (
          <>
            <Link key={match.pathname} to={match.pathname}>
              {breadcrumb}
            </Link>
            {index < breadcrumbs.length - 1 && <span> / </span>}
          </>
        ))}
      </div>
  );
};

export default Breadcrumbs;
