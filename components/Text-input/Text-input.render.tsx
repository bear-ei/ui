import {AnimatedTextInput, ICON_BUTTON_SIZE, shapeClasses, typographyClasses} from '@/constants'
import {useTheme} from '@/hooks'
import {processIconSize} from '@/utils'
import {hexToRGBA, pxToRem, SHAPE, SIZE, TYPOGRAPHY} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {cloneElement, forwardRef} from 'react'
import {Platform, Pressable, TextInput, View} from 'react-native'
import Animated from 'react-native-reanimated'
import {ICON_BUTTON_TYPE} from '../Icon-button'
import {LayoutAnimated} from '../Layout-animated'
import {Underlay} from '../Underlay'
import type {RenderTextInputProps} from './Text-input.interface'

/**
 * TODO: Support Multiline
 */
export const RenderTextInput = forwardRef<TextInput, RenderTextInputProps>(
        (
                {
                        accessibilityLabel,
                        activeIndicatorAnimatedStyle,
                        content,
                        contentSize,
                        disabled,
                        editable,
                        error,
                        eventName,
                        headerAnimatedStyle,
                        id,
                        inputAnimatedStyle,
                        interactionHandlers,
                        labelText,
                        leadingElement,
                        multiline,
                        onHeaderFocus,
                        onSupportingTextVisibility,
                        size = SIZE.MEDIUM,
                        supportingText,
                        supportingTextAnimatedStyle,
                        supportingTextVisible,
                        testID,
                        trailingElement,
                        placeholder = 'Placeholder',
                        ...inputProps
                },
                ref
        ) => {
                const theme = useTheme()
                const placeholderTextColor =
                        disabled ?
                                hexToRGBA(theme.token.scheme.onSurface)(theme.token.opacity.level5)
                        :       theme.token.scheme.onSurfaceVariant

                const {onFocus, onBlur, ...onTouchableHeaderEvent} = interactionHandlers
                const iconSize = processIconSize(theme)(ICON_BUTTON_SIZE[size])
                const isLeadingShow = !!leadingElement
                const isTrailingShow = !!trailingElement
                const shape = SHAPE.EXTRA_SMALL_TOP
                const underlayColor = theme.token.scheme.onSurface
                const underlayOpacities = [theme.token.opacity.level0, theme.token.opacity.level1] as [number, number]

                return (
                        <View
                                {...(error && {
                                        accessibilityLabel: accessibilityLabel ?? supportingText,
                                        accessibilityRole: 'alert'
                                })}
                                testID={testID ?? `textInput--${id}`}
                        >
                                <View
                                        className={clsx('flex flex-col', {
                                                ['gap-1']: typeof supportingText === 'string'
                                        })}
                                        testID={`textInput__content--${id}`}
                                >
                                        <Pressable
                                                {...onTouchableHeaderEvent}
                                                {...(!error && {
                                                        accessibilityLabel: accessibilityLabel ?? labelText,
                                                        accessibilityRole: 'keyboardkey'
                                                })}
                                                className='cursor-text outline-none'
                                                onFocus={onHeaderFocus}
                                                tabIndex={-1}
                                                testID={`textInput__touchableHeader--${id}`}
                                        >
                                                <Animated.View
                                                        className={clsx(
                                                                'relative z-10 flex min-w-20 flex-row items-center',
                                                                {
                                                                        ['h-10']: size === SIZE.MEDIUM,
                                                                        ['h-12']: size === SIZE.LARGE,
                                                                        ['h-14']: size === SIZE.EXTRA_LARGE,
                                                                        ['h-6']: size === SIZE.EXTRA_SMALL,
                                                                        ['h-8']: size === SIZE.SMALL,
                                                                        ['pr-6']:
                                                                                !isTrailingShow &&
                                                                                size === SIZE.EXTRA_LARGE,
                                                                        ['pr-5']:
                                                                                !isTrailingShow && size === SIZE.LARGE,
                                                                        ['pr-4']:
                                                                                (!isTrailingShow &&
                                                                                        size === SIZE.MEDIUM) ||
                                                                                (isTrailingShow &&
                                                                                        size === SIZE.EXTRA_LARGE),
                                                                        ['pr-3']:
                                                                                (!isTrailingShow &&
                                                                                        size === SIZE.SMALL) ||
                                                                                (isTrailingShow &&
                                                                                        size === SIZE.MEDIUM),
                                                                        ['pr-2']:
                                                                                (!isTrailingShow &&
                                                                                        size === SIZE.EXTRA_SMALL) ||
                                                                                (isTrailingShow && size === SIZE.SMALL),

                                                                        ['pr-[0.875rem]']:
                                                                                isTrailingShow && size === SIZE.LARGE,

                                                                        ['pr-1']:
                                                                                isTrailingShow &&
                                                                                size === SIZE.EXTRA_SMALL,
                                                                        ['pl-6']:
                                                                                !isLeadingShow &&
                                                                                size === SIZE.EXTRA_LARGE,

                                                                        ['pl-5']: !isLeadingShow && size === SIZE.LARGE,
                                                                        ['pl-4']:
                                                                                (!isLeadingShow &&
                                                                                        size === SIZE.MEDIUM) ||
                                                                                (isLeadingShow &&
                                                                                        size === SIZE.EXTRA_LARGE),
                                                                        ['pl-3']:
                                                                                (!isLeadingShow &&
                                                                                        size === SIZE.SMALL) ||
                                                                                (isLeadingShow && size === SIZE.MEDIUM),
                                                                        ['pl-2']:
                                                                                (!isLeadingShow &&
                                                                                        size === SIZE.EXTRA_SMALL) ||
                                                                                (isLeadingShow && size === SIZE.SMALL),
                                                                        ['pl-[0.875rem]']:
                                                                                isLeadingShow && size === SIZE.LARGE,
                                                                        ['pl-1']:
                                                                                isLeadingShow &&
                                                                                size === SIZE.EXTRA_SMALL
                                                                },
                                                                shapeClasses(shape)
                                                        )}
                                                        style={[headerAnimatedStyle]}
                                                        testID={`textInput__animatedHeader--${id}`}
                                                >
                                                        {leadingElement && (
                                                                <View
                                                                        className={clsx(
                                                                                'flex flex-col items-center justify-center',
                                                                                {
                                                                                        ['justify-start']: multiline,
                                                                                        ['mr-4 h-10 w-10']:
                                                                                                size ===
                                                                                                SIZE.EXTRA_LARGE,
                                                                                        ['mr-[0.875rem] h-8 w-8']:
                                                                                                size === SIZE.LARGE,
                                                                                        ['mr-3 h-6 w-6']:
                                                                                                size === SIZE.MEDIUM,
                                                                                        ['mr-2 h-6 w-6']:
                                                                                                size === SIZE.SMALL,
                                                                                        ['mr-1 h-6 w-6']:
                                                                                                size ===
                                                                                                SIZE.EXTRA_SMALL
                                                                                }
                                                                        )}
                                                                        testID={`textInput__leading--${id}`}
                                                                >
                                                                        {cloneElement(leadingElement, {
                                                                                color: theme.token.scheme
                                                                                        .onSurfaceVariant,
                                                                                ...Platform.select({
                                                                                        default: {size: iconSize},
                                                                                        web: {
                                                                                                style: {
                                                                                                        fontSize: pxToRem()(
                                                                                                                iconSize
                                                                                                        )
                                                                                                }
                                                                                        }
                                                                                })
                                                                        })}
                                                                </View>
                                                        )}

                                                        <View
                                                                testID={`textInput__main--${id}`}
                                                                className={clsx('z-10 flex flex-1', {
                                                                        ['flex-row flex-wrap gap-x-1 gap-y-2']:
                                                                                !!content,
                                                                        ['flex-col justify-end']: !content
                                                                })}
                                                        >
                                                                {content}
                                                                <View
                                                                        className='flex min-w-16 flex-1 flex-col justify-center self-stretch'
                                                                        testID={`textInput__control--${id}`}
                                                                        style={[
                                                                                {
                                                                                        ...(multiline && {
                                                                                                minHeight: contentSize?.height
                                                                                        })
                                                                                }
                                                                        ]}
                                                                >
                                                                        <AnimatedTextInput
                                                                                {...inputProps}
                                                                                editable={
                                                                                        typeof disabled === 'boolean' ?
                                                                                                !disabled
                                                                                        :       editable
                                                                                }
                                                                                className={clsx(
                                                                                        'flex-1 self-stretch pb-0 pl-0 pr-0 pt-0 text-left outline-none',
                                                                                        typographyClasses(
                                                                                                TYPOGRAPHY.BODY
                                                                                        )(size)()
                                                                                )}
                                                                                multiline={multiline}
                                                                                onBlur={onBlur}
                                                                                onFocus={onFocus}
                                                                                placeholder={placeholder}
                                                                                placeholderTextColor={
                                                                                        placeholderTextColor
                                                                                }
                                                                                ref={ref}
                                                                                style={[inputAnimatedStyle]}
                                                                                testID={`textInput__animatedTextInput--${id}`}
                                                                        />
                                                                </View>
                                                        </View>

                                                        {trailingElement && (
                                                                <View
                                                                        className={clsx(
                                                                                'flex flex-col items-center justify-center',
                                                                                {
                                                                                        ['justify-start']: multiline,
                                                                                        ['ml-4 h-10 w-10']:
                                                                                                size ===
                                                                                                SIZE.EXTRA_LARGE,
                                                                                        ['ml-[0.875rem] h-8 w-8']:
                                                                                                size === SIZE.LARGE,
                                                                                        ['ml-3 h-6 w-6']:
                                                                                                size === SIZE.MEDIUM,
                                                                                        ['ml-2 h-6 w-6']:
                                                                                                size === SIZE.SMALL,
                                                                                        ['ml-1 h-6 w-6']:
                                                                                                size ===
                                                                                                SIZE.EXTRA_SMALL
                                                                                }
                                                                        )}
                                                                        testID={`textInput__trailing--${id}`}
                                                                >
                                                                        {cloneElement(trailingElement, {
                                                                                size: ICON_BUTTON_SIZE[size],
                                                                                tabIndex: -1,
                                                                                type: ICON_BUTTON_TYPE.STANDARD
                                                                        })}
                                                                </View>
                                                        )}

                                                        <Animated.View
                                                                className='absolute bottom-0 left-0 right-0 z-20 h-[0.125rem] origin-bottom'
                                                                style={[activeIndicatorAnimatedStyle]}
                                                                testID={`textInput__animatedActiveIndicator--${id}`}
                                                        />

                                                        <Underlay
                                                                eventName={eventName}
                                                                opacities={underlayOpacities}
                                                                testID={`textInput__underlay--${id}`}
                                                                underlayColor={underlayColor}
                                                        />
                                                </Animated.View>
                                        </Pressable>

                                        {typeof supportingText === 'string' && (
                                                <LayoutAnimated
                                                        className={clsx('mb-1', {
                                                                ['pl-6 pr-6']: size === SIZE.EXTRA_LARGE,
                                                                ['pl-2 pr-2']: size === SIZE.EXTRA_SMALL,
                                                                ['pl-4 pr-4']: size === SIZE.MEDIUM,
                                                                ['pl-5 pr-5']: size === SIZE.LARGE,
                                                                ['pl-3 pr-3']: size === SIZE.SMALL
                                                        })}
                                                        onVisibility={onSupportingTextVisibility}
                                                        testID={`textInput__supportingLayoutAnimated--${id}`}
                                                        visible={supportingTextVisible}
                                                >
                                                        <Animated.Text
                                                                className={typographyClasses(TYPOGRAPHY.BODY)(size)()}
                                                                style={[supportingTextAnimatedStyle]}
                                                                testID={`textInput__animatedSupportingText--${id}`}
                                                        >
                                                                {supportingText}
                                                        </Animated.Text>
                                                </LayoutAnimated>
                                        )}
                                </View>
                        </View>
                )
        }
)

RenderTextInput.displayName = 'RenderTextInput'
