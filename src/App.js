import './App.css';
import Header from './components/Header';
import { Footer } from './components/Footer';
import { Todos } from './components/Todos';
import React, { useEffect, useState } from 'react';
import { AddTodo } from './components/AddTodo';
import { About } from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  let initTodo
  if (localStorage.getItem("todos") === null) {
    initTodo = []
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"))
  }

  const onDelete = (todo) => {
    setTodos(todos.filter((todoItem) => {
      return todo !== todoItem
    }))
  }

  const addTodo = (title, desc) => {
    let sno
    if (todos.length === 0) {
      sno = 0
    } else {
      sno = todos[todos.length - 1].sno + 1
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc
    }
    setTodos([...todos, myTodo])
    
  }

  const [todos, setTodos] = useState(initTodo)
  //Setting todos in local storage for later use, useEffect is applied each time the state is changed
  useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <>
    <Router>
        <Header title="My Todos List" searchBar={false} />
        <Routes>
          <Route path="/" element={
            <><AddTodo addTodo={addTodo} />
              <Todos todos={todos} onDelete={onDelete}/>
            </>}>
          </Route>
          <Route path="/about" element={<About />}>
          </Route>
        </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App;
