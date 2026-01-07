import { useState, useRef, useEffect } from 'react';

type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

type TodoItemProps = {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, newText: string) => void;
};

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (!editText.trim()) return;
        onEdit(todo.id, editText);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') {
            setEditText(todo.text); // Revert changes
            setIsEditing(false);
        }
    };

    return (
        <li
            className={`flex items-center p-3 rounded-lg border transition-all ${todo.completed
                ? 'bg-gray-50 border-gray-200'
                : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm'
                }`}
        >
            {/* Checkbox */}
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer mr-4"
            />

            {isEditing ? (
                // --- EDIT MODE ---
                <input
                    ref={inputRef}
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={handleSave} // Save when clicking away
                    onKeyDown={handleKeyDown}
                    className="grow px-2 py-1 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
            ) : (
                // --- VIEW MODE ---
                <span
                    onDoubleClick={() => setIsEditing(true)} // Double-click to quick edit
                    className={`grow text-lg cursor-text ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
                        }`}
                    title="Double-click to edit"
                >
                    {todo.text}
                </span>
            )}

            {/* Edit Button (Pencil Icon) */}
            {!isEditing && (
                <button
                    onClick={() => setIsEditing(true)}
                    className="ml-4 text-gray-400 hover:text-blue-500 p-2 rounded-full hover:bg-blue-50 transition-colors"
                    title="Edit task"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>
            )}

            {/* Delete Button */}
            <button
                onClick={() => onDelete(todo.id)}
                className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                title="Delete task"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </li>
    );
}