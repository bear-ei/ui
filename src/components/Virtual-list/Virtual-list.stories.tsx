import {LAYOUT} from '@/constants'
import type {Meta} from '@storybook/react-native-web-vite'
import {Text, View} from 'react-native'
import {useImmer} from 'use-immer'
import {Button} from '../Button'
import {VirtualList} from './Virtual-list.component'

export const BigVirtualList = () => {
        const data = Array.from({length: 800}, (_, index) => ({
                indexKey: `Item${index + 1}`,
                headline: `Item${index + 1}`,
                afterAffordance: true
        }))

        return (
                <View className='h-full w-full'>
                        <VirtualList
                                data={data}
                                itemSize={56}
                                draggable={true}
                                onEndReached={() => {
                                        console.info('onEndReached')
                                }}
                                renderItem={({item}) => (
                                        <View
                                                key={item.indexKey}
                                                className='flex h-14 items-center justify-center'
                                        >
                                                <Text>{item.indexKey}</Text>
                                        </View>
                                )}
                        />
                </View>
        )
}

export const Sort = () => {
        const [{sort: isSort}, setState] = useImmer({sort: false})
        const data = Array.from({length: 400}, (_, index) => ({
                index: index,
                indexKey: `Item${index + 1}`,
                headline: `Item${index + 1}`,
                afterAffordance: true
        })).sort((a, b) => (isSort ? a.index - b.index : b.index - a.index))

        return (
                <View className='h-full w-full'>
                        <Button
                                onPressOut={() => {
                                        setState(d => {
                                                d.sort = !d.sort
                                        })
                                }}
                        />

                        <VirtualList
                                data={data}
                                itemSize={56}
                                onEndReached={() => {
                                        console.info('onEndReached')
                                }}
                                renderItem={({item}) => (
                                        <View
                                                key={item.indexKey}
                                                className='flex h-14 items-center justify-center'
                                        >
                                                <Text>{item.indexKey}</Text>
                                        </View>
                                )}
                        />
                </View>
        )
}

export const NotData = () => (
        <View className='h-full w-full'>
                <VirtualList
                        data={[]}
                        itemSize={56}
                        draggable={true}
                        onEndReached={() => {
                                console.info('onEndReached')
                        }}
                        renderItem={() => <></>}
                />
        </View>
)

export const Loading = () => (
        <View className='h-full w-full'>
                <VirtualList
                        loading={true}
                        data={[]}
                        itemSize={56}
                        draggable={true}
                        onEndReached={() => {
                                console.info('onEndReached')
                        }}
                        renderItem={() => <></>}
                />
        </View>
)

export const Draggable = () => {
        const data = Array.from({length: 200}, (_, index) => ({
                indexKey: `Item${index + 1}`,
                headline: `Item${index + 1}`,
                afterAffordance: true
        }))

        return (
                <View className='h-full w-full'>
                        <VirtualList
                                data={data}
                                draggable={true}
                                gap={8}
                                itemSize={56}
                                onDragEnd={options => {
                                        console.info(options)
                                }}
                                onEndReached={() => {
                                        console.info('onEndReached')
                                }}
                                renderItem={({item}) => (
                                        <View
                                                key={item.indexKey}
                                                className='flex h-14 items-center justify-center'
                                        >
                                                <Text>{item.indexKey}</Text>
                                        </View>
                                )}
                        />
                </View>
        )
}

export const DraggableHorizontal = () => {
        const data = Array.from({length: 10}, (_, index) => ({
                indexKey: `Item${index + 1}`,
                headline: `Item${index + 1}`,
                afterAffordance: true
        }))

        return (
                <View className='h-14 w-full'>
                        <VirtualList
                                data={data}
                                draggable={true}
                                itemSize={56}
                                layoutType={LAYOUT.HORIZONTAL}
                                onDragEnd={options => {
                                        console.info(options)
                                }}
                                onEndReached={() => {
                                        console.info('onEndReached')
                                }}
                                renderItem={({item}) => (
                                        <View
                                                key={item.indexKey}
                                                className='flex h-14 items-center justify-center'
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
