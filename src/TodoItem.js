import React from 'react';

//todoitem the one title of the list
class TodoItem extends React.Component{
  render(){
    return(
      //to change color if its done or not
      <div className={`border rounded m-3 p-3 + ${this.props.data.done ? "bg-info" : "bg-white"}`}> 
        {this.props.data.title}
        <button onClick={e => this.props.deleteTask(this.props.index)} type="button" className="btn btn-outline-secondary" style={{float: "right"}}>&#10060;</button>
        <button onClick={e => this.props.doneTask(this.props.index)} type="button" className="btn btn-outline-secondary" style={{float: "right"}}>&#10003;</button>

      </div>
    );
  }
}

export default TodoItem;