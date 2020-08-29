import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class Pomodoro extends React.Component {
    state = {
        activity: 'WORK',
        buttonText: 'PAUSE',
        workSeconds: 25 * 60,
        breakSeconds: 5 * 60,
        timerSeconds: 25 * 60
    }

    tic = () => {
        if (this.state.timerSeconds === 0) {
            if (this.state.activity === 'WORK') {
                this.setState({
                    activity: 'BREAK',
                    timerSeconds: this.state.breakSeconds
                })
            }
            else {
                this.setState({
                    activity: 'WORK',
                    timerSeconds: this.state.workSeconds
                })
            }
        }
        else {
            console.log('updating timer')
            this.setState({ timerSeconds: this.state.timerSeconds - 1 })
        }
    }

    startTimer = () => {
        this.interval = setInterval(this.tic, 1000)
    }

    stopTimer = () => {
        clearInterval(this.interval)
    }

    componentDidMount() {
        this.startTimer()
    }

    componentWillUnmount() {
        this.stopTimer()
        console.log('unmounting')
    }

    get timerString() {
        const minutes = Math.floor(this.state.timerSeconds/60)
        const minutes_str = minutes.toString()
        let seconds_str = (this.state.timerSeconds % 60).toString()
        seconds_str = seconds_str.length < 2 ? `0${seconds_str}` : seconds_str
        return `${minutes_str}:${seconds_str}`
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>
                    {`${this.state.activity} TIMER`}
                </Text>
                <Text style={styles.timer}>
                    {this.timerString}
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.stopTimer} style={styles.button}>
                        <Text style={styles.buttonText}>{this.state.buttonText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>RESET</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: "row",
        marginVertical: 10,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    timer: {
        fontSize: 70,
        fontWeight: '300',
    },
    button: {
        backgroundColor: '#00aeef',
        borderRadius: 5,
        paddingHorizontal: 8,
        marginHorizontal: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
    },
});

export default Pomodoro
