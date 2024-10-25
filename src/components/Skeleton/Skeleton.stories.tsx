import {Meta, StoryObj} from '@storybook/react'
import {StyleProp, ViewStyle} from 'react-native'
import {Skeleton} from './Skeleton.component'
import {SkeletonProps} from './Skeleton.interface'

const {Square, Rectangular, Circle} = Skeleton
const SkeletonComponent = (props: SkeletonProps) => {
        const rectangularStyle = {flex: 1} as StyleProp<ViewStyle>
        const skeletonStyle = {gap: 16}
        const content = (
                <>
                        <Square />
                        <Rectangular
                                containerLayout='vertical'
                                style={[rectangularStyle]}
                        >
                                <Rectangular height={16} />
                                <Rectangular height={16} />
                        </Rectangular>
                        <Circle />
                </>
        )

        return (
                <Skeleton
                        {...props}
                        content={content}
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
