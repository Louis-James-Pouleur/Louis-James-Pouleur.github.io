"use strict";
//gpt corrected small mistakes
import Style from "./Style.js";
import Collection from "./collection.js";

const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("selected_item");

fetch(`http://localhost:3000/selected_item/${itemId}`, {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
	},
})
	.then((resp) => resp.json())
	.then((data) => {
		const style = new Style(data.img, data._id, data.hat, data.jacket, data.shirt, data.pullover, data.pants, data.description);
		const selectedImage = document.querySelector(".selected_img");
		selectedImage.src = data.img;
		const styleContainer = document.querySelector(".selected_img");
		const insertHTML = `
            <div class="selected_img">
                <a href="selected_item.html?selected_item=${data._id}">
                    <img class="styleImageSelected" src="${style.img}" alt="">
                </a>
            </div>        
        `;
		const infoContainer = document.querySelector(".info");
		const insertInfo = `
			<div class="info">
				<a class="infoButton">HAT:  ${data.hat}</a>
				<a class="infoButton">SHIRT:  ${data.shirt}</a>
				<a class="infoButton">PULLOVER:  ${data.pullover}</a>
				<a class="infoButton">JACKET:  ${data.jacket}</a>
				<a class="infoButton">PANTS:  ${data.pants}</a>
				<a class="infoButton">DESCRIPTION:  ${data.description}</a>
			</div>
		`;
		styleContainer.insertAdjacentHTML("beforeend", insertHTML);
		infoContainer.insertAdjacentHTML("afterbegin", insertInfo);
		console.log("Data retrieved from the database:", data);
	})
	.catch((error) => {
		console.error("Error fetching image details:", error);
	});
