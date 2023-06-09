let cont = document.querySelector('.container');
let input = document.querySelector('.input');
let button = document.querySelector('.button');
let select = document.querySelector('.select');
let input1 = document.querySelector('.input1');
let button1 = document.querySelector('.button1');

let contHTML = "";
let selectHTML = '';
let authors = [];
let author = {};
let change = {};
let oldAuthor = '';
let newAuthor = '';


// відображення списку авторів і формування списку select
const render = () => {
	contHTML = "";
	selectHTML = '';
	for (let i=0; i<authors.length; i++) {
		contHTML += `<p class="author">${authors[i]._id} ${authors[i].author}</p>`;
		selectHTML += `<option value='${authors[i]._id}'>${authors[i]._id} ${authors[i].author}</option>`
	}
	cont.innerHTML = contHTML;
	select.innerHTML = selectHTML;
};

// запит існуючих авторів на сервері і відображення 
const getAuthors = async () => {
	const result = await axios.get('/author');
    authors = result.data.slice();
	console.log(authors);	
	render();
  };

  getAuthors();
 
// відправка  нового автора  на сервер 
const addAuthor = async () =>  {
	  const result = await axios.post('/add_author', author);
	};

// обробка натискання кнопки для додавання автора 
  button.addEventListener('click', (ev) => {
	author = {};
	author.author = input.value;	
	if (author.author) {
		input.value = '';
		addAuthor();
		getAuthors();	
	}
  }
  );

// відправка  id автора та його нового значення на сервер 
const updateAuthor = async () =>  {
	const result = await axios.post('/update_author', authorUpdate);
  };


// обробка натискання кнопки для коригування автора 
button1.addEventListener('click', (ev) => {
	let id = select.value;
	newAuthor = input1.value;
	if (newAuthor) {
		input1.value = '';
		authorUpdate = {};
		authorUpdate.id = id;
		authorUpdate.newAuthor = newAuthor;
        updateAuthor();
		getAuthors();
	
	}
  }
  );
  
