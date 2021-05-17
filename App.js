import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super() 
    this.state = {
      time: 25 * 60,
      status: 'working',
      running: false,
      butt: 'start'
    }
  }
  
  handleChange = (text) => {
    this.setState({
      time: text * 60,
    })
  }

  timerStart = () => {
    if (!this.state.running){
      this.setState({
        running: true,
        butt: 'pause'
      })
    this.id = setInterval(() => {
      this.setState({
        time: this.state.time - 1
      })
      if (this.state.time === 0 && this.state.status === 'working') {
        this.setState({
          running: false,
          status: 'chilling',
          time: this.state.breakTime
        })
        clearInterval(this.id)
          this.timerStart()
      }        
        else if (this.state.status === 'chilling' && this.state.time === 0) {
          clearInterval(this.id)
          this.setState({
            time: 25 * 60,
            butt: 'start',
            status: 'working'
          })
        }
      }, 1000)
  }
  else {
    clearInterval(this.id)
    this.setState({
      running: false,
      butt: 'resume'
    })
  }
  }
  
  handleBreakChange = (text) => {
    this.setState({
      breakTime: text * 60
    })
  } 
  


  pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.pad(Math.floor(this.state.time/60)) + ':' + this.pad(this.state.time % 60)}
        </Text>
        <TextInput keyboardType='numeric' defaultValue={'' + 25} onChangeText={this.handleChange} />
        <TextInput keyboardType='numeric' defaultValue={'' + 5} onChangeText={this.handleBreakChange} />
        <TouchableOpacity onPress={this.timerStart}>
          <Text>
            {this.state.butt}
          </Text>
        </TouchableOpacity>
        <Text>
          {this.state.status}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});
