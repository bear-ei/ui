import {SHAPE} from '@bearei/element-token'
import type {Meta, StoryObj} from '@storybook/react'
import {useMemo, useState} from 'react'
import type {ViewStyle} from 'react-native'
import {View} from 'react-native'
import {Button} from '../Button'
import {LAYOUT} from '../Common'
import {Icon} from '../Icon'
import {Circle, Rectangular, Square} from '../Skeleton'
import {List} from './List.component'
import {LIST_LEADING_TYPE, LIST_SELECT_TYPE, LIST_TYPE} from './List.enum'
import type {ListData, ListProps} from './List.interface'

const renderListSkeleton = () => {
	const containerStyle = {
		paddingLeft: 16,
		flex: 1,
		gap: 16,
		paddingRight: 28
	} as ViewStyle

	const rectangularStyle = {flex: 1} as ViewStyle

	return (
		<Rectangular
			size={56}
			style={[containerStyle]}
		>
			<Square size={24} />

			<Rectangular
				size={48}
				style={[rectangularStyle]}
			/>

			<Circle size={40} />
		</Rectangular>
	)
}

export const Standard: StoryObj<ListProps> = {
	args: {
		defaultActiveKey: 'TitleB',
		activeKey: 'TitleA',
		closeTrailing: true,
		type: LIST_TYPE.MENU,
		trailingTriggerEvent: 'HOVER',
		data: [
			{
				indexKey: 'TitleA',
				headline: 'TitleA'
			},
			{
				indexKey: 'TitleB',
				headline: 'TitleB'
			},
			{
				indexKey: 'TitleC',
				headline: 'TitleC'
			},
			{
				indexKey: 'TitleD',
				headline: 'TitleD'
			}
		]
	}
}

export const Menu: StoryObj<ListProps> = {
	args: {
		defaultActiveKey: 'TitleB',
		activeKey: 'TitleA',
		type: LIST_TYPE.MENU,
		closeTrailing: true,
		trailingTriggerEvent: 'HOVER',
		data: [
			{
				indexKey: 'TitleA',
				headline: 'TitleA'
			},
			{
				indexKey: 'TitleB',
				headline: 'TitleB'
			},
			{
				indexKey: 'TitleC',
				headline: 'TitleC'
			},
			{
				indexKey: 'TitleD',
				headline: 'TitleD'
			}
		]
	}
}

export const Select = () => {
	const [activeKey, setActiveKey] = useState<string | undefined>(undefined)
	const style = {height: 800, width: '100%'} as ViewStyle
	const data = useMemo(
		() =>
			Array.from({length: 4}, (_, index) => ({
				indexKey: `Title${index + 1}`,
				headline: `Title${index + 1}`,
				leading: <Icon />,
				dependencies: [],
				afterAffordanceSecondaryButtonProps: {disabled: true}
			})),
		[]
	)

	const onActiveKey = (key?: string) => setActiveKey(key)

	return (
		<View style={[style]}>
			<List
				activeKey={activeKey}
				afterAffordance={true}
				data={data}
				enableAutoSelect={true}
				itemSize={56}
				onActive={onActiveKey}
				selectType={LIST_SELECT_TYPE.SINGLE}
				shape={SHAPE.LARGE}
			/>
		</View>
	)
}

export const SelectMenu = () => {
	const [activeKey, setActiveKey] = useState<string | undefined>(undefined)
	const style = {height: 800, width: '100%'} as ViewStyle
	const data = useMemo(
		() =>
			Array.from({length: 200}, (_, index) => ({
				indexKey: `Title${index + 1}`,
				headline: `Title${index + 1}`,
				leading: <Icon />,
				dependencies: []
			})),
		[]
	)

	const onActiveKey = (key?: string) => setActiveKey(key)

	return (
		<View style={[style]}>
			<List
				activeKey={activeKey}
				afterAffordance={true}
				data={data}
				enableAutoSelect={true}
				itemSize={48}
				onActive={onActiveKey}
				selectType={LIST_SELECT_TYPE.SINGLE}
				shape={SHAPE.LARGE}
				type={LIST_TYPE.MENU}
				leadingType={LIST_LEADING_TYPE.ICON}
			/>
		</View>
	)
}

export const Multiselect = () => {
	const [data, setData] = useState<ListData[] | undefined>(undefined)
	const [activeKeys, setActiveKeys] = useState<string[] | undefined>(undefined)
	const style = {height: 800, width: '100%'} as ViewStyle
	// const data1 = useMemo(
	// 	() =>
	// 		Array.from({length: 1255}, (_, index) => ({
	// 			indexKey: `Title${index + 1}`,
	// 			headline: `Title${index + 1}`,
	// 			leading: <Icon />,
	// 			dependencies: []
	// 		})),
	// 	[]
	// )

	const data2 = useMemo(
		() =>
			Array.from({length: 3}, (_, index) => ({
				indexKey: `Title${index + 1}`,
				headline: `Title${index + 1}`,
				leading: <Icon />,
				dependencies: []
			})),
		[]
	)

	const onActiveKeys = (keys?: string[]) => {
		setActiveKeys(keys)
	}

	const skeleton = useMemo(() => renderListSkeleton(), [])
	const updateData = (val: ListData[]) => setData(val)

	return (
		<View style={[style]}>
			<Button onPressOut={() => updateData([...data2].reverse())} />
			<List
				activeKeys={activeKeys}
				data={data ?? data2}
				itemSize={56}
				onActives={onActiveKeys}
				selectType={LIST_SELECT_TYPE.MULTIPLE}
				shape={SHAPE.FULL}
				skeletonElement={skeleton}
			/>
		</View>
	)
}

export const Horizontal = () => {
	const [activeKey, setActiveKey] = useState<string | undefined>(undefined)
	const style = {height: 800, width: '100%'} as ViewStyle
	const data = useMemo(
		() =>
			Array.from({length: 200}, (_, index) => ({
				indexKey: `Title${index + 1}`,
				headline: `Title${index + 1}`,
				leading: <Icon />,
				dependencies: []
			})),
		[]
	)

	const onActiveKey = (key?: string) => setActiveKey(key)

	return (
		<View style={[style]}>
			<List
				activeKey={activeKey}
				afterAffordance={true}
				data={data}
				enableAutoSelect={true}
				itemSize={320}
				layout={LAYOUT.HORIZONTAL}
				onActive={onActiveKey}
				selectType={LIST_SELECT_TYPE.SINGLE}
				shape={SHAPE.LARGE}
				endReachedThreshold={0.5}
				onEndReached={() => {
					console.info('onEndReached')
				}}
			/>
		</View>
	)
}

export default {
	title: 'components/List',
	component: List
} as Meta<typeof List>
