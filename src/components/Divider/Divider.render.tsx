import {LAYOUT} from '@/constants'
import {typographyClasses} from '@/utils'
import {SIZE, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {Text, View} from 'react-native'
import type {RenderDividerProps} from './Divider.interface'

export const RenderDivider = forwardRef<View, RenderDividerProps>(
        (
                {
                        id,
                        layoutType: rawLayoutType = LAYOUT.HORIZONTAL,
                        size: rawSize,
                        style,
                        subheader,
                        testID,
                        ...containerProps
                }: RenderDividerProps,
                ref
        ) => {
                const layoutType = subheader ? LAYOUT.HORIZONTAL : rawLayoutType
                const size = subheader ? SIZE.SMALL : rawSize

                return (
                        <View
                                {...containerProps}
                                className={clsx('gap-1', {
                                        ['h-[0.0625rem] w-full']: !subheader && layoutType === LAYOUT.HORIZONTAL,
                                        ['h-6 w-full']: subheader && layoutType === LAYOUT.HORIZONTAL,
                                        ['h-full w-[0.0625rem]']: layoutType === LAYOUT.VERTICAL,
                                        ['pb-4 pt-4']: layoutType !== LAYOUT.HORIZONTAL && size === SIZE.SMALL,
                                        ['pl-4 pr-4']: layoutType === LAYOUT.HORIZONTAL && size === SIZE.SMALL,
                                        ['pl-4']: layoutType === LAYOUT.HORIZONTAL && size === SIZE.MEDIUM,
                                        ['pt-4']: layoutType !== LAYOUT.HORIZONTAL && size === SIZE.MEDIUM
                                })}
                                ref={ref}
                                testID={testID ?? `divider--${id}`}
                        >
                                <View
                                        className='min-h-[0.0625rem] flex-1 self-stretch bg-[--color-outline-variant]'
                                        style={[style]}
                                        testID={`divider__content--${id}`}
                                />

                                {subheader && (
                                        <Text
                                                className={clsx(
                                                        typographyClasses(TYPOGRAPHY.TITLE)(TYPOGRAPHY_SIZE.SMALL)(
                                                                'color-[--color-on-surface-variant]'
                                                        )
                                                )}
                                                testID={`divider__subheader--${id}`}
                                        >
                                                {subheader}
                                        </Text>
                                )}
                        </View>
                )
        }
)

RenderDivider.displayName = 'RenderDivider'
