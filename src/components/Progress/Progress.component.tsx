import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {ProgressActiveIndicatorCircular} from './Progress-active-indicator-circular'
import {ProgressActiveIndicatorLinear} from './Progress-active-indicator-linear'
import {ProgressBase} from './Progress-base.component'
import {ProgressProps, RenderProgressProps} from './Progress.interface'
import {Container, Stop, Track} from './Progress.styles'

const render = ({
        animated,
        content,
        defaultValue,
        height,
        id,
        increment,
        layout,
        onStateEvent,
        testID,
        type,
        value,
        width,
        ...containerProps
}: RenderProgressProps) => {
        const shape = type === 'linear' ? 'small' : 'full'

        return (
                <Container
                        {...containerProps}
                        {...onStateEvent}
                        accessibilityRole='progressbar'
                        pointerEvents='none'
                        progressing={!!(value && value > 0)}
                        shape={shape}
                        testID={testID ?? `progress--${id}`}
                        type={type}
                >
                        {type === 'circular' && (
                                <ProgressActiveIndicatorCircular
                                        content={content}
                                        height={height}
                                        width={width}
                                />
                        )}

                        {type === 'linear' && typeof layout.width === 'number' && layout.width !== 0 && (
                                <ProgressActiveIndicatorLinear
                                        containerLayout={layout}
                                        defaultValue={defaultValue}
                                        increment={increment}
                                        value={value}
                                />
                        )}

                        {type === 'linear' && (
                                <Track
                                        shape={shape}
                                        testID={`progress__track--${id}`}
                                />
                        )}

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
