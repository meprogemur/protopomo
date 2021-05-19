import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Vibration } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      time: 25 * 60,
      status: 'working',
      running: false,
      butt: 'start',
      breakTime: 5 * 60
    }
  }

  handleChange = (text) => {
    this.setState({
      time: text * 60,
    })
  }

  timerStart = () => {
    if (!this.state.running) {
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
          Vibration.vibrate([500, 500, 500])
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

  reset = () => {
    clearInterval(this.id)
    this.setState({
      time: 25 * 60,
      running: false,
      status: 'working',
      butt: 'start'
    })
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
        <View style={styles.timer}>
          <Text style={{ fontSize: 40 }}>
            {this.state.status}
          </Text>
          <Text style={styles.text}>
            {this.pad(Math.floor(this.state.time / 60)) + ':' + this.pad(this.state.time % 60)}
          </Text>
        </View>
        <View style={styles.input}>
          <TextInput style={{ margin: 10, fontSize: 30 }} keyboardType='numeric' defaultValue={'' + 25} onChangeText={this.handleChange} />
          <TextInput style={{ margin: 10, marginLeft: 50, fontSize: 30 }} keyboardType='numeric' defaultValue={'' + 5} onChangeText={this.handleBreakChange} />
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.touch} onPress={this.timerStart}>
            <Text style={styles.tt}>
              {this.state.butt}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress={this.reset}>
            <Text style={styles.tt}>
              reset
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 40,
    marginLeft: 15
  },
  input: {
    flexDirection: 'row',
  },
  timer: {
    margin: 25,
  },
  button: {
    flexDirection: 'row',
  },
  touch: {
    margin: 10
  },
  tt: {
    fontSize: 30,
  }
});
