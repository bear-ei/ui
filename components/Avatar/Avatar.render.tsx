import {shapeClasses, typographyClasses} from '@/constants'
import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {Image} from 'expo-image'
import {cloneElement, forwardRef} from 'react'
import {Text, View} from 'react-native'
import type {RenderAvatarProps} from './Avatar.interface'

export const RenderAvatar = forwardRef<View, RenderAvatarProps>(
        (
                {
                        accessibilityLabel,
                        backgroundColor,
                        defaultSource,
                        density,
                        id,
                        labelText,
                        shape = SHAPE.FULL,
                        size,
                        source,
                        svgElement,
                        testID,
                        ...containerProps
                },
                ref
        ) => {
                const isSVG = !!svgElement
                const contentItemClasses =
                        'absolute bottom-0 left-0 right-0 top-0 flex flex-row items-center justify-center'

                const containerStyle = [
                        backgroundColor ? {backgroundColor} : {},
                        size ? {width: size, height: size} : {}
                ]

                return (
                        <View
                                {...containerProps}
                                style={containerStyle}
                                accessibilityLabel={accessibilityLabel ?? labelText}
                                accessibilityRole='image'
                                accessible={true}
                                className={clsx(
                                        'pointer-events-none relative h-10 w-10 overflow-hidden bg-[--color-primary-container]',
                                        shapeClasses(shape)
                                )}
                                ref={ref}
                                testID={testID ?? `avatar--${id}`}
                        >
                                {isSVG && (
                                        <View
                                                className={contentItemClasses}
                                                testID={`avatar__contentItem--svg--${id}`}
                                        >
                                                {cloneElement(svgElement, {height: '100%', width: '100%'})}
                                        </View>
                                )}

                                {!isSVG && (
                                        <View
                                                className={contentItemClasses}
                                                testID={`avatar__contentItem--img--${id}`}
                                        >
                                                {source || defaultSource ?
                                                        <Image
                                                                className='h-full w-full'
                                                                contentFit='cover'
                                                                placeholder={defaultSource ?? {}}
                                                                source={source ?? {}}
                                                                testID={`avatar__image--${id}`}
                                                        />
                                                :       <Text
                                                                className={clsx(
                                                                        'color-[--color-on-primary-container]',
                                                                        typographyClasses(TYPOGRAPHY.TITLE)(SIZE.MEDIUM)
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
