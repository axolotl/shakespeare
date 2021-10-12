import { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Review from "../components/Review";
import Loading from "../components/Loading";
import { processReview, sortArrayBy, getReviews } from "../utilities";

class AllReviews extends Component {
	state = { reviews: null, descending: true, sortBy: "rating", onPage: 0 };
	ratingsPerPage = 10;

	componentDidMount() {
		const { descending, sortBy } = this.state;
		getReviews().then((reviews) => {
			this.setState({ ...this.state, reviews: sortArrayBy(reviews.map(processReview), sortBy, descending) });
		});
	}

	/**
	 * Toggles the value of `state.descending` and resorts the reviews array accordingly.
	 */
	setDescending() {
		const { reviews, descending, sortBy } = this.state;
		this.setState({ ...this.state, descending: !descending, reviews: sortArrayBy(reviews, sortBy, !descending) });
	}

	/**
	 * Sets the value of `state.sortBy` and resorts the reviews array accordingly.
	 *
	 * @param {Event} event
	 * @param {Object} event.target
	 */
	setSortBy({ target }) {
		console.log(target);
		console.log(typeof target);
		const { reviews, descending } = this.state;
		this.setState({ ...this.state, sortBy: target.value, reviews: sortArrayBy(reviews, target.value, descending) });
	}

	/**
	 * Sets the value of `state.onPage` to trigger either a forward or a backwards pagination.
	 *
	 * @param {string} direction
	 */
	setPagination(direction) {
		const { onPage } = this.state;
		const adjustment = direction === "next" ? 1 : -1;
		this.setState({ ...this.state, onPage: onPage + adjustment });
	}

	render() {
		const { ratingsPerPage } = this;
		const { reviews, descending, sortBy, onPage } = this.state;
		const previousAvailable = reviews && onPage > 0;
		const moreAvailable = reviews && (onPage + 1) * ratingsPerPage < reviews.length;
		const startIndex = onPage * ratingsPerPage;
		const endIndex = (onPage + 1) * ratingsPerPage;

		return (
			<main className="page_content">
				<Header></Header>
				<nav>
					<label htmlFor="descending_checkbox">Sort in descending order:</label>
					<input
						type="checkbox"
						label="descending"
						id="descending_checkbox"
						checked={descending}
						onChange={() => this.setDescending()}></input>
					<div className="sortBy_radios">
						<p>Sort by:</p>
						<label htmlFor="sortBy_rating_radio">Rating</label>
						<input
							type="radio"
							id="sortBy_rating_radio"
							name="rating"
							value="rating"
							checked={sortBy === "rating"}
							onChange={(e) => this.setSortBy(e)}></input>
						<label htmlFor="sortBy_date">Date</label>
						<input
							type="radio"
							id="sortBy_date_radio"
							name="date"
							value="publish_date"
							checked={sortBy === "publish_date"}
							onChange={(e) => this.setSortBy(e)}></input>
					</div>
				</nav>
				<section>
					<>
						{reviews ? (
							reviews.slice(startIndex, endIndex).map((review, i) => {
								const { id } = review;
								return (
									<Link to={"/review/" + id} key={id}>
										<Review {...review} />
									</Link>
								);
							})
						) : (
							<Loading />
						)}
					</>
					<div className="pagination">
						<button disabled={!previousAvailable} onClick={() => this.setPagination("previous")}>
							Previous
						</button>
						<button disabled={!moreAvailable} onClick={() => this.setPagination("next")}>
							Next
						</button>
					</div>
				</section>
			</main>
		);
	}
}

export default AllReviews;
