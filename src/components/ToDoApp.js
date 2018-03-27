import React from 'react';
import AddOption from './AddOptions';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal.js'

class ToDoApp extends React.Component {
  
  state = {
    options: [],
    selectedOption: undefined
  }

  handleDeleteOptions = () => {
    this.setState(()=>({ options: []}));
  }

  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }))
  }
  
  handlePick = () => {
    const random = Math.floor(Math.random()*this.state.options.length);
    const option = this.state.options[random]
    this.setState(() => ({
      selectedOption: option
    }))
  }

  handleAddOption = (option) => {
    if(!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exsist';
    }

    this.setState((prevState)=>({options: prevState.options.concat(option)}))

  }

  handleClearSelectedOption = () => {
    this.setState(() => ({
      selectedOption: undefined
    }))
  }
  
  componentDidMount() {

    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
  
      if(options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {

    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json)
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }


  render() {

    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header subtitle={subtitle}/>
        <div className="container">
          <Action handlePick={this.handlePick} hasOptions={this.state.options.length > 0}/>
          <Options 
            options={this.state.options}
            handleDeleteOptions={this.handleDeleteOptions}
            handleDeleteOption={this.handleDeleteOption}
          />
          <AddOption 
            handleAddOption={this.handleAddOption}
          />
          <OptionModal 
            selectedOption={this.state.selectedOption}
            handleClearSelectedOption={this.handleClearSelectedOption}
          />
        </div>
      </div>
    );
  }
}

export default ToDoApp;
