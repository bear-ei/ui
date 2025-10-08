import {LAYOUT, typographyClasses} from '@/constants'
import {SIZE, TYPOGRAPHY} from '@bearei/theme-token'
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
                                ref={ref}
                                testID={testID ?? `divider--${id}`}
                                className={clsx('gap-1', {
                                        ['h-[1px] w-full']: !subheader && layoutType === LAYOUT.HORIZONTAL,
                                        ['h-6 w-full']: subheader && layoutType === LAYOUT.HORIZONTAL,
                                        ['h-full w-[1px]']: layoutType === LAYOUT.VERTICAL,
                                        ['pl-4']: layoutType === LAYOUT.HORIZONTAL && size === SIZE.MEDIUM,
                                        ['pt-4']: layoutType !== LAYOUT.HORIZONTAL && size === SIZE.MEDIUM,
                                        ['pl-4 pr-4']: layoutType === LAYOUT.HORIZONTAL && size === SIZE.SMALL,
                                        ['pb-4 pt-4']: layoutType !== LAYOUT.HORIZONTAL && size === SIZE.SMALL
                                })}
                        >
                                <View
                                        style={[style]}
                                        testID={`divider__content--${id}`}
                                        className='min-h-[1px] flex-1 self-stretch bg-[--color-outline-variant]'
                                />

                                {subheader && (
                                        <Text
                                                testID={`divider__subheader--${id}`}
                                                className={clsx(
                                                        typographyClasses(TYPOGRAPHY.TITLE)(SIZE.SMALL)(
                                                                'color-[--color-on-surface-variant]'
                                                        )
                                                )}
                                        >
                                                {subheader}
                                        </Text>
                                )}
                        </View>
                )
        }
)

RenderDivider.displayName = 'RenderDivider'
