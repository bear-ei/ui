import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Circle} from 'lucide-react-native'

import type {NavigationRailProps} from './Navigation-rail.interface'

import {FAB} from '../FAB'
import {ICON_BUTTON_TYPE, IconButton} from '../Icon-button'
import {NavigationRail} from './Navigation-rail.component'
import {NAVIGATION_DESTINATION_POSITION, NAVIGATION_RAIL_ANIMATION, NAVIGATION_RAIL_TYPE} from './Navigation-rail.enum'

export const Standard: StoryObj<NavigationRailProps> = {
	args: {
		animation: NAVIGATION_RAIL_ANIMATION.COLLAPSE,
		data: [
			{
				itemKey: 'A',
				labelText: 'Bookmark'
			},
			{
				itemKey: 'B',
				labelText: 'Label2'
			},
			{
				itemKey: 'C',
				labelText: 'Label3'
			}
		],
		defaultActiveKey: 'A',
		fab: <FAB icon={<Circle />} />,
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
				itemKey: 'name',
				labelText: 'Label1'
			},
			{
				itemKey: 'age',
				labelText: 'Label2'
			},
			{
				itemKey: 'sex',
				labelText: 'Label3'
			}
		],
		defaultActiveKey: 'name',
		fab: <FAB icon={<Circle />} />,
		type: NAVIGATION_RAIL_TYPE.BLOCK
	}
}

export const Top: StoryObj<NavigationRailProps> = {
	args: {
		data: [
			{
				itemKey: 'A',
				labelText: 'Label1'
			},
			{
				itemKey: 'B',
				labelText: 'Label2'
			},
			{
				itemKey: 'C',
				labelText: 'Label3'
			}
		],
		defaultActiveKey: 'A',
		destinationPosition: NAVIGATION_DESTINATION_POSITION.TOP,
		fab: <FAB icon={<Circle />} />,
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
				itemKey: 'A',
				labelText: 'Label1'
			},
			{
				itemKey: 'B',
				labelText: 'Label2'
			},
			{
				itemKey: 'C',
				labelText: 'Label3'
			}
		],
		defaultActiveKey: 'A',
		destinationPosition: NAVIGATION_DESTINATION_POSITION.CENTER,
		fab: <FAB icon={<Circle />} />,
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
				itemKey: 'A',
				labelText: 'Label1'
			},
			{
				itemKey: 'B',
				labelText: 'Label2'
			},
			{
				itemKey: 'C',
				labelText: 'Label3'
			}
		],
		defaultActiveKey: 'A',
		destinationPosition: NAVIGATION_DESTINATION_POSITION.BOTTOM,
		fab: <FAB icon={<Circle />} />,
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
				itemKey: 'A',
				labelText: 'Label1'
			},
			{
				itemKey: 'B',
				labelText: 'Label2'
			},
			{
				itemKey: 'C',
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
