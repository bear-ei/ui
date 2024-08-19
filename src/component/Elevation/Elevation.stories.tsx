import {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'
import {Elevation} from './Elevation'
import {ElevationProps} from './Elevation.interface'

const ElevationComponent = (props: ElevationProps) => {
    const style = {height: 80, width: 200, backgroundColor: '#ececf0'} as StyleProp<ViewStyle>

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

export const level1: StoryObj<ElevationProps> = {
    args: {
        level: 1
    }
}
