# react-redux-toolkit-tyepscript-todo
[https://codesandbox.io/s/react-redux-toolkit-typescript-todo-br8br](https://codesandbox.io/s/react-redux-toolkit-typescript-todo-br8br)

## Store

```jsx
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;

export default store;
```

## rootReducer

```jsx
import { combineReducers } from "@reduxjs/toolkit";
import todos from "features/todoList/todoSlice";
import visibilityFilter from "features/visibilityFilter/visibilityFilterSlice";

const rootReducer = combineReducers({
  todos,
  visibilityFilter
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
```

## Index.tsx
```jsx
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App";

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
```

## Types
```jsx
export interface Todo {
  id: string;
  completed: boolean;
  text: string;
}
```

## todoSlice
```jsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "app/store";
import { Todo } from "features/todoList/types";

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.push(action.payload);
    },
    toggleTodo(state, action: PayloadAction<Todo>) {
      let todo = state.find(todo => todo.id === action.payload.id);

      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
});

export const { toggleTodo } = todoSlice.actions;

export const addTodo = (text: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  const newTodo: Todo = {
    id: Math.random()
      .toString(36)
      .substr(2, 9),
    completed: false,
    text: text
  };
  dispatch(todoSlice.actions.addTodo(newTodo));
};

export default todoSlice.reducer;
```

## visibilityFilterSlice

```jsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum VisibilityFilter {
  ShowAll = "SHOW_ALL",
  ShowCompleted = "SHOW_COMPLETED",
  ShowActive = "SHOW_ACTIVE"
}

const initialState = VisibilityFilter.ShowAll;

const visibilityFilterSlice = createSlice({
  name: "visibilityFilter",
  initialState,
  reducers: {
    setVisibilityFilter(state, action: PayloadAction<VisibilityFilter>) {
      return action.payload;
    }
  }
});

export const { setVisibilityFilter } = visibilityFilterSlice.actions;

export default visibilityFilterSlice.reducer;
```
[**createSlice**](https://redux-toolkit.js.org/api/createSlice) A function that accepts an initial state, an object full of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.

* `reducers` An object containing Redux "case reducer" functions (functions intended to handle a specific action type, equivalent to a single case statement in a switch).
* `initialState` The initial state value for this slice of state.
* `name` A string name for this slice of state. Generated action type constants will use this as a prefix.
* `extraReducers` One of the key concepts of Redux is that each slice reducer "owns" its slice of state, and that many slice reducers can independently respond to the same action type. extraReducers allows createSlice to respond to other action types besides the types it has generated.

:memo: **참고 자료**   
* [https://www.mattbutton.com/redux-made-easy-with-redux-toolkit-and-typescript/](https://www.mattbutton.com/redux-made-easy-with-redux-toolkit-and-typescript/)   
* [https://redux-toolkit.js.org/api/createSlice](https://redux-toolkit.js.org/api/createSlice)   
