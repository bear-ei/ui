import {Meta, StoryObj} from '@storybook/react'
import {View, ViewStyle} from 'react-native'
import {Elevation} from './Elevation.component'
import {ElevationLevel} from './Elevation.enum'
import {ElevationProps} from './Elevation.interface'

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
                level: ElevationLevel.LEVEL_0
        }
}

export const Level1: StoryObj<ElevationProps> = {
        args: {
                level: ElevationLevel.LEVEL_1
        }
}

export const Level2: StoryObj<ElevationProps> = {
        args: {
                level: ElevationLevel.LEVEL_2
        }
}

export const Level3: StoryObj<ElevationProps> = {
        args: {
                level: ElevationLevel.LEVEL_3
        }
}

export const Level4: StoryObj<ElevationProps> = {
        args: {
                level: ElevationLevel.LEVEL_4
        }
}

export const Level5: StoryObj<ElevationProps> = {
        args: {
                level: ElevationLevel.LEVEL_5
        }
}
