import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PageNavBar = (props) => {
	const [navDivs, setNavDivs] = useState(true);
	

	useEffect(() => {
	// list of pages for navbar, change when needed. 
	const pageList = ['dashboard', 'recommendations', 'bestgenres','Posters'];
		let navbarDivs = pageList.map((page, i) => {
			if (props.active === page) {
				return <a className="nav-item nav-link active" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
			else {
				return <a className="nav-item nav-link" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
		})
		setNavDivs(navbarDivs);
		// pass as "second arg" to see if component updated, i.e., which page we're actively on to set it to active page. 
	}, [props.active]);

		return (
			<div className="PageNavbar">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
			      <span className="navbar-brand center">CIS550 HW2</span>
			      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
			        <div className="navbar-nav">
			        {navDivs}
			        </div>
			      </div>
			    </nav>
			</div>
        );
}
export default PageNavBar;
