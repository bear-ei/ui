import {useTheme} from '@/hooks'
import {typographyClasses} from '@/utils'
import {SIZE, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {LayoutAnimated} from '../Layout-animated'
import type {RenderSupportingTextProps} from './Supporting-text.interface'

export const RenderSupportingText = forwardRef<View, RenderSupportingTextProps>(
        ({id, size = SIZE.MEDIUM, children, textAnimatedStyle, ...props}, ref) => {
                const theme = useTheme()

                return (
                        <LayoutAnimated
                                {...props}
                                className={clsx('mb-1 min-h-4', {
                                        ['pl-2 pr-2']: size === SIZE.EXTRA_SMALL,
                                        ['pl-3 pr-3']: size === SIZE.SMALL,
                                        ['pl-4 pr-4']: size === SIZE.MEDIUM,
                                        ['pl-5 pr-5']: size === SIZE.LARGE,
                                        ['pl-6 pr-6']: size === SIZE.EXTRA_LARGE
                                })}
                                contentSize={{height: theme.token.spacing.medium}}
                                testID={`supportingText__layoutAnimated--${id}`}
                                ref={ref}
                        >
                                <Animated.Text
                                        className={typographyClasses(TYPOGRAPHY.BODY)(TYPOGRAPHY_SIZE.SMALL)()}
                                        style={[textAnimatedStyle]}
                                        testID={`supportingText__animatedText--${id}`}
                                >
                                        {children}
                                </Animated.Text>
                        </LayoutAnimated>
                )
        }
)

RenderSupportingText.displayName = 'RenderSupportingText'
