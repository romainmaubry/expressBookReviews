const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify({books},null,4))
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
const isbn=req.params.isbn

function compareISBN(book){
return isbn==book.isbn
}
const filtered_books=Object.values(books).filter(compareISBN)
res.send(JSON.stringify({filtered_books},null,4))
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author=req.params.author
function compareAuthor(book){
return author==book.author
}
const filtered_authors=Object.values(books).filter(compareAuthor)
res.send(JSON.stringify({filtered_authors},null,4))
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title=req.params.title
  function compareTitle(book){
  return title==book.title
  }
  const filtered_titles=Object.values(books).filter(compareTitle)
  res.send(JSON.stringify({filtered_titles},null,4))
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:reviews',function (req, res) {
  //Write your code here
  const reviews=req.params.reviews
  function compareReviews(book){
  return reviews===book.reviews
  }
  const filtered_reviews=Object.values(books).filter(compareReviews)
  res.send(JSON.stringify({filtered_reviews},null,4))
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
