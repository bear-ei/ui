import {classesName, platformValue, shapeClasses, typographyClasses} from '@/utils'
import {SHAPE, SIZE, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '@bearei/theme-token'
import {cloneElement, forwardRef} from 'react'
import {Image, Text, View, type ViewStyle} from 'react-native'
import type {RenderAvatarProps} from './Avatar.interface'

export const RenderAvatar = forwardRef<View, RenderAvatarProps>(
        (
                {
                        accessibilityLabel,
                        backgroundColor,
                        defaultSource,
                        id,
                        labelText,
                        shape = SHAPE.FULL,
                        size = SIZE.MEDIUM,
                        source,
                        style,
                        svgElement,
                        testID,
                        ...containerProps
                },
                ref
        ) => {
                const isSVG = !!svgElement
                const avatarStyle = {
                        ...(backgroundColor && {backgroundColor}),
                        ...(typeof size === 'number' && {width: platformValue(size), height: platformValue(size)})
                } as ViewStyle

                return (
                        <View
                                {...containerProps}
                                accessibilityLabel={accessibilityLabel ?? labelText}
                                accessibilityRole='image'
                                accessible={true}
                                className={classesName(
                                        'pointer-events-none relative overflow-hidden bg-[--color-primary-container]',
                                        {
                                                ['h-10 w-10']: size === SIZE.MEDIUM,
                                                ['h-12 w-12']: size === SIZE.LARGE,
                                                ['h-14 w-14']: size === SIZE.EXTRA_LARGE,
                                                ['h-6 w-6']: size === SIZE.EXTRA_SMALL,
                                                ['h-8 w-8']: size === SIZE.SMALL
                                        },
                                        shapeClasses(shape)
                                )}
                                ref={ref}
                                style={[avatarStyle, style]}
                                testID={testID ?? `avatar--${id}`}
                        >
                                {isSVG && (
                                        <View
                                                className='absolute bottom-0 left-0 right-0 top-0 flex flex-row items-center justify-center'
                                                testID={`avatar__contentItem--svg--${id}`}
                                        >
                                                {cloneElement(svgElement, {height: '100%', width: '100%'})}
                                        </View>
                                )}

                                {!isSVG && (
                                        <View
                                                className='absolute bottom-0 left-0 right-0 top-0 flex flex-row items-center justify-center'
                                                testID={`avatar__contentItem--img--${id}`}
                                        >
                                                {source || defaultSource ?
                                                        <Image
                                                                className='h-full w-full'
                                                                defaultSource={defaultSource ?? {}}
                                                                resizeMode='cover'
                                                                source={source ?? {}}
                                                                testID={`avatar__image--${id}`}
                                                        />
                                                :       <Text
                                                                className={classesName(
                                                                        'color-[--color-on-primary-container]',
                                                                        typographyClasses(TYPOGRAPHY.TITLE)(
                                                                                typeof size === 'number' ?
                                                                                        TYPOGRAPHY_SIZE.MEDIUM
                                                                                :       size
                                                                        )()
                                                                )}
                                                                ellipsizeMode='tail'
                                                                numberOfLines={1}
                                                                testID={`avatar__labelText--${id}`}
                                                        >
                                                                {labelText}
                                                        </Text>
                                                }
                                        </View>
                                )}
                        </View>
                )
        }
)

RenderAvatar.displayName = 'RenderAvatar'
