import {LAYOUT, typographyClasses} from '@/constants'
import {SIZE, TYPOGRAPHY} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {Text, View} from 'react-native'
import type {RenderDividerProps} from './Divider.interface'

export const RenderDivider = forwardRef<View, RenderDividerProps>(
        ({id, layoutType, size: rawSize, style, subheader, testID, ...containerProps}: RenderDividerProps, ref) => {
                const size = subheader && layoutType === LAYOUT.HORIZONTAL ? SIZE.SMALL : rawSize

                return (
                        <View
                                {...containerProps}
                                ref={ref}
                                testID={testID ?? `divider--${id}`}
                                className={clsx('flex flex-col gap-1', {
                                        ['h-[1px] w-full']: layoutType === LAYOUT.HORIZONTAL,
                                        ['h-full w-[1px]']: layoutType === LAYOUT.VERTICAL,
                                        ['pl-4']: layoutType === LAYOUT.HORIZONTAL && size === SIZE.MEDIUM,
                                        ['pt-4']: layoutType !== LAYOUT.HORIZONTAL && size === SIZE.MEDIUM,
                                        ['pb-0 pl-4 pr-4 pt-0']:
                                                layoutType === LAYOUT.HORIZONTAL && size === SIZE.SMALL,
                                        ['pb-4 pl-0 pr-0 pt-4']: layoutType !== LAYOUT.HORIZONTAL && size === SIZE.SMALL
                                })}
                        >
                                <View
                                        style={[style]}
                                        testID={`divider__content--${id}`}
                                        className='min-h-4 flex-1 bg-[--color-outline-variant]'
                                />

                                {subheader && (
                                        <Text
                                                testID={`divider__subheader--${id}`}
                                                className={clsx(
                                                        typographyClasses(TYPOGRAPHY.TITLE)(SIZE.SMALL),
                                                        'color-[--color-on-surface-variant]'
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
