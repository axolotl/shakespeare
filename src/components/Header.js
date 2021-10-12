import headshot from "../assets/256px-Shakespeare.jpg";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<Link to="/">
			<header>
				<img src={headshot} alt="Shakespeare" />
				<h1>Shakespeare Quote Ratings</h1>
			</header>
		</Link>
	);
}

export default Header;
