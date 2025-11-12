import {ICON_BUTTON_SIZE} from '@/constants'
import {useTheme} from '@/hooks'
import {platformValue, processIconSize, shapeClasses, typographyClasses} from '@/utils'
import {hexToRGBA, SHAPE, SIZE, TYPOGRAPHY, type Size} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {cloneElement, forwardRef} from 'react'
import {Pressable, TextInput, View, type ViewStyle} from 'react-native'
import {AnimatedTextInput, AnimatedView} from '../Animated-component'
import {ICON_BUTTON_TYPE} from '../Icon-button'
import {SupportingText} from '../Supporting-text'
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
                        placeholder = 'Placeholder',
                        size = SIZE.MEDIUM,
                        supportingText,
                        supportingTextVisible,
                        testID,
                        trailingElement,
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
                                        className='flex flex-col gap-1'
                                        testID={`textInput__content--${id}`}
                                >
                                        <Pressable
                                                {...onTouchableHeaderEvent}
                                                {...(!error && {
                                                        accessibilityLabel: accessibilityLabel ?? labelText,
                                                        accessibilityRole: 'keyboardkey'
                                                })}
                                                className={clsx('flex cursor-text flex-col outline-none', {
                                                        ['h-10']: size === SIZE.SMALL,
                                                        ['h-12']: size === SIZE.MEDIUM,
                                                        ['h-14']: size === SIZE.LARGE,
                                                        ['h-16']: size === SIZE.EXTRA_LARGE,
                                                        ['h-8']: size === SIZE.EXTRA_SMALL
                                                })}
                                                onFocus={onHeaderFocus}
                                                tabIndex={-1}
                                                testID={`textInput__touchableHeader--${id}`}
                                        >
                                                <AnimatedView
                                                        className={clsx(
                                                                'relative z-10 flex min-w-20 flex-1 flex-row items-center',
                                                                {
                                                                        ['pr-6']:
                                                                                !isTrailingShow &&
                                                                                size === SIZE.EXTRA_LARGE,
                                                                        ['pl-6']:
                                                                                !isLeadingShow &&
                                                                                size === SIZE.EXTRA_LARGE,
                                                                        ['pr-3']:
                                                                                (isTrailingShow &&
                                                                                        size === SIZE.EXTRA_LARGE) ||
                                                                                (!isTrailingShow &&
                                                                                        size === SIZE.SMALL),

                                                                        ['pl-3']:
                                                                                (isLeadingShow &&
                                                                                        size === SIZE.EXTRA_LARGE) ||
                                                                                (!isLeadingShow && size === SIZE.SMALL),

                                                                        ['pr-5']:
                                                                                !isTrailingShow && size === SIZE.LARGE,
                                                                        ['pl-5']: !isLeadingShow && size === SIZE.LARGE,
                                                                        ['pr-[0.625rem]']:
                                                                                isTrailingShow && size === SIZE.LARGE,

                                                                        ['pl-[0.625rem]']:
                                                                                isLeadingShow && size === SIZE.LARGE,

                                                                        ['pr-4']:
                                                                                !isTrailingShow && size === SIZE.MEDIUM,
                                                                        ['pl-4']:
                                                                                !isLeadingShow && size === SIZE.MEDIUM,
                                                                        ['pr-2']:
                                                                                (isTrailingShow &&
                                                                                        size === SIZE.MEDIUM) ||
                                                                                (!isTrailingShow &&
                                                                                        size === SIZE.EXTRA_SMALL),

                                                                        ['pl-2']:
                                                                                (isLeadingShow &&
                                                                                        size === SIZE.MEDIUM) ||
                                                                                (!isLeadingShow &&
                                                                                        size === SIZE.EXTRA_SMALL),

                                                                        ['pr-1']:
                                                                                isTrailingShow &&
                                                                                size &&
                                                                                (
                                                                                        [
                                                                                                SIZE.SMALL,
                                                                                                SIZE.EXTRA_SMALL
                                                                                        ] as readonly Size[]
                                                                                ).includes(size),
                                                                        ['pl-1']:
                                                                                isLeadingShow &&
                                                                                size &&
                                                                                (
                                                                                        [
                                                                                                SIZE.SMALL,
                                                                                                SIZE.EXTRA_SMALL
                                                                                        ] as readonly Size[]
                                                                                ).includes(size)
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
                                                                                        ['mr-1']: (
                                                                                                [
                                                                                                        SIZE.SMALL,
                                                                                                        SIZE.EXTRA_SMALL
                                                                                                ] as readonly Size[]
                                                                                        ).includes(size),
                                                                                        ['mr-2']: size === SIZE.MEDIUM,
                                                                                        ['mr-3']:
                                                                                                size ===
                                                                                                SIZE.EXTRA_LARGE,
                                                                                        ['mr-[0.625rem]']:
                                                                                                size === SIZE.LARGE,

                                                                                        ['h-12 w-12']:
                                                                                                size ===
                                                                                                SIZE.EXTRA_LARGE,

                                                                                        ['h-10 w-10']:
                                                                                                size === SIZE.LARGE,

                                                                                        ['h-8 w-8']:
                                                                                                size &&
                                                                                                (
                                                                                                        [
                                                                                                                SIZE.MEDIUM,
                                                                                                                SIZE.SMALL
                                                                                                        ] as readonly Size[]
                                                                                                ).includes(size),

                                                                                        ['h-6 w-6']:
                                                                                                size ===
                                                                                                SIZE.EXTRA_SMALL
                                                                                }
                                                                        )}
                                                                        testID={`textInput__leading--${id}`}
                                                                >
                                                                        {cloneElement(leadingElement, {
                                                                                color: theme.token.scheme
                                                                                        .onSurfaceVariant,
                                                                                size: platformValue(iconSize),
                                                                                testID: `textInput__leadingIcon--${id}`
                                                                        })}
                                                                </View>
                                                        )}

                                                        <View
                                                                className={clsx('z-10 flex flex-1', {
                                                                        ['flex-row flex-wrap gap-x-1 gap-y-2']:
                                                                                !!content,
                                                                        ['flex-col justify-end']: !content
                                                                })}
                                                                testID={`textInput__main--${id}`}
                                                        >
                                                                {content}
                                                                <View
                                                                        className='flex min-w-16 flex-1 flex-col justify-center self-stretch'
                                                                        testID={`textInput__control--${id}`}
                                                                        style={[
                                                                                {
                                                                                        minHeight: platformValue(
                                                                                                contentSize?.height ??
                                                                                                        theme.token
                                                                                                                .spacing
                                                                                                                .none
                                                                                        )
                                                                                } as ViewStyle
                                                                        ]}
                                                                >
                                                                        <AnimatedTextInput
                                                                                {...inputProps}
                                                                                className={clsx(
                                                                                        'flex-1 self-stretch pb-0 pl-0 pr-0 pt-0 text-left outline-none',
                                                                                        typographyClasses(
                                                                                                TYPOGRAPHY.BODY
                                                                                        )(size)()
                                                                                )}
                                                                                editable={
                                                                                        typeof disabled === 'boolean' ?
                                                                                                !disabled
                                                                                        :       editable
                                                                                }
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
                                                                                        ['ml-1']: (
                                                                                                [
                                                                                                        SIZE.SMALL,
                                                                                                        SIZE.EXTRA_SMALL
                                                                                                ] as readonly Size[]
                                                                                        ).includes(size),
                                                                                        ['ml-2']: size === SIZE.MEDIUM,
                                                                                        ['ml-3']:
                                                                                                size ===
                                                                                                SIZE.EXTRA_LARGE,
                                                                                        ['ml-[0.625rem]']:
                                                                                                size === SIZE.LARGE,
                                                                                        ['h-12 w-12']:
                                                                                                size ===
                                                                                                SIZE.EXTRA_LARGE,

                                                                                        ['h-10 w-10']:
                                                                                                size === SIZE.LARGE,

                                                                                        ['h-8 w-8']:
                                                                                                size &&
                                                                                                (
                                                                                                        [
                                                                                                                SIZE.MEDIUM,
                                                                                                                SIZE.SMALL
                                                                                                        ] as readonly Size[]
                                                                                                ).includes(size),

                                                                                        ['h-6 w-6']:
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

                                                        <AnimatedView
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
                                                </AnimatedView>
                                        </Pressable>

                                        <SupportingText
                                                disabled={disabled}
                                                error={error}
                                                onVisibility={onSupportingTextVisibility}
                                                size={size}
                                                testID={`textInput__supportingLayoutAnimated--${id}`}
                                                visible={supportingTextVisible}
                                        >
                                                {supportingText}
                                        </SupportingText>
                                </View>
                        </View>
                )
        }
)

RenderTextInput.displayName = 'RenderTextInput'
