import type {Meta, StoryObj} from '@storybook/react'
import type {ViewStyle} from 'react-native'
import {View} from 'react-native'
import {Elevation} from './Elevation.component'
import {ELEVATION} from './Elevation.enum'
import type {ElevationProps} from './Elevation.interface'

const ElevationComponent = (props: ElevationProps) => {
	const style = {
		height: 80,
		width: 200,
		backgroundColor: '#ececf0'
	} as ViewStyle

	return (
		<View style={[style]}>
			<Elevation {...props} />
		</View>
	)
}

export default {
	title: 'components/Elevation',
	argTypes: {onPress: {action: 'pressed'}},
	component: ElevationComponent
} as Meta<typeof Elevation>

export const Level0: StoryObj<ElevationProps> = {
	args: {
		level: ELEVATION.LEVEL_0
	}
}

export const Level1: StoryObj<ElevationProps> = {
	args: {
		level: ELEVATION.LEVEL_1
	}
}

export const Level2: StoryObj<ElevationProps> = {
	args: {
		level: ELEVATION.LEVEL_2
	}
}

export const Level3: StoryObj<ElevationProps> = {
	args: {
		level: ELEVATION.LEVEL_3
	}
}

export const Level4: StoryObj<ElevationProps> = {
	args: {
		level: ELEVATION.LEVEL_4
	}
}

export const Level5: StoryObj<ElevationProps> = {
	args: {
		level: ELEVATION.LEVEL_5
	}
}
