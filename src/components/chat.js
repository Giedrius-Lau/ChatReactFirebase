var React = require('react');



class ChatRoom extends React.Component {
  constructor(props, context){
    super(props, context);
    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)

    this.state = {
      message: '',
      messages: []
    }
  }



  componentDidMount(){
    firebase.database().ref('messages/').on('value', (snapshot) => {
      const currentMessage = snapshot.val()

      if (currentMessage != null){
        this.setState({
          messages: currentMessage
        })
      }
    })
  }

  updateMessage(event){
    // console.log('updateMessage' + date)
    this.setState({
      message: event.target.value
    })
  }

  submitMessage(event){
    var date = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    const nextMessage = {
      id: this.state.messages.length,
      text: this.state.message,
      time: date
    }
    firebase.database().ref('messages/' + nextMessage.id).set(nextMessage)



    // var list = Object.assign([], this.state.messages)
    // list.push(nextMessage)
    // this.setState({
    //   messages: list
    // })

  }

  render(){
    const currentMessage = this.state.messages.map((message, i) => {
      return (
        <li key={message.id}>{message.time}:  {message.text}</li>
      )
    })

    return (
      <div className="mainContainer">
        <ul id="chatLog" className="chatContainer mylist">{currentMessage}</ul>
        <input className="mainMessage" onChange={this.updateMessage} type="text" placeholder="Message"/>
        <br />
        <button className="mainSend add" onClick={this.submitMessage}>Submit message</button>
      </div>
    )
  }
}

module.exports = ChatRoom;
