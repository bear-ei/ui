import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {ProgressActiveIndicatorCircular} from './Progress-active-indicator-circular'
import {ProgressActiveIndicatorLinear} from './Progress-active-indicator-linear'
import {ProgressBase} from './Progress-base.component'
import {ProgressProps, RenderProgressProps} from './Progress.interface'
import {Container} from './Progress.styles'

const render = ({
        animatedType = 'indeterminate',
        content,
        defaultValue,
        id,
        increment,
        layout,
        onStateEvent,
        size,
        strokeWidth,
        testID,
        type = 'linear',
        value,
        ...containerProps
}: RenderProgressProps) => (
        <Container
                {...containerProps}
                {...onStateEvent}
                accessibilityRole='progressbar'
                pointerEvents='none'
                progressing={!!(value && value > 0)}
                testID={testID ?? `progress--${id}`}
                type={type}
        >
                {type === 'circular' && (
                        <ProgressActiveIndicatorCircular
                                animatedType={animatedType}
                                content={content}
                                size={size}
                                strokeWidth={strokeWidth}
                                testID={`progress__progressActiveIndicatorCircular--${id}`}
                        />
                )}

                {type === 'linear' && typeof layout.width === 'number' && layout.width !== 0 && (
                        <ProgressActiveIndicatorLinear
                                animatedType={animatedType}
                                containerLayout={layout}
                                defaultValue={defaultValue}
                                increment={increment}
                                testID={`progress__progressActiveIndicatorLinear--${id}`}
                                value={value}
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
