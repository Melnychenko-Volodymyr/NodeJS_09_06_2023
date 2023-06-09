const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const UserModel1 = require('../models/author');
const UserModel2 = require('../models/article');

//------------------------------------------------------------
// стартова сторінка (перегляд статей)
router.get('/', (req, res) => {
    res.render('view');
});

// відправка масиву статей на запит get
router.get('/article', (req, res) => {
  
// Оголошення схеми для колекції authors
const authorSchema = new mongoose.Schema({
  author: String
});

// Оголошення схеми для колекції articles
const articleSchema = new mongoose.Schema({
  id_author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  title: String,
  text: String
});

// Оголошення моделей на основі схем
const Author = mongoose.model('Author', authorSchema);
const Article = mongoose.model('Article', articleSchema);

// Асинхронна функція для отримання об'єднаних даних
    const getCombinedData = async () => {
     let data = await Article.find()
      .populate('id_author', 'author')
      .select('author title text')
      .exec();

    console.log(data);
    res.json(data);

};

getCombinedData();

});

//---------------------------------------------------------
// сторінка перегляду та додавання авторів
router.get('/add_author/', (req, res) => {
    res.render('add_author');
});

// відправка масиву авторів на запит get
router.get('/author', (req, res) => {
    const getAuthors = async () => {
          console.log('Відправка масиву авторів'); 
          let authors = await UserModel1.find({});  
          res.json(authors);
        };
    getAuthors();

});

// отримання нового автора від браузера
router.post('/add_author', (req, res) => {
    let author = req.body;
    console.log('Новий автор: ' + author.author);
    UserModel1.create(author);
  });

// отримання id та зміненого автора для заміни від браузера
router.post('/update_author', (req, res) => {
    let authorUpdate = req.body;
    console.log('Заміна автора: ' + authorUpdate.id);
    const updateAuthor = async () => {
          const result = await UserModel1.updateOne({ _id: `${authorUpdate.id}` }, { author: `${authorUpdate.newAuthor}` });
      };
    updateAuthor();  
  });


// ------------------------------------------------------------
// сторінка додавання статей
router.get('/add_article/', (req, res) => {
    res.render('add_article');
});  
// додавання нової статті
router.post('/send_article', (req, res) => {
    article = req.body;
    UserModel2.create(article);
    console.log('Додана нова стаття');
  });


module.exports = router;