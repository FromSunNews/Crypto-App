import React, { useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
import { MainLayout } from './';
import { connect } from 'react-redux'

import { getHoldings, getCoinMarket } from '../stores/markket/marketAction';
import { useFocusEffect } from '@react-navigation/native';
import { SIZES, COLORS, FONTS, dummyData, icons } from '../constants';
import { BalanceInfo, IconTextButton, Chart } from '../components';
const Portfolio = ({ getHoldings, myHoldings }) => {
    const [selectedCoin, setSelectedCoin] = React.useState({})
    useFocusEffect(
        React.useCallback(() => {
            getHoldings(dummyData.holdings)
            getCoinMarket()
        }, [])
    )
    React.useEffect(() => {
        setSelectedCoin(myHoldings[0])
    }, [])


    let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0)

    let valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0)
    let percChange = valueChange / (totalWallet - valueChange) * 100
    const renderWalletInfoSection = () => {
        return (
            <View
                style={{
                    paddingHorizontal: SIZES.padding,
                    borderBottomRightRadius: 25,
                    borderBottomLeftRadius: 25,
                    backgroundColor: COLORS.gray,
                }}
            >
                {/* Balance info  */}
                <BalanceInfo
                    title='Portfolio'
                    displayAmount={totalWallet}
                    changePct={percChange}
                    containerStyle={{
                        marginTop: 50,
                    }}
                />
                {/* Buttons */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        marginBottom: -15,
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    <IconTextButton
                        label='Transfer'
                        icon={icons.send}
                        containerStyle={{
                            flex: 1,
                            height: 40,
                            marginRight: SIZES.radius,
                        }}
                        onPress={() => console.log('Press Transfer')}
                    />
                    <IconTextButton
                        label='Withdraw'
                        icon={icons.withdraw}
                        containerStyle={{
                            flex: 1,
                            height: 40,
                        }}
                        onPress={() => console.log('Press Withdraw')}
                    />
                </View>

            </View>
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
                {/* Header -Current blance */}
                {renderWalletInfoSection()}
                <Chart
                    containerStyle={{
                        marginTop: SIZES.padding * 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    chartPrices={selectedCoin?.sparkline_in_7d?.value}
                />
                {/* Your Asset */}
                <FlatList
                    data={myHoldings}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                        marginTop: 30
                    }}
                    ListHeaderComponent={
                        <View
                            style={{
                                marginBottom: SIZES.radius
                            }}
                        >
                            <Text style={{ ...FONTS.h3, fontSize: 18, color: COLORS.white, marginLeft: SIZES.padding, }}>Your Asset</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: SIZES.radius,
                                    paddingHorizontal: SIZES.padding
                                }}
                            >
                                <Text style={{
                                    flex: 1, color: COLORS.lightGray3
                                }}>Asset</Text>
                                <Text style={{
                                    flex: 1, color: COLORS.lightGray3,
                                    textAlign: 'right',
                                }}>Price</Text>
                                <Text style={{
                                    flex: 1, color: COLORS.lightGray3,
                                    textAlign: 'right',
                                }}>Hodings</Text>
                            </View>
                        </View>
                    }
                    renderItem={({ item }) => {
                        let priceColor = (item.price_change_percentage_7d_in_currency == 0) ? COLORS.lightGray3 :
                            (item.price_change_percentage_7d_in_currency > 0) ? COLORS.lightGreen : COLORS.red
                        return (
                            <TouchableOpacity
                                style={{
                                    height: 55,
                                    backgroundColor: selectedCoin?.id == item.id ? COLORS.transparentWhite : 'transparent',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={() => setSelectedCoin(item)}
                            >
                                <View
                                    style={{
                                        paddingHorizontal: SIZES.padding,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        flex: 1
                                    }}
                                >
                                    <View style={{
                                        justifyContent: 'flex-start',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        flex: 1
                                    }}>
                                        <Image
                                            source={{ uri: item.image }}
                                            style={{
                                                height: 20,
                                                width: 20
                                            }}
                                        />
                                        {/* Name */}
                                        <Text style={{ color: COLORS.white, ...FONTS.h3, marginLeft: 10, }}>{item.name}</Text>
                                    </View>


                                    {/* Figure */}
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Text style={{
                                            textAlign: 'right',
                                            color: COLORS.white,
                                            ...FONTS.h4
                                        }}>${item.current_price.toLocaleString()}</Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'flex-end'

                                            }}
                                        >
                                            {item.price_change_percentage_7d_in_currency != 0 &&
                                                <Image
                                                    source={icons.upArrow}
                                                    style={{
                                                        height: 10,
                                                        width: 10,
                                                        tintColor: priceColor,
                                                        transform: item.price_change_percentage_7d_in_currency > 0 ? [{ rotate: '45deg' }] : [{ rotate: '125deg' }]
                                                    }}
                                                />

                                            }
                                            <Text style={{
                                                marginLeft: 5,
                                                color: priceColor,
                                                ...FONTS.body5,
                                                lineHeight: 15,
                                                textAlign: 'right',
                                            }}>{item.price_change_percentage_7d_in_currency.toFixed(2)}%</Text>
                                        </View>

                                    </View>
                                    {/* Price */}
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Text style={{
                                            textAlign: 'right',
                                            color: COLORS.white,
                                            ...FONTS.h4,
                                            lineHeight: 15
                                        }}>${item.total.toLocaleString()}</Text>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        )
                    }}
                    ListFooterComponent={
                        <View
                            style={{
                                marginBottom: 50
                            }}
                        ></View>
                    }
                />
            </View>
        </MainLayout >
    )
}
function mapStateToProps(state) {
    return {
        myHoldings: state.marketReducer.myHoldings
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getHoldings: (holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => {
            return dispatch(getHoldings(holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
