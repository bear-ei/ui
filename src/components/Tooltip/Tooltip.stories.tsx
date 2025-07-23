import type {Meta} from '@storybook/react'
import {View, type ViewStyle} from 'react-native'
import {Icon, ICON_NAME} from '../Icon'
import {ICON_BUTTON_TYPE, IconButton} from '../Icon-button'
import {SUPPORTING_POSITION} from './Tooltip-supporting'
import {Tooltip} from './Tooltip.component'

export const PlainVerticalEnd = () => {
	const style = {
		height: 800,
		width: 800,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	} as ViewStyle

	const tooltipStyle = {
		width: 48,
		height: 48
	} as ViewStyle

	return (
		<View style={[style]}>
			<Tooltip
				defaultVisible={true}
				supporting='Supporting Text'
				supportingPosition={SUPPORTING_POSITION.VERTICAL_END}
				style={[tooltipStyle]}
			>
				<IconButton
					icon={<Icon name={ICON_NAME.ADD_HOME} />}
					type={ICON_BUTTON_TYPE.STANDARD}
				/>
			</Tooltip>
		</View>
	)
}

export const PlainVerticalStart = () => {
	const style = {
		height: 800,
		width: 800,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	} as ViewStyle

	const tooltipStyle = {
		width: 48,
		height: 48
	} as ViewStyle

	return (
		<View style={[style]}>
			<Tooltip
				defaultVisible={true}
				supporting='Supporting Text'
				supportingPosition={SUPPORTING_POSITION.VERTICAL_START}
				style={[tooltipStyle]}
			>
				<IconButton
					icon={<Icon name={ICON_NAME.ADD_HOME} />}
					type={ICON_BUTTON_TYPE.STANDARD}
				/>
			</Tooltip>
		</View>
	)
}

export const PlainHorizontalStart = () => {
	const style = {
		height: 800,
		width: 800,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	} as ViewStyle

	const tooltipStyle = {
		width: 48,
		height: 48
	} as ViewStyle

	return (
		<View style={[style]}>
			<Tooltip
				defaultVisible={true}
				supporting='Supporting Text'
				supportingPosition={SUPPORTING_POSITION.HORIZONTAL_START}
				style={[tooltipStyle]}
			>
				<IconButton
					icon={<Icon name={ICON_NAME.ADD_HOME} />}
					type={ICON_BUTTON_TYPE.STANDARD}
				/>
			</Tooltip>
		</View>
	)
}

export const PlainHorizontalEnd = () => {
	const style = {
		height: 800,
		width: 800,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	} as ViewStyle

	const tooltipStyle = {
		width: 48,
		height: 48
	} as ViewStyle

	return (
		<View style={[style]}>
			<Tooltip
				defaultVisible={true}
				supporting='Supporting Text'
				supportingPosition={SUPPORTING_POSITION.HORIZONTAL_END}
				style={[tooltipStyle]}
			>
				<IconButton
					icon={<Icon name={ICON_NAME.ADD_HOME} />}
					type={ICON_BUTTON_TYPE.STANDARD}
				/>
			</Tooltip>
		</View>
	)
}

export default {
	title: 'components/Tooltip',
	argTypes: {onPress: {action: 'pressed'}},
	component: Tooltip
} as Meta<typeof Tooltip>
