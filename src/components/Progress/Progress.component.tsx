import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {ProgressActiveIndicator} from './Progress-active-indicator'
import {ProgressBase} from './Progress-base.component'
import {ProgressProps, RenderProgressProps} from './Progress.interface'
import {Container, Stop, Track} from './Progress.styles'

const render = ({
    animated,
    defaultValue,
    id,
    increment,
    layout,
    onStateEvent,
    type,
    value,
    ...containerProps
}: RenderProgressProps) => (
    <Container
        {...containerProps}
        {...onStateEvent}
        pointerEvents='none'
        progress={!!(value && value > 0)}
        shape='small'
        testID={`progress--${id}`}
    >
        {typeof layout.width === 'number' && layout.width !== 0 && (
            <ProgressActiveIndicator
                containerLayout={layout}
                defaultValue={defaultValue}
                increment={increment}
                value={value}
            />
        )}

        <Track
            testID={`progress__track--${id}`}
            shape='small'
        />

        {type === 'linear' && animated === 'determinate' && (
            <Stop
                shape='full'
                testID={`progress__stop--${id}`}
            />
        )}
    </Container>
)

const ForwardRefProgress = forwardRef<View, ProgressProps>((props, ref) => (
    <ProgressBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const Progress: FC<ProgressProps> = ForwardRefProgress
