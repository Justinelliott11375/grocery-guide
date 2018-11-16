import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ListItems from './ListItems';



class ListIndex extends Component {

// initialize state 
state = {
  list: [],
  id: 1,
  title: null,
  intervalIsSet: false,
  listToDelete: null,
  listToUpdate: null,
  objectToUpdate: null,
  activeList: {}
};

// when component mounts, check database continuously for changes
  componentDidMount() {
    this.getList();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getList, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // clean-up before component is removed from DOM
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }
  
  // fetch data from database and set state with json response
  getList = () => {
    fetch("/api/getAllLists")
    
      .then(list => list.json())
      .then(res => this.setState({ list: res.list }));
  };

  // add list to database with incrementing id number
  addList = title => {
    let currentIds = this.state.list.map(list => list.id);
    let newListId = 1;
    while (currentIds.includes(newListId)) {
      ++newListId;
    }

    axios.post("/api/addList", {
      id: newListId,
      title: title
    });
  };


  // delete from database with id number
  deleteList = idTodelete => {
    let objIdToDelete = null;
    this.state.list.forEach(list => {
      if (list.id === idTodelete) {
        objIdToDelete = list._id;
      }
    });

    axios.delete("/api/deleteList", {
      list: {
        id: objIdToDelete
      }
    });
  };


  // update, change database info with user input
  updateList = (listToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.list.forEach(list => {
      if (list.id === listToUpdate) {
        objIdToUpdate = list._id;
      }
    });

    axios.post("/api/updateList", {
      id: objIdToUpdate,
      update: { title: updateToApply }
    });
  };

  makeActiveList = (list) => {
    console.log("makeActiveList called");
    console.log(list.title);
    this.setState({activeList: list}, () => console.log("activeList: ", this.state.activeList));
  }


  // UI
  render() {
    const { list } = this.state;
    return (
      <div>
        <ul>
          <h4>Lists</h4>
          {list.length <= 0
            ? "No Lists yet"
            : list.map(list => (
         
                <button  style={{ padding: "10px" }} key={list.title} onClick= {() => this.makeActiveList(list)}>
                  {list.title}
                </button>
              ))}
              
        </ul>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            onChange={e => this.setState({ title: e.target.value })}
            placeholder="add something in the database"
            style={{ width: "200px" }}
          />
          <button onClick={() => this.addList(this.state.title)}>
            ADD
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ listToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteList(this.state.listToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ listToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateList(this.state.listToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
          <ListItems activeList= {this.state.activeList}/>
        </div>
      </div>
    );
  }
}

export default ListIndex;