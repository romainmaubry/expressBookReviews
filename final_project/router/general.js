const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
  
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify({books},null,4))
  //return res.status(300).json({message: "Yet to be implemented"});
});

// TASK10: 
 public_users.get('/task10',function (req, res) {
   new Promise((resolve, reject) => {
     resolve(res.send(JSON.stringify(books, null, 2)));
   }).then(() => console.log("Task 10 Promise complete"));
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

// TASK11:
 public_users.get('/task11/:isbn',function (req, res) {
   new Promise((resolve, reject) => {
     resolve(res.send(JSON.stringify(books[req.params.isbn], null, 2)));
   }).then(() => console.log("Task 11 Promise complete"));
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

// TASK12:
 public_users.get('/task12/:author',function (req, res) {
   new Promise((resolve, reject) => {
     const author = req.params.author;
     let blist = [];
     for (b in books) {
       if (books[b].author === author){
         blist.push(books[b]);
     }
   }
     resolve(res.send(JSON.stringify(blist, null, 2)));
   }).then(() => console.log("Task 12 Promise complete"));
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

// TASK13: 
 public_users.get('/task13/:title',function (req, res) {
   new Promise((resolve, reject) => {
     for (t in books) {
       if (books[t].title === req.params.title){
         resolve(res.send(JSON.stringify(books[t], null, 2)));
       }
     } 
   }).then(() => console.log("Task 13 Promise complete"));
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
