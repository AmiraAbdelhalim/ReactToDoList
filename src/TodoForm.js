import React from 'react';

//todoForm
class TodoForm extends React.Component{
    render(){
      return(
        <form className="form-inline p-4">
          <div className="form-group mr-5">
            <label for="taskInput" className="mr-5">NEW TASK</label>
            <input onChange={this.props.setNewTask} type="text" id="taskInput" className="form-control" placeholder="Enter New Task" />
          </div>
          <button type="button" className="btn btn-primary" onClick={this.props.addTask}>ADD</button>
        </form>
      );
    }
}

export default TodoForm;