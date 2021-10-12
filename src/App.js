import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllReviews from "./pages/AllReviews";
import SingleReview from "./pages/SingleReview";

export default function App() {
	return (
		<Router>
			<Switch>
				<Route path="/review/:reviewId" render={(props) => <SingleReview {...props} />}></Route>
				<Route path="/">
					<AllReviews />
				</Route>
			</Switch>
		</Router>
	);
}
