import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Add = () => {

    // Create a state variable called 'book' and initialize it with an object
    // that contains properties for the title, description, price, and cover of a book
    const [book, setBook]= useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });

    const navigate = useNavigate()

    // Define a handleChange function that updates the 'book' state whenever
    // the value of an input field changes
    /*setBook: This is a function returned by the useState hook that updates the state variable book.

prev: This is the current state of the book variable. It is passed to the function as an argument to ensure that the latest state is used for updating.

({...prev, [e.target.name]: e.target.value}): This is an object that spreads the current state of book and updates the value of the property whose name matches the name attribute of the input element that triggered the handleChange function.

[e.target.name]: e.target.value: This is an ES6 computed property syntax that updates the value of the property whose name matches the name attribute of the input element that triggered the handleChange function. e.target.name returns the value of the name attribute of the input element, and e.target.value returns the value of the input element.

In summary, this line of code updates the state of the book variable by creating a new object that spreads the current state of book and updates the value of the property whose name matches the name attribute of the input element that triggered the handleChange function. It achieves this by using the setBook function returned by the useState hook, which updates the state variable with the new object. The use of the previous state prev in setBook ensures that the latest state is used for updating the state variable.*/
    const handleChange = (e) =>{
        setBook(prev => ({...prev, [e.target.name]: e.target.value}))

    }
    console.log(book)


    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:3000/books", book)
            navigate("/")
        }catch(err){

            console.log(err)

        }

    }

    // Render a form with input fields for the title, description, price, and cover
    // of a book, and attach the handleChange function to each input field's 'onChange' event
    return (
        <div className='form'>
            <h1>Add New Book</h1>
            <input type="text" placeholder='title' onChange={handleChange} name='title'/>
            <input type="text" placeholder='desc' onChange={handleChange} name='desc'/>
            <input type="number" placeholder='price' onChange={handleChange} name='price'/>
            <input type="text" placeholder='cover' onChange={handleChange} name='cover'/>
            <button className='formButton' onClick={handleClick}>Add</button>
        </div>

    );
}

// Export the Add component so it can be used in other parts of the application
export default Add;
