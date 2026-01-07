import { useState, useEffect } from 'react';
import { TodoItem } from './components/TodoItem';

type TodoFormProps = {
  onAdd: (text: string) => void;
};

function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Add
      </button>
    </form>
  );
}

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("my-react-todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("my-react-todos", JSON.stringify(todos));
  }, [todos]);

  // 1. Add Function
  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  // 2. Toggle Function
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 3. Delete Function
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      {/* Main Card Container */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Tasks
        </h1>

        {/* Pass the add function down as a prop */}
        <TodoForm onAdd={addTodo} />

        {/* Render the list */}
        <ul className="space-y-3">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
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