import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {Pressable, View} from 'react-native'
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
                                'absolute z-40 cursor-default bg-[--color-scrim] opacity-20',
                                {['-z-40 overflow-hidden']: !visible},
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
