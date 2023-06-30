import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const myAddStyle = {
  color: 'white',
  backgroundColor: 'deeppink'
};

function TodoApp() {
  const myStyle = {
    color: 'pink',
    fontSize: '20px',
  };
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);
 
  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = async () => {
    if (inputValue.trim() !== '') {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
          title: inputValue,
          completed: false
        });
        setTodos([...todos, response.data]);
        setInputValue('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 style={myStyle}>TO-DO LIST</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Thêm công việc..."
      />
      <button onClick={handleAddTodo} style={myAddStyle} >Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
