import React from 'react';
import TodoItem from './TodoItem';

//todolist where all items appear
class TodoList extends React.Component{
    render(){
      return(
        <div>
          {this.props.tasks.map((task,i)=>(
            <TodoItem key={i} data={task} index={i} doneTask={this.props.doneTask} deleteTask={this.props.deleteTask}/>
          ))}
        </div>
      );
    }
}

export default TodoList;

