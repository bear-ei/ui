import {Meta} from '@storybook/react'
import React, {useState} from 'react'
import {StyleProp, Text, View, ViewStyle} from 'react-native'
import {Button} from '../Button'
import {Icon} from '../Icon'
import {VirtualList} from './Virtual-list.component'

export const BigVirtualList = () => {
    const style = {height: 800, width: '100%'} as StyleProp<ViewStyle>
    const itemStyle = {
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    } as StyleProp<ViewStyle>

    const data = Array.from({length: 5000}, (_, index) => ({
        indexKey: `Item${index + 1}`,
        headline: `Item${index + 1}`,
        afterAffordance: true,
        leading: <Icon />
    }))

    return (
        <View style={[style]}>
            <VirtualList
                data={data}
                itemSize={56}
                renderItem={({item}) => (
                    <View
                        key={item.indexKey}
                        style={[itemStyle]}
                    >
                        <Text>{item.indexKey}</Text>
                    </View>
                )}
            />
        </View>
    )
}

export const EmptyVirtualList = () => {
    const [length, setState] = useState(17)
    const style = {height: 800, width: '100%'} as StyleProp<ViewStyle>
    const itemStyle = {
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    } as StyleProp<ViewStyle>

    const data = Array.from({length}, (_, index) => ({
        indexKey: `Item${index + 1}`,
        headline: `Item${index + 1}`,
        afterAffordance: true,
        leading: <Icon />
    }))

    return (
        <View style={[style]}>
            <Button onPressOut={() => setState(length ? 0 : 17)} />
            <VirtualList
                data={data}
                itemSize={56}
                listEmptyComponent={
                    <View>
                        <Text>Empty data</Text>
                    </View>
                }
                renderItem={({item}) => (
                    <View
                        key={item.indexKey}
                        style={[itemStyle]}
                    >
                        <Text>{item.indexKey}</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default {
    title: 'components/VirtualList',
    component: VirtualList
} as Meta<typeof VirtualList>
