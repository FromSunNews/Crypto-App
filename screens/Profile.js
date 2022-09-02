import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView, Switch
} from 'react-native';
import { MainLayout } from './';
import { SIZES, COLORS, FONTS, dummyData, icons } from '../constants';
const Profile = () => {
    const [faceID, setFaceID] = React.useState(true)
    const SectionTitle = ({ title }) => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,

                }}
            >
                <Text style={{
                    color: COLORS.lightGray3,
                    ...FONTS.h4,

                }}>{title}</Text>
            </View>
        )
    }
    const Setting = ({ title, type, value, onPress }) => {
        if (type == 'button') {
            return (
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        height: 50,
                        alignItems: 'center'
                    }}
                    onPress={onPress}
                >
                    <Text style={{
                        flex: 1,
                        color: COLORS.white,
                        ...FONTS.h3
                    }}>{title}</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{
                            marginRight: SIZES.radius,
                            color: COLORS.lightGray3,
                            ...FONTS.h3
                        }}>{value}</Text>
                        <Image
                            source={icons.rightArrow}
                            style={{
                                height: 15,
                                width: 15,
                                tintColor: COLORS.white,
                            }}
                        />
                    </View>

                </TouchableOpacity>
            )
        } else {
            return (
                <View
                    style={{
                        flexDirection: 'row',
                        height: 50,
                        alignItems: 'center'
                    }}
                >
                    <Text style={{
                        flex: 1,
                        color: COLORS.white,
                        ...FONTS.h3
                    }}>{title}</Text>
                    <Switch
                        value={value}
                        onValueChange={value => onPress(value)}
                    />
                </View>
            )
        }
    }
    return (
        <MainLayout>
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: SIZES.padding,
                    backgroundColor: COLORS.black
                }}
            >
                {/* Header */}
                <Text style={{ ...FONTS.h2, color: COLORS.white, fontWeight: 'bold', marginBottom: 10, marginTop: 50 }}>Profile</Text>
                {/* details */}
                <ScrollView>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.radius,
                        }}
                    >
                        {/* Email and ID  */}
                        <View
                            style={{
                                flex: 1
                            }}
                        >
                            <Text style={{
                                color: COLORS.white,
                                ...FONTS.h3
                            }}>{dummyData.profile.email}</Text>
                            <Text style={{
                                color: COLORS.lightGray3,
                                ...FONTS.body4
                            }}>ID: {dummyData.profile.id}</Text>
                        </View>
                        {/* Status */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={icons.verified}
                                style={{
                                    height: 25,
                                    width: 25
                                }}
                            />
                            <Text style={{
                                marginLeft: SIZES.base,
                                color: COLORS.lightGreen,
                                ...FONTS.body4
                            }}>verified</Text>
                        </View>
                    </View>
                    {/* App  */}
                    <SectionTitle
                        title='APP'
                    />

                    <Setting
                        title='Launch Screen'
                        value='Home'
                        type='button'
                        onPress={() => console.log('Press')}
                    />
                    <Setting
                        title='Appearance'
                        value='Dark'
                        type='button'
                        onPress={() => console.log('Press')}
                    />
                    {/* Account  */}
                    <SectionTitle
                        title='ACCOUNT'
                    />
                    <Setting
                        title='Language'
                        value='English'
                        type='button'
                        onPress={() => console.log('Press')}
                    />
                    <Setting
                        title='Face ID'
                        value={faceID}
                        type='switch'
                        onPress={(value) => setFaceID(value)}
                    />
                    <Setting
                        title='Password Settings'
                        value=''
                        type='button'
                        onPress={() => console.log('Press')}
                    />
                    <Setting
                        title='Change Password'
                        value=''
                        type='button'
                        onPress={() => console.log('Press')}
                    />
                    <Setting
                        title='Two Factor Authentication'
                        value='English'
                        type='button'
                        onPress={() => console.log('Press')}
                    />
                </ScrollView>
            </View>
        </MainLayout>
    )
}

export default Profile;