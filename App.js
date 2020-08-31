import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, 
         Keyboard, TouchableOpacity, Vibration } from 'react-native'
import { IntInput } from './IntInput'

class Pomodoro extends React.Component {
    state = {
        activity: 'WORK',
        buttonText: 'START',
        workUserMinutes: this.props.workMinutes,
        workUserSeconds: 0,
        breakUserMinutes: this.props.breakMinutes,
        breakUserSeconds: 0,
        timerSeconds: this.props.workMinutes * 60
    }

    tic = () => {
        const { state: { activity, timerSeconds },
                workSeconds, breakSeconds } = this

        if (timerSeconds === 0) {
            Vibration.vibrate(0)
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
        const { state: { activity }, workSeconds, breakSeconds } = this

        this.stopTimer()
        this.setState({
            buttonText: "START",
            timerSeconds: activity === "WORK" ? workSeconds : breakSeconds
        })
    }

    handleInputChange = (stateKey, value) => {
        this.setState({ [stateKey]: value })
    }

    componentDidMount() {
        //this.startTimer()
    }

    componentWillUnmount() {
        this.stopTimer()
    }

    get timerString() {
        const { timerSeconds } = this.state

        const minutes = Math.floor(timerSeconds / 60)
        const minutes_str = minutes.toString()
        let seconds_str = (timerSeconds % 60).toString()
        seconds_str = seconds_str.length < 2 ? `0${seconds_str}` : seconds_str
        return `${minutes_str}:${seconds_str}`
    }

    get workSeconds() {
        const { workUserMinutes, workUserSeconds } = this.state
        
        return workUserMinutes * 60 + workUserSeconds
    }
    
    get breakSeconds() {
        const { breakUserMinutes, breakUserSeconds } = this.state
        
        return breakUserMinutes * 60 + breakUserSeconds
    }

    render() {
        const { state: { activity, buttonText, breakUserMinutes, 
                         breakUserSeconds, workUserMinutes, workUserSeconds },
                handlePauseOrStart, handleReset, handleInputChange, timerString } = this
        return (
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.top}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                        <View>
                            <View style={styles.inputContainer}>
                                <Text>Work Time:</Text>
                                <IntInput
                                    label="Minutes"
                                    value={workUserMinutes}
                                    onChange={(value) => handleInputChange("workUserMinutes",value)}
                                />
                                <IntInput
                                    label="Seconds"
                                    value={workUserSeconds}
                                    onChange={(value) => handleInputChange("workUserSeconds",value)}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>Break Time:</Text>
                                <IntInput
                                    label="Minutes"
                                    value={breakUserMinutes}
                                    onChange={(value) => handleInputChange("breakUserMinutes",value)}
                                />
                                <IntInput
                                    label="Seconds"
                                    value={breakUserSeconds}
                                    onChange={(value) => handleInputChange("breakUserSeconds",value)}
                                />
                            </View>
                        </View>
                        
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    top : {
        flex: 1,
    },
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
        paddingHorizontal: 15,
        marginHorizontal: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
    },
    inputContainer: {
        flexDirection: "row",
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const App = () => <Pomodoro workMinutes={25} breakMinutes={5}/>

export default App
