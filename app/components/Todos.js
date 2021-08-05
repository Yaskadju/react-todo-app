import React, { useEffect, useState } from "react"
import Todo from "../components/Todo"

const Todos = () => {
  const [text, setText] = useState("")
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState("all")
  const [filteredTodos, setFilteredTodos] = useState([])

  useEffect(() => {
    filterHandler()
  }, [todos, filter])

  useEffect(() => {
    const json = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(json)
    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [])

  useEffect(() => {
    const json = JSON.stringify(todos)
    console.log(json)
    localStorage.setItem("todos", json)
  }, [todos])

  function filterHandler() {
    switch (filter) {
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break
      default:
        setFilteredTodos(todos)
        break
    }
  }

  function handleChange(event) {
    let input = event.target.value
    setText(input)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (text.trim() !== "") {
      addTodo(text.trim())
      setText("")
    }
  }

  function addTodo(text) {
    let todo = {
      id: Date.now(),
      text: text,
      completed: false
    }

    setTodos(todos => [...todos, todo])
  }

  function toggleTodo(id) {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  function deleteTodo(id) {
    let updatedTodos = todos.filter(todo => todo.id !== id)

    setTodos(updatedTodos)
  }

  function editTodo(id, text) {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          text: text
        }
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  function handleSelect(event) {
    let value = event.target.value
    setFilter(value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" value={text} className="todo-input" />
        <button className="todo-button" type="submit">
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select name="todos" className="filter-todo" onChange={handleSelect}>
            <option default value="all">
              All
            </option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>

      <div className="todo-container">
        <ul className="todo-list">
          {filteredTodos.map(todo => {
            return <Todo key={todo.id} editTodo={editTodo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} todo={todo} />
          })}
        </ul>
      </div>
    </>
  )
}

export default Todos
