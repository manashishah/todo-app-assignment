import "./App.css"; //Importing the CSS file for styling
import { useState, useEffect } from "react"; //Importing necessary hooks from React



//Component for displaying a Todo List
function TodoList() {
  const [todos, setTodos] = useState([]); //State variable for storing todos
  const [userId, setUserId] = useState("1"); //State variable for storing the selected user Id
  const [fetching, setFetching] = useState(false); //State variable for indicating whether data is being fetched
  
  
  //Effect hook to fetch todos based on the selected user Id
  useEffect(() => {
    setFetching(true); //Setting fetching state to true

     //Fetching todos data from a dummy API endpoint
    fetch(`https://dummyjson.com/todos/user/${userId}`)
      .then((res) => res.json()) //Parsing the response as JSON
      .then((data) => {
        setTodos(data.todos); //Updating todos state with fetched data
        setFetching(false); //Setting fetching state to false after data is fetched
      });
  }, [userId]); //Dependency array to trigger effect when user Id changes


   //Function to handle changes in the selected user
  const handleChange = (event) => {
    setUserId(event.target.value); //Updating the selected user Id
  };

  //Rendering the TodoList component
  return (
    <section className="container">
      <header>
        {/* Displaying the header */}
        <h1> To-do App</h1>
      </header>
      <div>
         {/* Dropdown for selecting a user */}
        <label htmlFor="userSelect">Select a User: </label>
        <select id="userSelect" onChange={handleChange}> 
          <option value="1">Arthur </option> {/* User Ids are assigned as value according to each option */}
          <option value="2">Lily</option>
          <option value="3">George</option>
        </select>
      </div>
      <main>

         {/* Displaying data loading message if fetching is true, otherwise rendering the todo list */}
        {fetching ? (
          <p>Data is Loading</p>) :
          (<ul>
              {/* Mapping through todos and rendering each todo item */}
            {todos.map((item) => {
              return <li key={item.id}> {item.todo}</li>; {/* Rendering the todo text */}
            })}
          </ul>)}
      </main>
    </section>
  );
}
export default TodoList;
