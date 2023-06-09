const mongoose = require('mongoose');

// Підключення до бази даних
mongoose.connect('mongodb://localhost/base1', { useNewUrlParser: true, useUnifiedTopology: true });

// Оголошення схеми колекції 'authors'
const authorSchema = new mongoose.Schema({
  _id: String,
  author: String
});

// Оголошення схеми колекції 'articles'
const articleSchema = new mongoose.Schema({
  _id: String,
  id_author: String,
  title: String,
  text: String
});

// Модель колекції 'authors'
const Author = mongoose.model('Author', authorSchema);

// Модель колекції 'articles'
const Article = mongoose.model('Article', articleSchema);

// Функція для виконання запиту
const fetchData = async () => {

    // Запит до бази даних для отримання об'єднаних даних з колекцій
    const data = await Article.aggregate([
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

    console.log(data);

};

// Виклик функції для отримання даних
fetchData();
