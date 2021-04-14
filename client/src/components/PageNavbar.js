import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PageNavBar = (props) => {
  const [navDivs, setNavDivs] = useState(true);

  useEffect(() => {
    // list of pages for navbar, change when needed.
    const pageList = ["home", "dashboard", "analyze", "recommendations"];
    let navbarDivs = pageList.map((page, i) => {
      if (props.active === page) {
        return (
          <a className="nav-item nav-link active" key={i} href={"/" + page}>
            {page.charAt(0).toUpperCase() + page.substring(1, page.length)}
          </a>
        );
      } else {
        return (
          <a className="nav-item nav-link" key={i} href={"/" + page}>
            {page.charAt(0).toUpperCase() + page.substring(1, page.length)}
          </a>
        );
      }
    });
    setNavDivs(navbarDivs);
    // pass as "second arg" to see if component updated, i.e., if props.active changed since we check
    // which page we're actively on to set it to active page and if so, then call useEffect().
    // otherwise (if we haven't switched pages), no need to call this and set state to cause a re-render.
  }, [props.active]);

  return (
    <div className="PageNavbar">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <span className="navbar-brand center">CIS550 Group Project</span>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">{navDivs}</div>
        </div>
      </nav>
    </div>
  );
};
export default PageNavBar;
