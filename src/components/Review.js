export default function Review({ id, body, author, rating, publish_date }) {
	return (
		<div className="review" key={id}>
			<div className="quote">{body}</div>
			<div className="attribution">
				{author} rated as {rating} on {publish_date}
			</div>
		</div>
	);
}
