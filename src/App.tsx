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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
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

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p className="mb-2">SimplyDone &copy; {new Date().getFullYear()}</p>
        <a
          href="https://github.com/OleksandrZadvornyi/to-do-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 hover:text-blue-600 transition-colors"
        >
          {/* GitHub Icon */}
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        </a>
      </footer>
    </div>
  );
}