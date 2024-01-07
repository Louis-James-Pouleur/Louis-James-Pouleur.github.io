// "use strict";
//gpt helped removing little mistakes
document.addEventListener("DOMContentLoaded", function () {
	const dropdownContent = document.querySelector(".dropdown-content");
	const selectedImage = document.getElementById("selectedImage");

	let selectedImageUrl; // Variable to store the selected image URL

	dropdownContent.addEventListener("click", function (event) {
		event.preventDefault();
		// gpt assitance
		if (event.target.tagName === "A") {
			document.querySelector(".dropdown").innerHTML = "";
			selectedImageUrl = event.target.getAttribute("href");
			selectedImage.innerHTML = `<img class="chosenImg" src="${selectedImageUrl}" alt="Selected Image">`;
		}
	});

	document.querySelector("#buttonPost").addEventListener("click", async function (event) {
		event.preventDefault();

		const name = document.querySelector("#NAME").value;
		const hat = document.querySelector("#HAT").value;
		const pullover = document.querySelector("#PULLOVER").value;
		const shirt = document.querySelector("#SHIRT").value;
		const jacket = document.querySelector("#JACKET").value;
		const pants = document.querySelector("#PANTS").value;
		const description = document.querySelector("#DESCRIPTION").value;

		const requestPost = {
			name: name,
			hat: hat,
			pullover: pullover,
			shirt: shirt,
			jacket: jacket,
			pants: pants,
			description: description,
			img: selectedImageUrl,
		};

		console.log("request data:", JSON.stringify(requestPost));

		try {
			const response = await fetch("http://localhost:3000/createPost", {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(requestPost),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error("Error:", error);
		}
	});
});
