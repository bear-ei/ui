import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {View} from 'react-native'
import {Elevation} from './Elevation.component'
import {ELEVATION_VALUE} from './Elevation.enum'
import type {ElevationProps} from './Elevation.interface'

const ElevationComponent = (props: ElevationProps) => (
	<View className='h-20 w-80 bg-[#ececf0]'>
		<Elevation {...props} />
	</View>
)

export const Level0: StoryObj<ElevationProps> = {
	args: {
		level: ELEVATION_VALUE.LEVEL_0
	}
}

export const Level1: StoryObj<ElevationProps> = {
	args: {
		level: ELEVATION_VALUE.LEVEL_1
	}
}

export const Level2: StoryObj<ElevationProps> = {
	args: {
		level: ELEVATION_VALUE.LEVEL_2
	}
}

export const Level3: StoryObj<ElevationProps> = {
	args: {
		level: ELEVATION_VALUE.LEVEL_3
	}
}

export const Level4: StoryObj<ElevationProps> = {
	args: {
		level: ELEVATION_VALUE.LEVEL_4
	}
}

export const Level5: StoryObj<ElevationProps> = {
	args: {
		level: ELEVATION_VALUE.LEVEL_5
	}
}

export default {
	title: 'components/Elevation',
	argTypes: {onPress: {action: 'pressed'}},
	component: ElevationComponent
} as Meta<typeof Elevation>
