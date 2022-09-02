import { View, Text } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../constants'
const HeaderBar = ({ title }) => {
    return (
        <View
            style={{
                marginTop: 50,
                paddingHorizontal: SIZES.padding,
                justifyContent: 'flex-end'
            }}
        >
            <Text style={{ ...FONTS.h2, color: COLORS.white, fontWeight: 'bold', marginBottom: 10, }}>{title}</Text>
        </View>
    )
}

export default HeaderBar