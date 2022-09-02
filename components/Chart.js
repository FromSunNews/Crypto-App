import { View, Text } from 'react-native'
import React from 'react'
import {
    ChartDot,
    ChartPath,
    ChartPathProvider,
    ChartXLabel,
    ChartYLabel,
    monotoneCubicInterpolation
} from '@rainbow-me/animated-charts'
import { SIZES, icons, COLORS, FONTS } from '../constants'
import moment from 'moment'
const Chart = ({ containerStyle, chartPrices }) => {

    //Point 
    let startUnixTimestamp = moment().subtract(7, 'day').unix()
    let data = chartPrices ? chartPrices?.map((item, index) => {
        return {
            x: startUnixTimestamp + (index + 1) * 3600,
            y: item
        }
    }) : []



    let points = monotoneCubicInterpolation({ data, range: 40 })
    const formatNumber = (value, roundingPoint) => {
        if (value > 1e9) {
            return `${(value / 1e9).toFixed(roundingPoint)}B`
        } else if (value > 1e6) {
            return `${(value / 1e6).toFixed(roundingPoint)}M`
        } else if (value > 1e3) {
            return `${(value / 1e3).toFixed(roundingPoint)}K`
        } else
            return value.toFixed(roundingPoint)
    }
    const getYAxisLabelValues = () => {
        if (chartPrices != undefined) {
            let minValue = Math.min(...chartPrices)
            let maxValue = Math.max(...chartPrices)
            let midValue = (minValue + maxValue) / 2
            let higherMidValue = (maxValue + midValue) / 2
            let lowerMidValue = (minValue + midValue) / 2
            let roundingPoint = 2
            return [
                formatNumber(maxValue, roundingPoint),
                formatNumber(higherMidValue, roundingPoint),
                formatNumber(lowerMidValue, roundingPoint),
                formatNumber(minValue, roundingPoint)
            ]
        } else {
            return []
        }
    }
    const formatUSD = (value) => {
        'worklet';
        if (value === '') {
            return ''
        }
        return `$${Number(value).toFixed(2)}`
    }
    const formatDateTime = value => {
        'worklet';
        if (value === '') {
            return ''
        }
        var selectdDate = new Date(value * 1000)
        let date = `0${selectdDate.getDate()}`.slice(-2)
        let month = `0${selectdDate.getMonth() + 1}`.slice(-2)
        return `${date} / ${month}`
    }
    return (
        <View
            style={{
                ...containerStyle
            }}
        >
            {/* Y Axis LAbel */}
            <View
                style={{
                    position: 'absolute',
                    left: SIZES.padding,
                    top: 0,
                    bottom: 0,
                    justifyContent: 'space-between'
                }}
            >
                {/* get Y Axis Label Value */}
                {getYAxisLabelValues().map((item, index) => {
                    return (
                        <Text
                            style={{
                                color: COLORS.lightGray3,
                                ...FONTS.body4,

                            }}
                            key={index}>{item}</Text>
                    )
                })}
            </View>
            {/* Chart */}

            <ChartPathProvider
                data={{
                    points,
                    smoothingStrategy: 'bezier'
                }}
            >
                <ChartPath
                    height={150}
                    width={SIZES.width}
                    strokeWidth={2}
                    stroke={COLORS.lightGreen}
                />
                <ChartDot
                >
                    <View
                        style={{
                            position: 'absolute',
                            left: -35,
                            width: 80,
                            height: 80,
                            alignItems: 'center',
                            backgroundColor: COLORS.transparentBlack1,
                            borderRadius: 40,
                            bottom: -40,
                        }}
                    >
                        {/* Dot */}
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 25,
                                height: 25,
                                borderRadius: 15,
                                backgroundColor: COLORS.white,
                                bottom: -25
                            }}
                        >
                            <View
                                style={{
                                    width: 15,
                                    height: 15,
                                    backgroundColor: COLORS.lightGreen,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'

                                }}
                            >
                                <View
                                    style={{
                                        width: SIZES.width * 2,
                                        height: 2,
                                        backgroundColor: COLORS.transparentRed

                                    }}
                                ></View>
                            </View>
                        </View>
                        {/* Y Label */}
                        <ChartYLabel
                            format={formatUSD}
                            style={{
                                color: COLORS.white,
                                ...FONTS.body5,
                                bottom: -25
                            }}
                        />
                        {/* X Label */}
                        <ChartXLabel
                            format={formatDateTime}
                            style={{
                                marginTop: 30,
                                color: COLORS.white,
                                ...FONTS.body5,
                                lineHeight: 15
                            }}
                        />
                    </View>
                </ChartDot>
            </ChartPathProvider>

        </View>
    )
}

export default Chart