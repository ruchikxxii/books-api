const express = require('express')
const axios = require('axios').default
require('dotenv').config()

const app = express();

app.use(express.json());

app.get("/books",async (req,res)=>{
    const isbn = req.query.isbn;
    if(isbn.toString().length != 13 && isbn.toString().length!=10){
        res.status(400).json({errorMessage:"invalid isbn"})
    }
    else{
        try{
            const url = `https://www.googleapis.com/books/v1/volumes`
            axios.get(url,{
                params:{
                    key:process.env.API_KEY,
                    q:`isbn:${isbn}`
                }
            })
            .then(response=>{
                const book_data = response.data
                if(book_data.totalItems>0){
                    res.json(book_data)
                }
                else if(book_data.totalItems===0){
                    res.status(404).json({message:"no books found"})
                }
                else if(books_data.error){
                    res.status(book_data.code).json({message:book_data.message})
                }
            })
        }
        catch(err){
            res.status(500).json({message:"unable to fetch google books api",errorMessage:err})
        }
    }
})

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})