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
  
// Функція для виконання запиту
const fetchData = async () => {

    // Запит до бази даних для отримання об'єднаних даних з колекцій
    const articles = await UserModel2.aggregate([
      {
        $lookup: {
          from: 'authors',
          localField: 'id_author',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $unwind: '$author'
      },
      {
        $project: {
          _id: 0,
          author: '$author.author',
          title: 1,
          text: 1
        }
      }
    ]);

    console.log(articles);
    res.json(articles);
};

fetchData();

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