import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

class IntInput extends React.Component {
    state = {
        error: false,
        value: this.props.value
    }

    onChange = (value) => {
        const intValue = parseInt(value)
        if (Number.isNaN(intValue)) {
            this.setState({ value, error: true })
        }
        else {
            this.props.onChange(intValue)
            this.setState({ value: intValue, error: false })
        }
    }
    
    render() {
        const { onChange, state: { value, error }, props: { label } } = this

        return (
            <TextInput 
                label={label}
                value={value.toString()}
                keyboardType="numeric"
                style={styles.intInput}
                onChangeText={(value) => onChange(value)}
                error={error} 
            />
        )
    }
}

const styles = StyleSheet.create({
    intInput: {
        marginHorizontal: 10,
        minWidth: 90,
    },
})

export { IntInput }
