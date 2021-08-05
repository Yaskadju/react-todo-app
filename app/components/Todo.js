import { text } from "@fortawesome/fontawesome-svg-core"
import React, { useEffect, useState } from "react"

const Todo = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
  const [todoEditing, setTodoEditing] = useState(null)
  const [editingText, setEditingText] = useState("")

  function handleEdit(event) {
    setTodoEditing(todo.id)
  }

  function handleSubmit(event) {
    event.preventDefault()
    editTodo(todoEditing, editingText)
    setTodoEditing(null)
  }

  return (
    <div className="todo">
      <li onClick={() => handleEdit(todo.id)} className={"todo-item " + (todo.completed ? "todo-completed" : "")}>
        {todoEditing === todo.id ? <input type="text" className="edit-input" /> : todo.text}
      </li>

      <button className="edit-btn">
        <i className="fas fa-edit" onClick={() => handleEdit(todo.id)}></i>
      </button>
      <button className="complete-btn">
        <i className="fas fa-check" onClick={() => toggleTodo(todo.id)}></i>
      </button>
      <button className="trash-btn" onClick={() => deleteTodo(todo.id)}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  )
}

export default Todo
