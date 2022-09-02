import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../constants'
const TextButton = ({ label, containerStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 3,
                paddingHorizontal: 18,
                borderRadius: 15,
                backgroundColor: COLORS.gray1,
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Text style={{
                ...FONTS.h3,
                color: COLORS.white
            }}>{label}</Text>
        </TouchableOpacity>
    )
}

export default TextButton