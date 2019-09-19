class Book{
	constructor(name, author, isbn){
		this.name = name;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI{
	static display(){
		let bookList= Store.getBooks();
		console.log("bookList to display",bookList);
		bookList.forEach(book=>UI.addToList(book));
	}
	static addToList(book){
		let tableBody = document.getElementById("tableBody");
		let tr = document.createElement("tr");
		tr.innerHTML = `<td>${book.name}</td>
                		<td>${book.author}</td>
		                <td>${book.isbn}</td>
		                <td><button class="btn btn-danger">X</button></td>`;
		tableBody.appendChild(tr);		                
	}
	static deleteBook(e){
		Store.deleteFromStore(e);
		console.log(e.target.nodeName);
		if(e.target.nodeName.toLowerCase()==="button"){
			e.target.parentNode.parentNode.remove();
		}
	}
}

class Store{
	static getBooks(){
		let bookListArray;
		console.log(localStorage.getItem("bookListStore"));
		if(localStorage.getItem("bookListStore")===null){
			bookListArray = [];
		}
		else
			bookListArray = JSON.parse(localStorage.getItem("bookListStore"));
		return bookListArray;
	}
	static addToStore(newBook){
		
		let bookListArray = Store.getBooks();
		bookListArray.push(newBook);
		localStorage.setItem("bookListStore", JSON.stringify(bookListArray));
	}
	static deleteFromStore(e){
		let isbnToRemove = e.target.parentNode.previousElementSibling.textContent;
		console.log(isbnToRemove);
		let bookArray = JSON.parse(localStorage.getItem("bookListStore"));
		bookArray.forEach((book,index)=>{
			if(book.isbn === isbnToRemove){
				bookArray.splice(index,1);
			}
		});
		localStorage.setItem("bookListStore", JSON.stringify(bookArray));
	}
}

//display UI. entry point
document.addEventListener("DOMContentLoaded", UI.display());

let tableBody = document.getElementById("tableBody");

//delete from UI
tableBody.addEventListener("click", (e)=>{
	UI.deleteBook(e);
});

let bookForm = document.getElementById("bookForm");

bookForm.addEventListener("submit", e => {
	e.preventDefault();
	let bookAlreadyExists;
	let bookName = document.getElementById("bookName").value;
	let bookAuthor = document.getElementById("bookAuthor").value;
	let bookISBN = document.getElementById("bookISBN").value;
	if(localStorage.getItem("bookListStore")){
		let bookArray = JSON.parse(localStorage.getItem("bookListStore"));
		bookArray.forEach(book=>{
			if(book.isbn===bookISBN){
				alert(`ISBN:${bookISBN} already exists. Please enter different ISBN`);
				bookAlreadyExists=true;
			}
		});
		if(bookAlreadyExists===true){
			bookForm.reset();
			return;
		}
	}

		//creating new book object
		let newBook = new Book(bookName, bookAuthor, bookISBN);
		console.log(newBook);
		//adding new book to store
		Store.addToStore(newBook);
		UI.addToList(newBook);
		bookForm.reset();

	
})












