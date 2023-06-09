let author = document.querySelector('.author');
let title = document.querySelector('.title');
let cont = document.querySelector('.cont');
let button_prev = document.querySelector('.button_prev');
let button_next = document.querySelector('.button_next');

let article = {};
let articles = []; 
let n = 0;

// відображення  статті
const render = () => {
  author.innerHTML = 'Автор: ' + articles[n].id_author.author;
  title.innerHTML = 'Назва: ' + articles[n].title;
	cont.innerHTML = articles[n].text;
};


// запит існуючих статей на сервері і відображення першої статті
const getArticles = async () => {
	const result = await axios.get('/article');
    articles = result.data.slice();
	render();
  };

  getArticles();


// обробка натискання кнопки для перегляду попередньої статті
  button_prev.addEventListener('click', (ev) => {
    n = n - 1;
	if (n < 0) n = articles.length - 1;
    render();
  }
  );

 // обробка натискання кнопки для перегляду наступної статті
 button_next.addEventListener('click', (ev) => {
    n = n + 1;
	if (n > articles.length-1) n = 0;
    render();
  }
  ); 

  