import * as React from "react";
import "./styles.css";
import AddTodo from "features/todoList/AddTodo";
import TodoList from "features/todoList/TodoList";
import Footer from "features/visibilityFilter/Footer";
// import { useDispatch } from "react-redux";
// import { loadTodos, createTodoList } from "features/todoList/todoSlice";

export default function App() {
  // const dispatch = useDispatch();

  // React.useEffect(() => {
  //   if (window.location.pathname === "/") {
  //     dispatch(createTodoList());
  //   } else {
  //     dispatch(loadTodos());
  //   }
  // }, [dispatch]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <AddTodo />
      <TodoList />
      <Footer />
    </div>
  );
}
