import {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'
import {Step} from './Step'
import {StepProps} from './Step.interface'

const StepComponent = (props: StepProps) => {
    const style = {display: 'flex', flexDirection: 'column', height: 56} as StyleProp<ViewStyle>

    return (
        <View style={[style]}>
            <Step {...props} />
        </View>
    )
}

export const Rail: StoryObj<StepProps> = {
    args: {
        defaultActiveKey: 'A',
        data: [
            {
                labelText: 'Label1',
                indexKey: 'A'
            },
            {
                labelText: 'Label2',
                indexKey: 'B'
            },
            {
                labelText: 'Label3',
                indexKey: 'C'
            }
        ]
    }
}

export const BlockRail: StoryObj<StepProps> = {
    args: {
        defaultActiveKey: 'name',
        type: 'block',
        data: [
            {
                labelText: 'Label1',
                indexKey: 'name'
            },
            {
                labelText: 'Label2',
                indexKey: 'age'
            },
            {
                labelText: 'Label3',
                indexKey: 'sex'
            }
        ]
    }
}

export default {
    title: 'components/Step',
    component: StepComponent
} as Meta<typeof Step>
