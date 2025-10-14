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
                <Pressable
                        {...touchableProps}
                        {...interactionHandlers}
                        className='flex flex-1 flex-col items-center justify-center self-stretch outline-none'
                        ref={ref}
                        testID={testID ?? `touchable--${id}`}
                >
                        <View
                                className={clsx('relative z-30 flex-1 self-stretch', shapeClasses(shape))}
                                testID={`touchable__main--${id}`}
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
        )
)

RenderTouchable.displayName = 'RenderTouchable'
