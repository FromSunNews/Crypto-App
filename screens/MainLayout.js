import { View, Animated } from 'react-native'
import React from 'react'
import { IconTextButton } from '../components'
import { connect } from 'react-redux'
import { COLORS, icons, SIZES } from '../constants'
const MainLayout = ({ children, isTradeModalVisible }) => {
    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        if (isTradeModalVisible) {
            Animated.timing(modalAnimatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start()
        } else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start()
        }
    }, [isTradeModalVisible])

    const modalY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [SIZES.height, SIZES.height - 280]
    })
    return (
        <View
            style={{
                flex: 1,

            }}
        >
            {children}
            {/* Dim BackGround */}
            {isTradeModalVisible &&
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0, right: 0,
                        backgroundColor: COLORS.transparentBlack
                    }}
                    opacity={modalAnimatedValue}
                ></Animated.View>
            }
            {/* Modal */}
            <Animated.View
                style={{
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                    padding: SIZES.padding,
                    backgroundColor: COLORS.primary,
                    top: modalY,
                    borderRadius: SIZES.radius
                }}
            >
                <IconTextButton
                    label='Transfer'
                    icon={icons.send}
                    onPress={() => console.log('Transfer')}
                />
                <IconTextButton
                    label='Withdraw'
                    icon={icons.withdraw}
                    onPress={() => console.log('Withdraw')}
                    containerStyle={{
                        marginTop: SIZES.base,
                    }}
                />
            </Animated.View>
        </View>
    )
}
function mapStateToProps(state) {
    return {
        isTradeModalVisible: state.TabReducer.isTradeModalVisible
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);