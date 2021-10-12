import { Component } from "react";
import Header from "../components/Header";
import Review from "../components/Review";
import Loading from "../components/Loading";
import { processReview, getReviews } from "../utilities";

class SingleReview extends Component {
	state = { review: null };

	componentDidMount() {
		const { reviewId } = this.props.match.params;
		getReviews(reviewId).then((rawReview) => {
			this.setState({ review: processReview(rawReview) });
		});
	}

	render() {
		const { review } = this.state;
		return (
			<main className="page_content">
				<Header></Header>
				<section>{review ? <Review {...review} /> : <Loading />}</section>
			</main>
		);
	}
}

export default SingleReview;
