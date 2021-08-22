// JavaScript Document
var console = window.console

console.log("Hello");

const form = document.getElementById("scream-form");
const app = document.getElementById("app");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const author = form.elements["author"].value;
	const content = form.elements["content"].value;
	scream(author, content);
	form.elements["author"].value = "";
	form.elements["content"].value = "";
});

function scream(author, content){
	fetch('https://backend.cpsk-club.xyz/twitter', {
		method: 'POST',
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ author: "Mek", conteent: "Hello from JS!" }),
	}).then((response) => console.log(response));
}

function getScreams(){
	fetch("https://backend.cpsk-club.xyz/twitter",{
	method: "GET",
	headers: { "Content-Type": "application/json" },
 })
		.then((response) => response.json())
		.then((datas) => 
		datas.forEach((data) => {
		app.appendChild(makeNewScream(data.author, data.content))
	})
		);
}

function makeNewScream(author,content){
	const newNode = document.createElement("p");
	newNode.innerText = '${author} said: ${content}'
	return newNode;
}

getScreams();

