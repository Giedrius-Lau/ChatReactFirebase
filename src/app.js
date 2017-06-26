var React = require('react');
var ReactDOM = require('react-dom');
var ChatRoom = require('./components/chat');

class App extends React.Component {
  render(){
    return(
      <div>
        <h3>ReactApp</h3>
        <ChatRoom />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
