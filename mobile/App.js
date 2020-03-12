import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import io from 'socket.io-client';
import moment from 'moment';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: []
    };
  }

  componentDidMount() {
    this.socket = io('http://192.168.0.130:3000');

    this.socket.on('newMessage', newMessage => {
      this.setState({ messages: [...this.state.messages, newMessage] });
    });
  }

  sendMessage() {
    const { message, messages } = this.state,
      newMessage = {
        text: message,
        sended: true,
        date: moment()
      };

    this.setState({
      message: '',
      messages: [...messages, newMessage]
    });

    this.socket.emit('newMessage', newMessage);
  }

  render() {
    const { message, messages } = this.state;

    return (
      <>
        <View style={styles.container}>
          <Text style={styles.title}>ChatApp</Text>
  
          <FlatList
            style={styles.list}
            data={messages}
            renderItem={({ item }) => (
              <View style={item.sended ? styles.sendedMessage : styles.receivedMessage}>
                <Text style={styles.text}>{item.text}</Text>
                <Text style={styles.date}>{moment(item.date).fromNow()}</Text>
              </View>
            )}
          />
  
          <TextInput
            style={styles.textInput}
            placeholder="Send a message"
            value={message}
            onChangeText={message => this.setState({ message })}
            onSubmitEditing={() => this.sendMessage()} />
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 16
  },

  textInput: {
    height: 60,
    backgroundColor: '#EFEFEF',
    width: '100%',
    paddingHorizontal: 8,
    borderRadius: 7,
    position: 'absolute',
    bottom: 16
  },

  title: {
    backgroundColor: '#383838',
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#FFF',
    borderRadius: 7,
  },

  sendedMessage: {
    width: '80%',
    backgroundColor: '#EFEFEF',
    alignSelf: 'flex-end',
    borderRadius: 7,
    padding: 16,
    marginBottom: 8
  },

  receivedMessage: {
    width: '80%',
    backgroundColor: '#ABABAB',
    borderRadius: 7,
    padding: 16,
    marginBottom: 8
  },

  list: {
    flex: 1,
    width: '100%',
    marginBottom: 64 + 8,
    marginTop: 16
  },

  date: {
    fontSize: 12,
    color: '#909090',
    alignSelf: 'flex-end'
  }
});
