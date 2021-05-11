import React, { Component } from 'react';
import InputForm from './components/InputForm/';
import ModalEdit from './components/ModalEdit';
import PbookList from './components/PbookList';
import phonebook_db from './phonebook_db.json';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

class App extends Component {

  state = {
    currName: '',
    currNumber: '',
    currentEditId: '',
    entries: [],
    modalIsOpen: false,
  }

  componentDidMount() {
    if (localStorage.phoneBookentries) {
      const localEntries = JSON.parse(localStorage.phoneBookentries);
      if (localEntries.length) {
        this.setState({
          entries: [...localEntries]
        });
        return;
      }
    }
    
    this.setState({
      entries: [...(phonebook_db.map(entry => (
        { ...entry, id: uuidv4() }
      )))]
    });
  }

  componentDidUpdate() {
    localStorage.setItem('phoneBookentries', JSON.stringify(this.state.entries));
  }

  onNameInput = (event) => {
    this.setState({ currName: event.target.value })
  }

  onNumberInput = (event) => {
    this.setState({ currNumber: event.target.value })
  }

  submitEntry = (event) => {
    event.preventDefault();
    event.target.reset();
    this.setState(({ entries, currName, currNumber }) => (
      {
        entries: [...entries, {
          id: uuidv4(),
          name: currName,
          number: currNumber,
        }],
        currName: '',
        currNumber: ''
      }
    ))
  }

  entryEditHandler = (id) => {
    const newEntries = this.state.entries.map(entry => {
      if (entry.id === id) return {
        ...entry,
        name: this.state.currName,
        number: this.state.currNumber,
      };
      return entry;
    })
    return newEntries;
  }

  entryDeleteHandler = (id) => {
    this.setState((prevState => ({ entries: prevState.entries.filter(entry => entry.id !== id) })));
  }

  onEdit = (event) => {
    const currentId = event.target.dataset.id;
    const currentEntry = this.state.entries.find(entry => entry.id === currentId)
    this.setState({
      modalIsOpen: true,
      currentEditId: currentId,
      currName: currentEntry.name,
      currNumber: currentEntry.number,
    });
  }

  onEditSubmit = (event) => {
    event.preventDefault();
    const newEntries = this.entryEditHandler(this.state.currentEditId)
    this.setState({
      entries: [...newEntries],
      currName: '',
      currNumber: '',
      modalIsOpen: false
    })
  }

  onDelete = (event) => {
    const id = event.target.dataset.id;
    this.entryDeleteHandler(id);
  }

  modalCloseHandler = (event) => {
    if (event.target === event.currentTarget) this.setState({ modalIsOpen: false });
  }

  render() {
    const { entries, modalIsOpen } = this.state;
    return (
      <div className="App" >
        <h1>PhoneBook / home</h1>
        <InputForm nameInput={this.onNameInput} numberInput={this.onNumberInput} submitEntry={this.submitEntry} />
        {entries.length > 0 && <PbookList entries={entries} onEdit={this.onEdit} onDelete={this.onDelete} />}
        {modalIsOpen && <ModalEdit onClose={this.modalCloseHandler}
          currentName={this.state.currName}
          currentNumber={this.state.currNumber}
          onEditSubmit={this.onEditSubmit}
          nameInput={this.onNameInput}
          numberInput={this.onNumberInput} />}
      </div>
    );
  }

}

export default App;
