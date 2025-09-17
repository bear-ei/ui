import type {Meta} from '@storybook/react'
import type {ViewStyle} from 'react-native'
import {Text, View} from 'react-native'
import {useImmer} from 'use-immer'
import {Button} from '../Button'
import {Icon} from '../Icon'
import {VirtualList} from './Virtual-list.component'

export const BigVirtualList = () => {
	const style = {height: 800, width: '100%'} as ViewStyle
	const itemStyle = {
		height: 56,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	} as ViewStyle

	const data = Array.from({length: 200}, (_, index) => ({
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
				onEndReached={() => {
					console.info('onEndReached')
				}}
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

export const FocusedIndex = () => {
	const [{focusedIndex}, setState] = useImmer({focusedIndex: 0})
	const style = {height: 800, width: '100%'} as ViewStyle
	const itemStyle = {
		height: 56,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	} as ViewStyle

	const data = Array.from({length: 200}, (_, index) => ({
		indexKey: `Item${index + 1}`,
		headline: `Item${index + 1}`,
		afterAffordance: true,
		leading: <Icon />
	}))

	return (
		<View style={[style]}>
			<Button
				onPressOut={() => {
					setState(d => {
						d.focusedIndex = data.length - 1
					})
				}}
			/>
			<VirtualList
				data={data}
				focusedIndex={focusedIndex}
				itemSize={56}
				onEndReached={() => {
					console.info('onEndReached')
				}}
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

export const NotData = () => {
	const style = {height: 800, width: '100%'} as ViewStyle
	const itemStyle = {
		height: 56,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	} as ViewStyle

	const data = Array.from({length: 0}, (_, index) => ({
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

export const Loading = () => {
	const style = {height: 800, width: '100%'} as ViewStyle

	return (
		<View style={[style]}>
			<VirtualList
				itemSize={56}
				loading={true}
			/>
		</View>
	)
}

export const Draggable = () => {
	const style = {height: 800, width: '100%'} as ViewStyle
	const itemStyle = {
		height: 56,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	} as ViewStyle

	const data = Array.from({length: 200}, (_, index) => ({
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
				draggable={true}
				onEndReached={() => {
					console.info('onEndReached')
				}}
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
