import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {Platform, Pressable, View} from 'react-native'
import type {RenderMaskProps} from './Mask.interface'

export const RenderMask = forwardRef<View, RenderMaskProps>(
        (
                {
                        backgroundColor,
                        className,
                        id,
                        interactionHandlers,
                        opacity,
                        style,
                        testID,
                        visible,
                        ...containerProps
                },
                ref
        ) => (
                <View
                        {...containerProps}
                        accessibilityRole='alert'
                        accessible={true}
                        className={clsx(
                                'bottom-0 left-0 right-0 top-0 z-40 cursor-default bg-[--color-scrim] opacity-20',
                                {
                                        ['-z-40 overflow-hidden']: !visible,
                                        ['absolute']: Platform.OS !== 'web',
                                        ['fixed']: Platform.OS === 'web'
                                },
                                className
                        )}
                        ref={ref}
                        testID={testID ?? `mask--${id}`}
                        style={[
                                style,
                                {
                                        ...(typeof opacity === 'number' && {opacity}),
                                        ...(backgroundColor && {backgroundColor})
                                }
                        ]}
                >
                        <Pressable
                                {...interactionHandlers}
                                className='flex-1 outline-none'
                                testID={`mask__content--${id}`}
                        />
                </View>
        )
)

RenderMask.displayName = 'RenderMask'
