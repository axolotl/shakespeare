import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "./App";
import reviews from "./test_reviews";

const sortFn = (a, b) => (a < b ? 1 : -1);

let container = null;
beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it("renders (fake) review data", async () => {
	jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(reviews) }));

	await act(async () => {
		render(<App />, container);
	});

	expect(container.querySelector("header img")).toBeTruthy();
	expect(container.querySelector("header h1").textContent).toBe("Shakespeare Quote Ratings");
	expect(container.querySelector("nav #descending_checkbox").getAttribute("checked")).toBe("");
	expect(container.querySelector("nav #sortBy_rating_radio").getAttribute("checked")).toBe("");
	expect(container.querySelector("nav #sortBy_date_radio").getAttribute("checked")).toBeFalsy();

	const allReviews = container.querySelectorAll(".review");
	expect(allReviews.length).toBe(10);

	const visibleScores = [...allReviews].map(
		(review) =>
			review
				.querySelector(".attribution")
				// a regexp would be ideal here but the below works for now
				.textContent.split(" ")
				.map((x) => parseFloat(x))
				.filter((x) => !isNaN(x))[0]
	);

	expect(visibleScores).toEqual(visibleScores.sort(sortFn));

	const [prevButton, nextButton] = document.querySelectorAll("button");
	expect(prevButton.textContent).toBe("Previous");
	expect(prevButton.getAttribute("disabled")).toBe("");
	expect(nextButton.textContent).toBe("Next");
	expect(nextButton.getAttribute("disabled")).toBe(null);
});

it("sorts (fake) review data", async () => {
	jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(reviews) }));

	await act(async () => {
		render(<App />, container);
	});

	const checkbox = container.querySelector("nav #descending_checkbox");
	act(() => {
		checkbox.dispatchEvent(new MouseEvent("click", { bubbles: true }));
	});

	const allReviews = container.querySelectorAll(".review");
	const visibleScores = [...allReviews].map(
		(review) =>
			review
				.querySelector(".attribution")
				// a regexp would be ideal here but the below works for now
				.textContent.split(" ")
				.map((x) => parseFloat(x))
				.filter((x) => !isNaN(x))[0]
	);

	expect(visibleScores).toEqual([...visibleScores].sort(sortFn).reverse());
});
