import React from 'react';
import './App.css';

class App extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      newItem: '',
      list: JSON.parse( localStorage.getItem( 'list' ) ) ?? []
    }
  }

  addItem( toDoVlalue ) {
    var currentdate = new Date();
    if (toDoVlalue !== '') {
      const newItem = {
        id: Date.now(),
        value: toDoVlalue,
        isDone: false,
        timeAdded: String( "Added on " + currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " at "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds() )
      };
      // ... means append all the values from current list state to list local var
      const list = [...this.state.list];
      list.push( newItem );

      this.setState({
        list,
        newItem: ''
      });

      localStorage.setItem( 'list', JSON.stringify( list ) );
    }
  }

  deleteItem( id ) {
    const list = [...this.state.list];
    const updatedList = list.filter( item => item.id !== id );

    this.setState({
      list: updatedList
    });

    localStorage.setItem( 'list', JSON.stringify( updatedList ) );
  }

  updateInput( input ) {
    this.setState({
      newItem: input
    });
  }

  checkItem( id, isDone ) {
    const list = [...this.state.list];
    var currentdate = new Date();
    var strStatusPrepend = isDone ? "Completed on " : "Marked Incomplete on ";
    list.forEach(item => {
      if (item.id === id) {
        item.isDone = isDone;
        item.timeAdded = String( strStatusPrepend + currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " at "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds() )
      }
    });

    this.setState({
      list
    });

    localStorage.setItem( 'list', JSON.stringify( list ) );
  }

  getItemClass( isDone ) {
    if (isDone) {
      return 'list-group-item list-group-item-action active';
    } else {
      return 'list-group-item list-group-item-action';
    }
  }

  clearAll() {
    const list = [];
    this.setState({
      list
    });
    localStorage.clear();
  }

  submitOnEnter( strKey ) {
    if( 'Enter' == strKey ) {
      this.addItem(this.state.newItem);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="pb-4">
            <img src="https://img.icons8.com/color/96/000000/todo-list--v2.png"/>
          </div>
          <div className="list-group pb-4">
          <div className="input-group input-group-lg gap-2">
            <button className="btn btn-outline-danger" type="button" onClick={() => this.clearAll()} disabled={!this.state.list.length} ><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-journal-x mx-auto" viewBox="0 0 16 16"><path fillRule="evenodd" d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z"/><path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/><path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/></svg></button>
            <input type="text" className="form-control text-center bg-dark text-info" placeholder="Add Task" aria-label="TODO" aria-describedby="basic-addon1" onKeyUp={e => this.submitOnEnter(e.key)} required value={this.state.newItem} onChange={e => this.updateInput(e.target.value)} />
            <button type="button" className="btn btn-outline-info" id="button-addon2" onClick={() => this.addItem(this.state.newItem)} disabled={!this.state.newItem.length} ><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-journal-plus" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/><path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/><path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/></svg></button>
          </div>
          </div>

          <div className="list-group gap-2">
            {this.state.list.map(item => {
              return(
                <div key={item.id} className={this.getItemClass(item.isDone)} aria-current="true">
                  <div className="d-flex w-100 justify-content-between">
                    <small className="mb-1" onClick={() => this.deleteItem(item.id)}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg></small>
                    <small><input className="form-check-input" type="checkbox" id="checkboxNoLabel" checked={item.isDone} onChange={e => this.checkItem(item.id, e.target.checked)} /></small>
                  </div>
                  <p className="mb-1">{item.value}</p>
                  <small className="fs-6 fw-lighter">{item.timeAdded}</small>
                </div>
              );
            })}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
