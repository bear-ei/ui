import {Divider} from '@/components/Divider'
import {LAYOUT_ANIMATED, LayoutAnimated} from '@/components/Layout-animated'
import {List} from '@/components/List'
import {useTheme} from '@/hooks'
import {classesName, shapeClasses} from '@/utils'
import {DURATION, EASING, SHAPE, SIZE} from '@bearei/theme-token'
import {forwardRef} from 'react'
import {Platform, type ScrollView, type StyleProp, type ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {RenderSearchListProps} from './Search-list.interface'

export const RenderSearchList = forwardRef<ScrollView, RenderSearchListProps>(
        ({testID, id, containerLayout, visible, onVisibility, ...listProps}, ref) => {
                const theme = useTheme()
                const layoutAnimatedStyle = {
                        left: containerLayout.pageX,
                        top: (containerLayout.pageY ?? 0) + containerLayout.height,
                        width: containerLayout.width
                } as StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>

                return (
                        <LayoutAnimated
                                animatedType={LAYOUT_ANIMATED.COLLAPSE_Y}
                                className={classesName(
                                        'z-[4096] origin-top overflow-hidden bg-[--color-surface-container-high]',
                                        {
                                                ['absolute']: Platform.OS !== 'web',
                                                ['fixed']: Platform.OS === 'web'
                                        },
                                        shapeClasses(SHAPE.MEDIUM_BOTTOM)
                                )}
                                contentSize={{
                                        height: theme.token.spacing.extraSmall * 80,
                                        width: containerLayout.width
                                }}
                                entry={{duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE}}
                                exit={{duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}}
                                onVisibility={onVisibility}
                                style={layoutAnimatedStyle}
                                testID={testID ?? `searchList--${id}`}
                                visible={visible}
                        >
                                <Divider
                                        size={SIZE.LARGE}
                                        testID={`searchList__divider--${id}`}
                                />

                                <List
                                        {...listProps}
                                        ref={ref}
                                        testID={`searchList__list--${id}`}
                                />
                        </LayoutAnimated>
                )
        }
)
