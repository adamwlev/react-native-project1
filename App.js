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
        const { activity, timerSeconds, workSeconds, breakSeconds } = this.state

        if (timerSeconds === 0) {
            if (activity === 'WORK') {
                this.setState({
                    activity: 'BREAK',
                    timerSeconds: breakSeconds
                })
            }
            else {
                this.setState({
                    activity: 'WORK',
                    timerSeconds: workSeconds
                })
            }
        }
        else {
            this.setState({ timerSeconds: timerSeconds - 1 })
        }
    }

    startTimer = () => {
        this.interval = setInterval(this.tic, 1000)
    }

    stopTimer = () => {
        clearInterval(this.interval)
    }

    handlePauseOrStart = () => {
        const { buttonText } = this.state

        if (buttonText === "PAUSE") {
            this.stopTimer()
            this.setState({ buttonText: "START" })
        }
        else {
            this.startTimer()
            this.setState({ buttonText: "PAUSE" })
        }
    }

    handleReset = () => {
        const { activity, workSeconds, breakSeconds } = this.state

        this.stopTimer()
        this.setState({
            buttonText: "START",
            timerSeconds: activity === "WORK" ? workSeconds : breakSeconds
        })
    }

    componentDidMount() {
        this.startTimer()
    }

    componentWillUnmount() {
        this.stopTimer()
        console.log('unmounting')
    }

    get timerString() {
        const { timerSeconds } = this.state

        const minutes = Math.floor(timerSeconds/60)
        const minutes_str = minutes.toString()
        let seconds_str = (timerSeconds % 60).toString()
        seconds_str = seconds_str.length < 2 ? `0${seconds_str}` : seconds_str
        return `${minutes_str}:${seconds_str}`
    }

    render() {
        const { state: { activity, buttonText },
                handlePauseOrStart, handleReset, timerString } = this
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>
                    {`${activity} TIMER`}
                </Text>
                <Text style={styles.timer}>
                    {timerString}
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={handlePauseOrStart}
                    >
                        <Text style={styles.buttonText}>{buttonText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={handleReset}
                    >
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
