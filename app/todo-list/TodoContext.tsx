"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type TodoContextType = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  text: string;
  setText: (t: string) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  return (
    <TodoContext.Provider value={{ isOpen, setIsOpen, text, setText }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodoContext must be used within TodoProvider");
  return ctx;
}

export default TodoContext;
