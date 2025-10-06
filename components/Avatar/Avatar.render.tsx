import {SHAPE} from '@bearei/theme-token'
import {Image} from 'expo-image'
import {cloneElement, forwardRef} from 'react'
import {Text, View} from 'react-native'
import type {RenderAvatarProps} from './Avatar.interface'
import {containerClasses, contentItemClasses, labelTextClasses} from './avatar.styles'

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

                return (
                        <View
                                {...containerProps}
                                accessibilityLabel={accessibilityLabel ?? labelText}
                                accessibilityRole='image'
                                accessible={true}
                                className={containerClasses({backgroundColor, size, shape})}
                                ref={ref}
                                testID={testID ?? `avatar--${id}`}
                        >
                                {isSVG && (
                                        <View
                                                className={contentItemClasses()}
                                                testID={`avatar__contentItem--svg--${id}`}
                                        >
                                                {cloneElement(svgElement, {height: '100%', width: '100%'})}
                                        </View>
                                )}

                                {!isSVG && (
                                        <View
                                                className={contentItemClasses()}
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
                                                                className={labelTextClasses()}
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
