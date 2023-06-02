const cardList = document.getElementById('cardList');
var cardData = [];
let itemsPerPage = 3;
let currentPage = 1;

async function cardTable(){
	const data = await fetch('https://jsonplaceholder.typicode.com/users');
	const res = await data.json();
	cardData = res;
}
async function dataTable() {
	await cardTable();
	let html = "";
	if (cardData) {
		const pages = [];
		for (let i = 0; i <= Math.ceil(cardData.length / itemsPerPage); i++) {
			pages.push(i)
		}

		const indexOfLastPage = currentPage * itemsPerPage;
		const indexOfFirstPage = indexOfLastPage - itemsPerPage;
		const currentItems = cardData.slice(indexOfFirstPage, indexOfLastPage);
		currentItems.forEach(card => {
			html += `
				<div class="card" data-id = "${card.id}" >
					<div class="card-header">
						<div class="title">${card.name}</div>
						<div class="subTitle">"${card.username}"</div>
					</div>
					<div class="card-footer">
						<div class="address">
							${card.address.street} ${card.address.suite}<br/>
							${card.address.city}<br/>
							${card.address.zipcode}</div>
						<div class="info">
							<b>${card.company.name}</b><br/>
							${card.company.catchPhrase}<br/>
							${card.phone}<br/>
							${card.email}<br/>
							${card.website}<br/>
						</div>
					</div>
				</div>				
			`;
		});
		if(currentPage == 1) {
			document.getElementById("prevBtn").disabled = true;
		} else {
			document.getElementById("prevBtn").disabled = false;
		}
		if(currentPage == Math.ceil(cardData.length / itemsPerPage)) {
			document.getElementById("nextBtn").disabled = true;
		} else {
			document.getElementById("nextBtn").disabled = false;
		}		
	} else {
		html = "Sorry, we didn't find any card!";
	}
	cardList.innerHTML = html;
}
dataTable();
const prevBtn = () => {
	if ((currentPage - 1) * itemsPerPage) {
		currentPage--;
		dataTable();
	}
}
const nextBtn = () => {
	if ((currentPage * itemsPerPage) / cardData.length) {
		currentPage++;
		dataTable();
	}
}
document.getElementById("prevBtn").addEventListener("click", prevBtn, false);
document.getElementById("nextBtn").addEventListener("click", nextBtn, false);
