"use strict";

import Style from "./Style.js";

fetch("http://localhost:3000/discovery", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
	},
})
	.then((resp) => resp.json())
	.then((data) => {
		const stylesContainer = document.querySelector(".image-page");

		if (Array.isArray(data)) {
			data.forEach((styleInfo) => {
				const style = new Style(styleInfo.img);

				const insertHTML = `
                    <div class="card">
                        <a href="selected_item.html?selected_item=${styleInfo._id}">
                            <img class="styleImageDiscovery" src="${style.img}" alt="">
                        </a>
                    </div>
                `;
				stylesContainer.insertAdjacentHTML("beforeend", insertHTML);
			});
		} else {
			console.error("Data is not an array:", data);
		}

		//gpt helped with window.location.href and selected_item
		const imageLinks = document.querySelectorAll(".card a");
		imageLinks.forEach((link) => {
			link.addEventListener("click", (event) => {
				event.preventDefault();

				const selected_item = link.getAttribute("href").split("=")[1];

				window.location.href = `selected_item.html?selected_item=${selected_item}`;
			});
		});
	})
	.catch((error) => {
		console.error("Error fetching data:", error);
	});
