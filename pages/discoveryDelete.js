"use strict";

import Style from "./Style.js";

fetch("http://localhost:3000/discovery", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		// You can add more headers if needed
	},
})
	.then((resp) => resp.json())
	.then((data) => {
		const stylesContainer = document.querySelector(".image-page");

		if (Array.isArray(data)) {
			data.forEach((styleInfo, index) => {
				const style = new Style(styleInfo.img);

				const insertHTML = `
                    <div class="card">
                        <a href="selected_item.html?selected_item=${styleInfo._id}">
                            <img class="styleImageDiscovery" src="${style.img}" alt="">
                        </a>
                        <button class="removeStyle-${index}" data-id="${styleInfo._id}">DELETE
                        </button>
                    </div>
                `;

				stylesContainer.insertAdjacentHTML("beforeend", insertHTML);
			});

			// gpt helped with removing mistakes and clarify steps
			data.forEach((styleInfo, index) => {
				const removeStyleButton = document.querySelector(`.removeStyle-${index}`);

				removeStyleButton.addEventListener("click", function (event) {
					event.preventDefault();
					const selectedItemId = event.target.getAttribute("data-id");

					// Make a DELETE request to the server
					fetch(`http://localhost:3000/discovery/${selectedItemId}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
					})
						.then((resp) => resp.json())
						.then((data) => {
							console.log("Item removed successfully:", data);

							// Remove the card from the DOM if deletion is successful
							const cardElement = event.target.closest(".card");
							if (cardElement) {
								cardElement.remove();
							}
						})
						.catch((error) => {
							console.error("Error removing item:", error);
						});
				});
			});
		} else {
			console.error("Data is not an array:", data);
		}
	})
	.catch((error) => {
		console.error("Error fetching data:", error);
	});
