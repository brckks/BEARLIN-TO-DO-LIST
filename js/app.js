

//Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");


//Classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Show todays date
const options = {weekday: "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do function
//add an item to the list user the enter key
function addToDo(toDo, id, done, trash) {

	if(trash) {return;}

	const DONE = done ? CHECK : UNCHECK;
	const LINE = done ? LINE_THROUGH : "";

	const item = `<li class="item">
					<i class="fa ${DONE} co" job="complete" id="${id}"></i>
					<p class="text ${LINE}">${toDo}</p>
					<i class="fa fa-trash-o de" job="delete" id="${id}"></i>
				</li>`;

	const position = "beforeend";
	list.insertAdjacentHTML(position, item);
}

function removeToDo() {

}

let LIST = [], id = 0;

//get item from localstorage
let data = localStorage.getItem("TODO");

//check if data is not empty
if(data) {
	LIST = JSON.parse(data);
	id = LIST.length;
	loadList(LIST);
} else {
	LIST = [];
	id = 0;
}

//load items to user's interface
function loadList(LIST) {
	LIST.forEach(item => addToDo(item.name, item.id, item.done, item.trash));
}
//add an item to the list user the enter key
document.addEventListener('keyup', function(even) {
	if(event.keyCode == 13) {
		const toDo = input.value;

		//if the input isn't empty
		if(toDo) {
			addToDo(toDo, id, false, false);
			LIST.push(
			{
				name: toDo,
				id: id,
				done:false,
				trash: false
			});
		}
		input.value = ""; //clears input field

		//add item to localstorage(this code must be added where the LIST array updated)
		localStorage.setItem("TODO", JSON.stringify(LIST));
		id++;
	}
});
//addToDo("Coffee", 1, true, false);

function completeToDo(element) {
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

	LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
	element.parentNode.parentNode.removeChild(element.parentNode);

	LIST[element.id].trash = true;
}

list.addEventListener('click', function(event) {
	let element = event.target;
	//console.log(element); 
	const elementJob = event.target.attributes.job.value;

	if(elementJob == "complete") {
		completeToDo(element);
	} else if (elementJob == "delete") {
		removeToDo(element);
	}

	//add item to localstorage(this code must be added where the LIST array updated)
	localStorage.setItem("TODO", JSON.stringify(LIST));
	//console.log(LIST); 
});

clear.addEventListener('click', clearLocalStorage);

function clearLocalStorage() {
	localStorage.clear();
	location.reload();
}