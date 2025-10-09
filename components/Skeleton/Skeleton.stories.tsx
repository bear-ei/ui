import {LAYOUT} from '@/constants'
import type {Meta, StoryObj} from '@storybook/react'
import {Circle, Rectangular, Skeleton, Square} from './Skeleton.component'
import type {SkeletonProps} from './Skeleton.interface'

const SkeletonComponent = (props: SkeletonProps) => {
        const skeleton = (
                <>
                        <Square />
                        <Rectangular
                                layoutType={LAYOUT.VERTICAL}
                                size={56}
                        >
                                <Rectangular size={24} />
                                <Rectangular size={24} />
                        </Rectangular>
                        <Circle />
                </>
        )

        return (
                <Skeleton
                        {...props}
                        className='h-14 gap-4'
                        duration={-1}
                        skeleton={skeleton}
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
