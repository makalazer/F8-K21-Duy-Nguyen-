import { useEffect, useRef, useState } from "react";

export const Todolist = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    type Todo = {
        id: string;
        text: string;
        done: boolean;
        isEdit: boolean;
        isAllowToEdit: boolean;
    };
    const [filterType, setFilterType] = useState<"all" | "doing" | "done">(
        "all",
    );
    const [todos, setTodos] = useState<Todo[]>([
        {
            id: "1",
            text: "test 1",
            done: false,
            isEdit: false,
            isAllowToEdit: true,
        },
        {
            id: "2",
            text: "test 2",
            done: true,
            isEdit: false,
            isAllowToEdit: true,
        },
        {
            id: "3",
            text: "test 3",
            done: false,
            isEdit: false,
            isAllowToEdit: true,
        },
    ]);
    const [inputText, setInputText] = useState<string>("");
    const [editText, setEditText] = useState<string>("");

    let currentList: Todo[] = [];

    switch (filterType) {
        case "all": {
            currentList = todos;
            break;
        }
        case "doing": {
            currentList = todos.filter((todo) => !todo.done);
            break;
        }
        case "done": {
            currentList = todos.filter((todo) => todo.done);
        }
    }

    const handleAddTodo = (): void => {
        const text = inputText.trim();

        if (!text) return;

        setTodos((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                text,
                done: false,
                isEdit: false,
                isAllowToEdit: true,
            },
        ]);
        setInputText("");
    };

    const handleDonebtn = (id: string): void => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, done: !todo.done } : todo,
            ),
        );
    };

    const handleEditBtn = (currentTodo: Todo) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === currentTodo.id
                    ? { ...todo, isEdit: true }
                    : { ...todo, isAllowToEdit: false },
            ),
        );
        setEditText(currentTodo.text);
        inputRef.current = document.querySelector(`#${currentTodo.id}edit`);
    };
    const handleSave = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? {
                          ...todo,
                          text: editText,
                          isEdit: false,
                          isAllowToEdit: true,
                      }
                    : { ...todo, isAllowToEdit: true },
            ),
        );
    };
    const handleDelete = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };
    useEffect(() => {
        inputRef.current?.focus();
    }, [todos]);

    useEffect(() => {
        const todoLeft = todos.filter((todo) => !todo.done).length;
        document.title =
            todoLeft > 0 ? `${todoLeft} việc cần làm` : "Todo list";
    }, [todos]);

    return (
        <div>
            <h1>Todo List</h1>
            <input
                className="border-2 rounded-md p-1 pl-3"
                ref={inputRef}
                id="input"
                type="text"
                placeholder="Todo"
                value={inputText}
                onChange={(e) => {
                    setInputText(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        if (inputText) {
                            handleAddTodo();
                        }
                    }
                }}
            />
            <button onClick={handleAddTodo}>Add</button>
            <div style={{ marginTop: "16px" }}>
                <button
                    onClick={() => {
                        setFilterType("all");
                    }}
                >
                    All
                </button>
                <button
                    onClick={() => {
                        setFilterType("doing");
                    }}
                >
                    Doing
                </button>
                <button
                    onClick={() => {
                        setFilterType("done");
                    }}
                >
                    Done
                </button>
            </div>
            <ul>
                {currentList.map((todo) => (
                    <li
                        key={todo.id}
                        style={{
                            display: "flex",
                            margin: "auto",
                            width: "100%",
                            borderBottom: "1px solid #666",
                            marginBottom: "8px",
                            padding: "8px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                width: "500px",
                                margin: "auto",
                                justifyContent: "space-between",
                            }}
                        >
                            {todo.isEdit ? (
                                <input
                                    ref={inputRef}
                                    className="border-solid border-2"
                                    type="text"
                                    name=""
                                    id={todo.id + "edit"}
                                    value={editText}
                                    onChange={(e) => {
                                        setEditText(e.target.value);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSave(todo.id);
                                        }
                                    }}
                                />
                            ) : (
                                <span className={todo.done ? "done-item" : ""}>
                                    {todo.text}
                                </span>
                            )}
                            <div>
                                <input
                                    type="checkbox"
                                    checked={todo.done}
                                    onChange={() => handleDonebtn(todo.id)}
                                />
                                {todo.isEdit ? (
                                    <button
                                        onClick={() => {
                                            handleSave(todo.id);
                                        }}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        disabled={!todo.isAllowToEdit}
                                        onClick={() => {
                                            handleEditBtn(todo);
                                        }}
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        handleDelete(todo.id);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
