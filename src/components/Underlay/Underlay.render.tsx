import {classesName, shapeClasses} from '@/utils'
import {forwardRef} from 'react'
import {View} from 'react-native'
import {AnimatedView} from '../Animated-component'
import type {RenderUnderlayProps} from './Underlay.interface'

export const RenderUnderlay = forwardRef<View, RenderUnderlayProps>(
    (
        {
            active,
            activeColor,
            activeLayerAnimatedStyle,
            activeShape,
            hoverLayerAnimatedStyle,
            id,
            interactionHandlers,
            shape,
            testID,
            underlayColor,
            ...containerProps
        },
        ref
    ) => {
        const activeLayerStyle = {...(activeColor && {backgroundColor: activeColor})}
        const hoverLayerStyle = {...(underlayColor && {backgroundColor: underlayColor})}

        return (
            <View
                {...containerProps}
                {...interactionHandlers}
                ref={ref}
                className={classesName(
                    'pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-10 flex flex-col items-center justify-center overflow-hidden',
                    shapeClasses(shape)
                )}
                testID={testID ?? `underlay--${id}`}
            >
                <AnimatedView
                    className='absolute bottom-0 left-0 right-0 top-0 z-20'
                    style={[hoverLayerStyle, hoverLayerAnimatedStyle]}
                    testID={`underlay__hoverLayer--${id}`}
                />

                {typeof active === 'boolean' && activeColor && (
                    <AnimatedView
                        className={classesName(
                            'absolute bottom-0 left-0 right-0 top-0 z-10',
                            shapeClasses(activeShape ?? shape)
                        )}
                        style={[activeLayerStyle, activeLayerAnimatedStyle]}
                        testID={`underlay__activeLayer--${id}`}
                    />
                )}
            </View>
        )
    }
)

RenderUnderlay.displayName = 'RenderUnderlay'
