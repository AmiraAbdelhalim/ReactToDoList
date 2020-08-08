import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

class Todo extends React.Component{
  constructor(){
    super();
    this.state={
      tasks:[ //array of tasks
        {title: "kill everyone", done: true},
        {title: "finish task one", done: false}
      ],
      newTask: "" //the new task to be pushed in the array
    };
  }

  addTask=(e)=>{
    e.preventDefault();
    const tasks= this.state.tasks;
    tasks.push({title: this.state.newTask}); //add the new item to the array
    if(this.state.newTask !== ""){//if there is a new item
      this.setState({tasks: tasks, newTask: ""});//change state and set newTask empty again
      this.clearInputField();
    }
  }

  
  clearInputField =() => {
    document.getElementById("taskInput").value="";
  }

  setNewTask=(e) =>{
    this.setState({newTask: e.target.value});
  } //change state of the newTask to have the new input in the input field


  doneTask=(i)=>{
    const tasks= this.state.tasks;
    tasks[i].done = !tasks[i].done; //toggle done true, false
    this.setState({tasks: tasks});
  }

  deleteTask=(i) =>{
    const tasks= this.state.tasks;
    tasks.splice(i,1); //remove one item at index i
    this.setState({tasks: tasks});
  }

  render(){
    return(
      <div className="container w-85 border rounded mt-3" style={{backgroundColor: "#FFFFD1"}}>
        <h3>YOUR TODO</h3>
        <TodoList tasks={this.state.tasks} doneTask={this.doneTask} deleteTask={this.deleteTask}/>
        <TodoForm addTask={this.addTask} setNewTask={this.setNewTask}/>
      </div>
    );
  }

}


export default Todo;