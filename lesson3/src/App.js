import React, { useState } from 'react';
import './App.css'

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editInput, setEditInput] = useState('');
  const [editId, setEditId] = useState(null);

  const addTodo = () => {
    if (input.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: input.trim(),
      };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id, text) => {
    setEditId(id);
    setEditInput(text);
  };

  const updateTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editId ? { ...todo, text: editInput.trim() } : todo
    );
    setTodos(updatedTodos);
    setEditId(null);
    setEditInput('');
  };

  return (
    <div className='container'>
      <div className="todo-add">
      <h2>Todo List</h2>
        <div className="input-btn">
        <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a todo"
      />
      <button onClick={addTodo}>Add</button>
        </div>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.id === editId ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button className='update' onClick={updateTodo}>Update</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => editTodo(todo.id, todo.text)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
