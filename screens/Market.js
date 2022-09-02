import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Animated
} from 'react-native';
import { MainLayout } from './';
import { connect } from 'react-redux'
import { getCoinMarket } from '../stores/markket/marketAction';
import { constants, SIZES, COLORS, FONTS, dummyData, icons } from '../constants';
import { HeaderBar, TextButton } from '../components';
import { LineChart } from 'react-native-chart-kit';
import { measure } from 'react-native-reanimated';
import { transform } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
const Market = ({ getCoinMarket, coins }) => {
    React.useEffect(() => {
        getCoinMarket()
    }, [])
    const onMarketTabPress = React.useCallback(marketTabIndex => {
        marketTabScrollViewRef?.current?.scrollToOffset({
            offset: marketTabIndex * SIZES.width
        })
    })
    const marketTabs = constants.marketTabs.map((marketTab) => ({
        ...marketTab,
        ref: React.createRef()
    }))
    const TabIndicator = ({ measureLayout, scrollX }) => {
        const inputRange = marketTabs.map((_, i) => i * SIZES.width)
        const translateX = scrollX.interpolate({
            inputRange,
            outputRange: measureLayout.map(measure => measure.x)
        })
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    left: 0,
                    height: '100%',
                    width: (SIZES.width - (SIZES.radius * 2)) / 2,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray,
                    transform: [{
                        translateX
                    }]
                }}
            />
        )
    }
    const Tabs = ({ scrollX, onMarketTabPress }) => {
        const [measureLayout, setMeasureLayout] = React.useState([])
        const containerRef = React.useRef()
        React.useEffect(() => {
            let ml = []
            marketTabs.forEach(marketTab => {
                marketTab?.ref?.current?.measureLayout(
                    containerRef.current,
                    (x, y, width, height) => {
                        ml.push({
                            x, y, width, height
                        })
                        if (ml.length === marketTabs.length) {
                            setMeasureLayout(ml)
                        }
                    }
                )
            })
        }, [containerRef.current])
        return (
            <View
                ref={containerRef}
                style={{
                    flexDirection: 'row'
                }}
            >
                {/* Tab indicator */}
                {measureLayout.length > 0 &&
                    <TabIndicator
                        measureLayout={measureLayout}
                        scrollX={scrollX}
                    />
                }
                {/* Tabs */}
                {marketTabs.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={`MarketTab-${index}`}
                            style={{ flex: 1 }}
                            onPress={() => onMarketTabPress(index)}
                        >
                            <View
                                ref={item.ref}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 40,
                                    paddingHorizontal: 15
                                }}
                            >
                                <Text style={{
                                    color: COLORS.white,
                                    ...FONTS.h3
                                }}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
    const renderTabBar = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.gray,
                    marginHorizontal: SIZES.radius
                }}
            >
                <Tabs
                    scrollX={scrollX}
                    onMarketTabPress={onMarketTabPress()}
                />
            </View>
        )
    }
    const renderButton = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: SIZES.radius,
                    marginHorizontal: SIZES.radius
                }}
            >
                <TextButton
                    label='USD'
                />
                <TextButton
                    label='% (7d)'
                    containerStyle={{ marginLeft: SIZES.base }}
                />
                <TextButton
                    label='Top'
                    containerStyle={{ marginLeft: SIZES.base }}
                />
            </View>
        )
    }
    const marketTabScrollViewRef = React.useRef()
    const scrollX = React.useRef(new Animated.Value(0)).current

    const renderList = () => {
        return (
            <Animated.FlatList
                ref={marketTabScrollViewRef}
                data={marketTabs}
                contentContainerStyle={{
                    marginTop: SIZES.padding
                }}
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment='center'
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                onScroll={
                    Animated.event([
                        { nativeEvent: { contentOffset: { x: scrollX } } }
                    ], {
                        useNativeDriver: false
                    })
                }
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={{
                                flex: 1,
                                width: SIZES.width
                            }}
                        >
                            <FlatList
                                data={coins}
                                keyExtractor={item => item.id}
                                renderItem={({ item, index }) => {
                                    let priceColor = (item.price_change_percentage_7d_in_currency == 0) ? COLORS.lightGray : item.price_change_percentage_7d_in_currency > 0 ?
                                        COLORS.lightGreen : COLORS.red
                                    return (
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginBottom: SIZES.radius,
                                                paddingHorizontal: SIZES.padding
                                            }}
                                        >
                                            {/* Coin  */}
                                            <View
                                                style={{
                                                    flex: 1.5,
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={{
                                                        height: 20,
                                                        width: 20
                                                    }}
                                                />
                                                <Text style={{
                                                    color: COLORS.white,
                                                    ...FONTS.h3,
                                                    marginLeft: SIZES.radius,
                                                }}>{item.name}</Text>
                                            </View>
                                            {/* Chart */}
                                            <View
                                                style={{
                                                    flex: 1,
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <LineChart
                                                    withHorizontalLabels={false}
                                                    withVerticalLabels={false}
                                                    withDots={false}
                                                    withInnerLines={false}
                                                    withVerticalLines={false}
                                                    withOuterLines={false}
                                                    data={{
                                                        datasets: [
                                                            {
                                                                data: item.sparkline_in_7d.price
                                                            }
                                                        ]
                                                    }}
                                                    width={100}
                                                    height={60}
                                                    chartConfig={{
                                                        color: () => priceColor
                                                    }}
                                                    bezier
                                                    style={{ paddingRight: 0 }}
                                                />
                                            </View>
                                            {/* Figures */}
                                            <View
                                                style={{
                                                    flex: 1,
                                                    alignItems: 'flex-end',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Text style={{
                                                    color: COLORS.white,
                                                    ...FONTS.h4
                                                }}>$ {item.current_price}</Text>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'flex-end',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    {
                                                        item.price_change_percentage_7d_in_currency != 0 &&
                                                        <Image
                                                            source={icons.upArrow}
                                                            style={{
                                                                height: 10,
                                                                width: 10,
                                                                tintColor: priceColor,
                                                                transform: item.price_change_percentage_7d_in_currency > 0 ? [{ rotate: '45deg' }] : [{ rotate: '125deg ' }]
                                                            }}
                                                        />
                                                    }
                                                    <Text style={{
                                                        marginLeft: 5,
                                                        color: priceColor,
                                                        ...FONTS.body5
                                                    }}>{item.price_change_percentage_7d_in_currency.toFixed(2)}%</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    )
                }}
            />
        )
    }

    return (
        <MainLayout>
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.black
                }}
            >
                {/* Header */}
                <Text style={{ ...FONTS.h2, color: COLORS.white, fontWeight: 'bold', marginBottom: 10, marginTop: 50, paddingHorizontal: SIZES.radius }}>Market</Text>
                {/* Tab bar */}
                {renderTabBar()}
                {/* Buttons */}
                {renderButton()}
                {/* Market List */}
                {renderList()}
            </View>
        </MainLayout>
    )
}
function mapStateToProps(state) {
    return {
        coins: state.marketReducer.coins
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCoinMarket: (currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => {
            return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Market);