var React = require('react');

class ChatRoom extends React.Component {

  constructor(props, context){
    super(props, context);
    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
    this.state = {
      message: '',
      messages: [
        {id:0, text: 'first message'},
        {id:1, text: 'second message'},
        {id:2, text: 'third message'}
      ]
    }
  }
  updateMessage(event){
    console.log('updateMessage' + event.target.value)
    this.setState({
      message: event.target.value
    })
  }

  submitMessage(event){
    console.log('submitMessage: ' + this.state.message)
  }

  render(){
    const currentMessage = this.state.messages.map((message, i) => {
      return (
        <li key={message.id}>{message.text}</li>
      )
    })

    return (
      <div>
        <ul>{currentMessage}</ul>
        <input onChange={this.updateMessage} type="text" placeholder="Message"/>
        <br />
        <button onClick={this.submitMessage}>Submit message</button>
      </div>
    )
  }
}

module.exports = ChatRoom;
