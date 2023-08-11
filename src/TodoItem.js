import React from 'react';

function TodoItem({ todo, index, onDelete }) {
  return (
    <li>
      {todo}
      <button onClick={() => onDelete(index)}>Delete</button>
    </li>
  );
}

export default TodoItem;
