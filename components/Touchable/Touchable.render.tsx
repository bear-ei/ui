import {shapeClasses} from '@/constants'
import {clsx} from 'clsx'
import {forwardRef, type FC} from 'react'
import {Pressable, View} from 'react-native'
import {TouchableRipple} from './Touchable-ripple'
import type {PressableType, RenderTouchableProps, RenderTouchableRippleProps} from './Touchable.interface'

export const RenderTouchableRipples: FC<RenderTouchableRippleProps> = ({
        centered,
        containerLayout,
        id,
        rippleSequence,
        ...props
}) => (
        <>
                {Object.entries(rippleSequence).map(([indexKey, touchableLocation]) => {
                        const isCenteredTouchableRipple =
                                typeof centered === 'boolean' ? centered : !touchableLocation?.locationX

                        return (
                                <TouchableRipple
                                        {...props}
                                        centered={isCenteredTouchableRipple}
                                        containerLayout={containerLayout}
                                        indexKey={indexKey}
                                        key={indexKey}
                                        testID={`touchable__touchableRipple--${id}`}
                                        touchableLocation={touchableLocation}
                                />
                        )
                })}
        </>
)

export const RenderTouchable = forwardRef<PressableType, RenderTouchableProps>(
        (
                {
                        backgroundUnderlay,
                        children,
                        contentStyle,
                        elevationUnderlay,
                        id,
                        interactionHandlers,
                        rippleElements,
                        shape,
                        testID,
                        ...touchableProps
                }: RenderTouchableProps,
                ref
        ) => (
                <View
                        testID={testID ?? `touchable--${id}`}
                        className='flex-1 self-stretch'
                >
                        <Pressable
                                {...touchableProps}
                                {...interactionHandlers}
                                ref={ref}
                                testID={`touchable__touchableContent--${id}`}
                                className='flex flex-1 flex-col items-center justify-center self-stretch outline-none'
                        >
                                <View
                                        testID={`touchable__main--${id}`}
                                        style={[contentStyle]}
                                        className={clsx('relative z-10 self-stretch', shapeClasses(shape))}
                                >
                                        {children}
                                        <View
                                                className={clsx(
                                                        'absolute bottom-0 left-0 right-0 top-0 overflow-hidden',
                                                        shapeClasses(shape)
                                                )}
                                                testID={`touchable__rippleLayout--${id}`}
                                        >
                                                {rippleElements}
                                        </View>

                                        {backgroundUnderlay}
                                        {elevationUnderlay}
                                </View>
                        </Pressable>
                </View>
        )
)

RenderTouchable.displayName = 'RenderTouchable'
