import React, { Component } from 'react';
import axios from 'axios';

class ListItems extends Component {
    constructor(props) {
        super(props);
    this.state = {
        listItems: [],
        itemIntervalIsSet: false,
        listItemToDelete: null,
        listItemToUpdate: null,
        itemObjectToUpdate: null,
    }
}

// when component mounts, check database continuously for changes
componentDidMount() {
    this.getListItems();
    if (!this.state.itemIntervalIsSet) {
      let interval = setInterval(this.getListItems, 1000);
      this.setState({ itemIntervalIsSet: interval });
    }
  }

  // clean-up before component is removed from DOM
  componentWillUnmount() {
    if (this.state.itemIntervalIsSet) {
      clearInterval(this.state.itemIntervalIsSet);
      this.setState({ itemIntervalIsSet: null });
    }
  }
  
  // fetch data from database and set state with json response
  getListItems = () => {
    fetch("/api/getAllListItems")
    
      .then(listItems => listItems.json())
      .then(res => this.setState({ listItems: res.listItems }));
  };

// add item to database 
addListItem = title => {
    let currentIds = this.state.listItems.map(item => item.id);
    let newItemId = 1;
    while (currentIds.includes(newItemId)) {
      ++newItemId;
    }

    axios.post("/api/addListItem", {
      id: newItemId,
      title: title,
      listId: this.props.activeList.id
    });
  };
    render() {
        const { listItems } = this.state;
        return (
            <div>
                <h4>{this.props.activeList.title}</h4>


            <ul>
              {listItems.length <= 0
                ? "No Items yet"
                : listItems.map(listItems => (
             
                    <li style={{ padding: "10px" }} key={listItems.title}>
                      {listItems.title}
                    </li>
                  ))}
            </ul>
            <div style={{ padding: "10px" }}>
              <input
                type="text"
                onChange={e => this.setState({ title: e.target.value })}
                placeholder="add something in the database"
                style={{ width: "200px" }}
              />
              <button onClick={() => this.addListItem(this.state.title)}>
                ADD
              </button>
            </div>
          </div>
        )
        
    }
}

export default ListItems