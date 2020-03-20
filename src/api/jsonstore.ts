import axios from "axios";
import { Todo } from "features/todoList/types";

const baseUrl =
  "http://www.jsonstore.io/b7ff7e4cdbda33f03615b602494120e1c284bd593ed3182a30f987d5880d3ae5";

interface GetTodosResponse {
  result: Todo[];
  ok: boolean;
}

export async function readTodos(): Promise<Todo[]> {
  const response = await axios.get<GetTodosResponse>(
    baseUrl + window.location.pathname,
    {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
  return response.data.result;
}

export async function writeTodos(todos: Todo[]) {
  await axios.put<Todo[]>(baseUrl + window.location.pathname, todos, {
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  });
}
