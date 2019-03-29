import React, { Component } from 'react'
import './App.css'
import { sampleText } from './sampleText'
import marked from 'marked';

class App extends Component {
  state = {
    text: sampleText
  }

  handleChange = (event) => {
    const text = event.target.value
    this.setState({text})
  }

  renderText = (text) =>{
    const __html = marked(text, { sanitize:true })
    return { __html}
  }

  componentDidUpdate () {
    const { text } = this.state
    localStorage.setItem('text', text)
  }

  componentDidMount() {
    const text = localStorage.getItem('text')
    if (text) {
      this.setState({text})
    }else{
      this.setState({text: sampleText})
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <textarea 
            value={ this.state.text }
            className="form-control"
            rows="35"
            onChange={this.handleChange}>
            </textarea>
          </div>
          <div className="col-sm-6">
            <div>
              <div dangerouslySetInnerHTML={ this.renderText(this.state.text) }></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
