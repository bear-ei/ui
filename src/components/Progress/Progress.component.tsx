import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {ProgressActiveIndicatorLinear} from './Progress-active-indicator-linear'
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
        testID,
        type,
        value,
        ...containerProps
}: RenderProgressProps) => {
        const shape = type === 'linear' ? 'small' : 'full'

        return (
                <Container
                        {...containerProps}
                        {...onStateEvent}
                        pointerEvents='none'
                        progressing={!!(value && value > 0)}
                        shape={shape}
                        testID={testID ?? `progress--${id}`}
                        type={type}
                >
                        {typeof layout.width === 'number' && layout.width !== 0 && (
                                <ProgressActiveIndicatorLinear
                                        containerLayout={layout}
                                        defaultValue={defaultValue}
                                        increment={increment}
                                        value={value}
                                />
                        )}

                        <Track
                                shape={shape}
                                testID={`progress__track--${id}`}
                                type={type}
                        />

                        {type === 'linear' && animated === 'determinate' && (
                                <Stop
                                        shape='full'
                                        testID={`progress__stop--${id}`}
                                />
                        )}
                </Container>
        )
}

const ForwardRefProgress = forwardRef<View, ProgressProps>((props, ref) => (
        <ProgressBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const Progress: FC<ProgressProps> = ForwardRefProgress
