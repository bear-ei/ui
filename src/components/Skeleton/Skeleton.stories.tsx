import {Meta, StoryObj} from '@storybook/react'
import {ViewStyle} from 'react-native'
import {Skeleton} from './Skeleton.component'
import {SkeletonProps} from './Skeleton.interface'

const {Square, Rectangular, Circle} = Skeleton
const SkeletonComponent = (props: SkeletonProps) => {
        const rectangularStyle = {flex: 1} as ViewStyle
        const skeletonStyle = {gap: 16}
        const skeleton = (
                <>
                        <Square />
                        <Rectangular
                                containerLayout='vertical'
                                style={[rectangularStyle]}
                        >
                                <Rectangular />
                                <Rectangular />
                        </Rectangular>
                        <Circle />
                </>
        )

        return (
                <Skeleton
                        {...props}
                        skeleton={skeleton}
                        duration={-1}
                        style={skeletonStyle}
                />
        )
}

export const DefaultSkeleton: StoryObj<SkeletonProps> = {
        args: {}
}

export default {
        title: 'components/Skeleton',
        argTypes: {onPress: {action: 'pressed'}},
        component: SkeletonComponent
} as Meta<typeof Skeleton>
