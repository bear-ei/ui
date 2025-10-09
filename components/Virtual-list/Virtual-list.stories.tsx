import type {Meta} from '@storybook/react'
import {Text, View} from 'react-native'
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

// export const FocusedIndex = () => {
//         const [{sort: isSort}, setState] = useImmer({sort: false})
//         const style = {height: 800, width: '100%'} as ViewStyle
//         const itemStyle = {
//                 height: 56,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//         } as ViewStyle

//         const data = Array.from({length: 400}, (_, index) => ({
//                 index: index,
//                 indexKey: `Item${index + 1}`,
//                 headline: `Item${index + 1}`,
//                 afterAffordance: true,
//                 leading: <Icon />
//         })).sort((a, b) => (isSort ? a.index - b.index : b.index - a.index))

//         return (
//                 <View style={[style]}>
//                         <Button
//                                 onPressOut={() => {
//                                         setState(d => {
//                                                 d.sort = !d.sort
//                                         })
//                                 }}
//                         />
//                         <VirtualList
//                                 data={data}
//                                 // focusedIndex={focusedIndex}
//                                 itemSize={56}
//                                 onEndReached={() => {
//                                         console.info('onEndReached')
//                                 }}
//                                 renderItem={({item}) => (
//                                         <View
//                                                 key={item.indexKey}
//                                                 style={[itemStyle]}
//                                         >
//                                                 <Text>{item.indexKey}</Text>
//                                         </View>
//                                 )}
//                         />
//                 </View>
//         )
// }

// export const NotData = () => {
//         const style = {height: 800, width: '100%'} as ViewStyle
//         const itemStyle = {
//                 height: 56,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//         } as ViewStyle

//         const data = Array.from({length: 0}, (_, index) => ({
//                 indexKey: `Item${index + 1}`,
//                 headline: `Item${index + 1}`,
//                 afterAffordance: true,
//                 leading: <Icon />
//         }))

//         return (
//                 <View style={[style]}>
//                         <VirtualList
//                                 data={data}
//                                 itemSize={56}
//                                 renderItem={({item}) => (
//                                         <View
//                                                 key={item.indexKey}
//                                                 style={[itemStyle]}
//                                         >
//                                                 <Text>{item.indexKey}</Text>
//                                         </View>
//                                 )}
//                         />
//                 </View>
//         )
// }

// export const Loading = () => {
//         const style = {height: 800, width: '100%'} as ViewStyle

//         return (
//                 <View style={[style]}>
//                         <VirtualList
//                                 itemSize={56}
//                                 loading={true}
//                         />
//                 </View>
//         )
// }

// export const Draggable = () => {
//         const style = {height: 800, width: '100%'} as ViewStyle
//         const itemStyle = {
//                 height: 56,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//         } as ViewStyle

//         const data = Array.from({length: 200}, (_, index) => ({
//                 indexKey: `Item${index + 1}`,
//                 headline: `Item${index + 1}`,
//                 afterAffordance: true,
//                 leading: <Icon />
//         }))

//         return (
//                 <View style={[style]}>
//                         <VirtualList
//                                 data={data}
//                                 draggable={true}
//                                 gap={8}
//                                 itemSize={56}
//                                 onDragEnd={options => {
//                                         console.info(options)
//                                 }}
//                                 onEndReached={() => {
//                                         console.info('onEndReached')
//                                 }}
//                                 renderItem={({item}) => (
//                                         <View
//                                                 key={item.indexKey}
//                                                 style={[itemStyle]}
//                                         >
//                                                 <Text>{item.indexKey}</Text>
//                                         </View>
//                                 )}
//                         />
//                 </View>
//         )
// }

// export const DraggableHorizontal = () => {
//         const style = {height: 800, width: '100%'} as ViewStyle
//         const itemStyle = {
//                 height: 56,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//         } as ViewStyle

//         const data = Array.from({length: 10}, (_, index) => ({
//                 indexKey: `Item${index + 1}`,
//                 headline: `Item${index + 1}`,
//                 afterAffordance: true,
//                 leading: <Icon />
//         }))

//         return (
//                 <View style={[style]}>
//                         <VirtualList
//                                 data={data}
//                                 draggable={true}
//                                 // gap={8}
//                                 itemSize={56}
//                                 layoutType={LAYOUT.HORIZONTAL}
//                                 onDragEnd={options => {
//                                         console.info(options)
//                                 }}
//                                 onEndReached={() => {
//                                         console.info('onEndReached')
//                                 }}
//                                 renderItem={({item}) => (
//                                         <View
//                                                 key={item.indexKey}
//                                                 style={[itemStyle]}
//                                         >
//                                                 <Text>{item.indexKey}</Text>
//                                         </View>
//                                 )}
//                         />
//                 </View>
//         )
// }

export default {
        title: 'components/VirtualList',
        component: VirtualList
} as Meta<typeof VirtualList>
