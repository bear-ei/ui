import {useTheme} from '@/hooks'
import {hexToRGBA} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {Pressable, View} from 'react-native'
import {LayoutAnimated} from '../Layout-animated'
import type {RenderMaskProps} from './Mask.interface'

export const RenderMask = forwardRef<View, RenderMaskProps>(
        (
                {
                        backgroundColor,
                        className,
                        id,
                        interactionHandlers,
                        opacity = 0.2,
                        style,
                        testID,
                        visible,
                        ...containerProps
                },
                ref
        ) => {
                const theme = useTheme()

                return (
                        <LayoutAnimated
                                {...containerProps}
                                visible={visible}
                                accessibilityRole='alert'
                                accessible={true}
                                className={clsx(
                                        'absolute bottom-0 left-0 right-0 top-0 cursor-default',
                                        {
                                                ['overflow-hidden']: !visible,
                                                ['z-40']: visible
                                        },
                                        className
                                )}
                                ref={ref}
                                testID={testID ?? `mask--${id}`}
                                style={[
                                        style,
                                        {
                                                backgroundColor: hexToRGBA(backgroundColor ?? theme.token.scheme.scrim)(
                                                        opacity
                                                )
                                        }
                                ]}
                        >
                                <Pressable
                                        {...interactionHandlers}
                                        className='flex-1 outline-none'
                                        testID={`mask__content--${id}`}
                                />
                        </LayoutAnimated>
                )
        }
)

RenderMask.displayName = 'RenderMask'
