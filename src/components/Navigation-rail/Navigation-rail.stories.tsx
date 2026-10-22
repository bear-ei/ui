import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Circle} from 'lucide-react-native'

import type {NavigationRailProps} from './Navigation-rail.interface'

import {Fab} from '../FAB'
import {ICON_BUTTON_TYPE, IconButton} from '../Icon-button'
import {NavigationRail} from './Navigation-rail.component'
import {NAVIGATION_DESTINATION_POSITION, NAVIGATION_RAIL_ANIMATED, NAVIGATION_RAIL_TYPE} from './Navigation-rail.enum'

export const Standard: StoryObj<NavigationRailProps> = {
	args: {
		animatedType: NAVIGATION_RAIL_ANIMATED.COLLAPSE,
		data: [
			{
				indexKey: 'A',
				labelText: 'Bookmark'
			},
			{
				indexKey: 'B',
				labelText: 'Label2'
			},
			{
				indexKey: 'C',
				labelText: 'Label3'
			}
		],
		defaultActiveKey: 'A',
		fab: <Fab icon={<Circle />} />,
		menu: (
			<IconButton
				icon={<Circle />}
				type={ICON_BUTTON_TYPE.STANDARD}
			/>
		)
	}
}

export const Block: StoryObj<NavigationRailProps> = {
	args: {
		data: [
			{
				indexKey: 'name',
				labelText: 'Label1'
			},
			{
				indexKey: 'age',
				labelText: 'Label2'
			},
			{
				indexKey: 'sex',
				labelText: 'Label3'
			}
		],
		defaultActiveKey: 'name',
		fab: <Fab icon={<Circle />} />,
		type: NAVIGATION_RAIL_TYPE.BLOCK
	}
}

export const Top: StoryObj<NavigationRailProps> = {
	args: {
		data: [
			{
				indexKey: 'A',
				labelText: 'Label1'
			},
			{
				indexKey: 'B',
				labelText: 'Label2'
			},
			{
				indexKey: 'C',
				labelText: 'Label3'
			}
		],
		defaultActiveKey: 'A',
		destinationPosition: NAVIGATION_DESTINATION_POSITION.TOP,
		fab: <Fab icon={<Circle />} />,
		menu: (
			<IconButton
				icon={<Circle />}
				type={ICON_BUTTON_TYPE.STANDARD}
			/>
		)
	}
}

export const Center: StoryObj<NavigationRailProps> = {
	args: {
		data: [
			{
				indexKey: 'A',
				labelText: 'Label1'
			},
			{
				indexKey: 'B',
				labelText: 'Label2'
			},
			{
				indexKey: 'C',
				labelText: 'Label3'
			}
		],
		defaultActiveKey: 'A',
		destinationPosition: NAVIGATION_DESTINATION_POSITION.CENTER,
		fab: <Fab icon={<Circle />} />,
		menu: (
			<IconButton
				icon={<Circle />}
				type={ICON_BUTTON_TYPE.STANDARD}
			/>
		)
	}
}

export const Bottom: StoryObj<NavigationRailProps> = {
	args: {
		data: [
			{
				indexKey: 'A',
				labelText: 'Label1'
			},
			{
				indexKey: 'B',
				labelText: 'Label2'
			},
			{
				indexKey: 'C',
				labelText: 'Label3'
			}
		],
		defaultActiveKey: 'A',
		destinationPosition: NAVIGATION_DESTINATION_POSITION.BOTTOM,
		fab: <Fab icon={<Circle />} />,
		menu: (
			<IconButton
				icon={<Circle />}
				type={ICON_BUTTON_TYPE.STANDARD}
			/>
		)
	}
}

export const BlockCenter: StoryObj<NavigationRailProps> = {
	args: {
		data: [
			{
				indexKey: 'A',
				labelText: 'Label1'
			},
			{
				indexKey: 'B',
				labelText: 'Label2'
			},
			{
				indexKey: 'C',
				labelText: 'Label3'
			}
		],
		defaultActiveKey: 'A',
		destinationPosition: NAVIGATION_DESTINATION_POSITION.CENTER,
		type: NAVIGATION_RAIL_TYPE.BLOCK
	}
}

export default {
	component: NavigationRail,
	title: 'components/NavigationRail'
} as Meta<typeof NavigationRail>
