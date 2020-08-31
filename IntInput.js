import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

class IntInput extends React.Component {
    state = {
        error: false,
        value: this.props.value
    }

    onChange = (value) => {
        let intValue = parseInt(value)
        if (!Number.isNaN(intValue) || (value.length === 0)) {
            if (value.length === 0) intValue = 0
            this.props.onChange(intValue)
            this.setState({ value: value.length === 0 ? value : intValue, error: false })
        }
        else {
            this.setState({ value, error: true })
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
