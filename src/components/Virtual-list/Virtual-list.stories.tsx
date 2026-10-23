import type {Meta} from '@storybook/react-native-web-vite'

import {useState} from 'react'
import {Text, View} from 'react-native'
import {useImmer} from 'use-immer'

import {LAYOUT} from '../../constants'
import {Button} from '../Button'
import {VirtualList} from './Virtual-list.component'

export const BigVirtualList = () => {
	const [count, setCount] = useState(0)
	const data = Array.from({length: 10000}, (_, index) => ({
		afterAffordance: true,
		headline: `Item${index + 1}`,
		indexKey: `Item${index + 1}`
	}))

	console.info('count: ====>', count)

	return (
		<View className='h-full w-full'>
			<VirtualList
				data={data}
				draggable={true}
				itemSize={56}
				onEndReached={() => setCount(c => c + 1)}
				renderItem={({item}) => (
					<View
						className='flex h-14 items-center justify-center'
						key={item.indexKey}
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
		afterAffordance: true,
		headline: `Item${index + 1}`,
		index: index,
		indexKey: `Item${index + 1}`
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
						className='flex h-14 items-center justify-center'
						key={item.indexKey}
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
			draggable={true}
			itemSize={56}
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
			data={[]}
			draggable={true}
			itemSize={56}
			loading={true}
			onEndReached={() => {
				console.info('onEndReached')
			}}
			renderItem={() => <></>}
		/>
	</View>
)

export const Draggable = () => {
	const data = Array.from({length: 200}, (_, index) => ({
		afterAffordance: true,
		headline: `Item${index + 1}`,
		indexKey: `Item${index + 1}`
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
						className='flex h-14 items-center justify-center'
						key={item.indexKey}
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
		afterAffordance: true,
		headline: `Item${index + 1}`,
		indexKey: `Item${index + 1}`
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
						className='flex h-14 items-center justify-center'
						key={item.indexKey}
					>
						<Text>{item.indexKey}</Text>
					</View>
				)}
			/>
		</View>
	)
}

export default {
	component: VirtualList,
	title: 'components/VirtualList'
} as Meta<typeof VirtualList>
