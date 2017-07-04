var React = require('react');



class ChatRoom extends React.Component {
  constructor(props, context){
    super(props, context);
    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
    this.choseName = this.choseName.bind(this)

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
  choseName(event){
    this.setState({
      name: event.target.value
    })
  }


  submitMessage(event){
    event.preventDefault();


    var date = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    const nextMessage = {
      id: this.state.messages.length,
      name: this.state.name,
      text: this.state.message,
      time: date
    }
    firebase.database().ref('messages/' + nextMessage.id).set(nextMessage)
    this.refs.message.value = '';



    // var list = Object.assign([], this.state.messages)
    // list.push(nextMessage)
    // this.setState({
    //   messages: list
    // })

  }

  render(){
    const currentMessage = this.state.messages.map((message, i) => {
      return (
        <li key={message.id}>
          <i className="name">{message.name} {message.time}:</i>
          <p id="messages">{message.text}</p>
        </li>
      )
    })

    return (
      <div className="mainContainer">
        <ul id="chatLog" className="chatContainer mylist">{currentMessage}</ul>
        <form onSubmit={this.submitMessage}>
        <input className="mainMessage mainMessage2" onChange={this.choseName} type="text" placeholder="Your name:"></input>
        <input className="mainMessage message" onChange={this.updateMessage} ref="message" type="text" placeholder="Message"/>
        <br />
        <button className="mainSend add" onClick={this.submitMessage}>Send</button>
        </form>
      </div>
    )
  }
}

module.exports = ChatRoom;
