import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import moment from 'moment';

const ListTodos = ({ allTodos, setTodosChange }) => {
  const [todos, setTodos] = useState([]); //empty array

  //delete todo function

  async function deleteTodo(id) {
    try {
      await fetch(`/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token }
      });
 
      setTodos(todos.filter(todos => todos.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }


  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

    console.log(allTodos);
    return <Fragment>
        <table className="table mt-5 text-center table-hover table-dark">
    <thead>
    <tr>
      <th scope="colSpan">Description</th>
      <th scope="colSpan">Where</th>
      <th scope="colSpan">Time</th>
      <th scope="colSpan">Edit</th>
      <th scope="colSpan">Delete</th>
      <th scope="colSpan">Date</th>

    </tr>
    </thead>
    <tbody>
      {todos.length !== 0 && 
      todos[0].todo_id !== null &&
      todos.map(todos => (
          <tr key={todos.todo_id}>
              <td >{todos.description}</td>
              <td >{todos.address}</td>
              <td >{todos.time}</td>
              <td ><EditTodo todo={todos}/></td>
              <td><button className="btn btn-danger" onClick = {() => deleteTodo(todos.todo_id)}>Delete</button></td>
              <td>{moment(todos.date).format('L')}</td>

          </tr>
      ))}
    </tbody>
    </table>
    </Fragment>
};

export default ListTodos;