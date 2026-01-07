import { useState, useEffect } from 'react';
import { TodoItem } from './components/TodoItem';
import { TodoForm } from './components/TodoForm';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("my-react-todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem("my-react-todos", JSON.stringify(todos));
  }, [todos]);

  // 1. Add Function
  const addTodo = (text: string) => {
    setTodos([...todos, { id: self.crypto.randomUUID(), text, completed: false }]);
  };

  // 2. Toggle Function
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 3. Delete Function
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 4. Edit Function
  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      {/* Main Card Container */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Tasks
        </h1>
        <div className='flex justify-center gap-4 mb-6'>
          <button
            className={`px-4 py-2 rounded cursor-pointer ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('all')}
            aria-label="Show all tasks"
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded cursor-pointer ${filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('active')}
            aria-label="Show active tasks"
          >
            Active
          </button>
          <button
            className={`px-4 py-2 rounded cursor-pointer ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('completed')}
            aria-label="Show completed tasks"
          >
            Completed
          </button>
        </div>

        <TodoForm onAdd={addTodo} />

        {/* Render the list */}
        <ul className="space-y-3">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </ul>

        {todos.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p className="text-lg">No tasks yet!</p>
            <p className="text-sm">Add a task above to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}