/**
 * Processes an review object to convert the `publish_date` into an easier to read date representation.
 *
 * @param {Object} raw
 * @returns {Object}
 */
function processReview(raw) {
	return { ...raw, publish_date: new Date(raw.publish_date).toDateString() };
}

/**
 * Sorts an array of objects with a specified `prop` (property) in descending or ascending order.
 *
 * @param {Array} array
 * @param {string} prop
 * @param {boolean} descending
 * @returns {Array}
 */
function sortArrayBy(array, prop, descending) {
	return array.sort((a, b) => {
		if (descending) return a[prop] < b[prop] ? 1 : -1;
		else return a[prop] > b[prop] ? 1 : -1;
	});
}

/**
 * Initiates a fetch request for reviews (or a single review if `id` is specified).
 *
 * @param {string} [id]
 * @returns {Promise}
 */
async function getReviews(id) {
	let url = process.env.REACT_APP_API_URL;
	if (id) url += "/" + id;

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"x-api-key": process.env.REACT_APP_API_KEY,
		},
	});

	return response.json();
}

export { processReview, sortArrayBy, getReviews };
