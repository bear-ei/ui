import {AnimatedTextInput, shapeClasses, typographyClasses} from '@/constants'
import {useTheme} from '@/hooks'
import {hexToRGBA, SHAPE, Size, SIZE, TYPOGRAPHY} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {cloneElement, forwardRef} from 'react'
import {Pressable, TextInput, View} from 'react-native'
import Animated from 'react-native-reanimated'
import {LayoutAnimated} from '../Layout-animated'
import {Underlay} from '../Underlay'
import type {RenderTextInputProps} from './Text-input.interface'

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
                        labelAnimatedStyle,
                        labelText,
                        labelTextAnimatedStyle,
                        leading,
                        multiline,
                        onHeaderFocus,
                        onSupportingTextVisibility,
                        size = SIZE.MEDIUM,
                        supportingText,
                        supportingTextAnimatedStyle,
                        supportingTextVisible,
                        testID,
                        trailing,
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
                const isLeadingShow = !!leading
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
                                                className='cursor-text outline-none'
                                                onFocus={onHeaderFocus}
                                                tabIndex={-1}
                                                testID={`textInput__touchableHeader--${id}`}
                                        >
                                                <Animated.View
                                                        className={clsx(
                                                                'relative z-10 flex flex-row items-center gap-1',
                                                                {
                                                                        ['h-10 min-w-10']: size === SIZE.MEDIUM,
                                                                        ['h-12 min-w-12']: size === SIZE.LARGE,
                                                                        ['h-14 min-w-14']: size === SIZE.EXTRA_LARGE,
                                                                        ['h-6 min-w-6']: size === SIZE.EXTRA_SMALL,
                                                                        ['h-8 min-w-8']: size === SIZE.SMALL,
                                                                        ['pl-2 pr-2']: size === SIZE.SMALL,
                                                                        ['pl-3 pr-3']: size === SIZE.SMALL,
                                                                        ['pl-4 pr-4']: (
                                                                                [
                                                                                        SIZE.MEDIUM,
                                                                                        SIZE.LARGE,
                                                                                        SIZE.EXTRA_LARGE
                                                                                ] as readonly Size[]
                                                                        ).includes(size)
                                                                },
                                                                shapeClasses(shape)
                                                        )}
                                                        style={[headerAnimatedStyle]}
                                                        testID={`textInput__animatedHeader--${id}`}
                                                >
                                                        {leading && (
                                                                <View
                                                                        className='flex h-10 w-10 items-center justify-center'
                                                                        testID={`textInput__leading--${id}`}
                                                                >
                                                                        {leading}
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
                                                                        className='m-h-6 flex min-w-16 flex-1 flex-col justify-center self-stretch'
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
                                                                                placeholderTextColor={
                                                                                        placeholderTextColor
                                                                                }
                                                                                ref={ref}
                                                                                style={[inputAnimatedStyle]}
                                                                                testID={`textInput__animatedTextInput--${id}`}
                                                                        />
                                                                </View>
                                                        </View>

                                                        {trailing && (
                                                                <View
                                                                        className='flex h-10 w-10 flex-col items-center justify-center'
                                                                        testID={`textInput__trailing--${id}`}
                                                                >
                                                                        {cloneElement(trailing, {disabledFocus: true})}
                                                                </View>
                                                        )}

                                                        {/* <Animated.View
                                                                className={clsx(
                                                                        'absolute top-4 z-20 flex origin-top-left flex-col',
                                                                        {
                                                                                ['left-4']: !isLeadingShow,
                                                                                ['left-11']: isLeadingShow
                                                                        }
                                                                )}
                                                                style={[labelAnimatedStyle]}
                                                                testID={`textInput__animatedLabel--${id}`}
                                                        >
                                                                <Animated.Text
                                                                        className={typographyClasses(TYPOGRAPHY.BODY)(
                                                                                TYPOGRAPHY_SIZE.LARGE
                                                                        )()}
                                                                        style={[labelTextAnimatedStyle]}
                                                                        testID={`textInput__animatedLabelText--${id}`}
                                                                >
                                                                        {labelText}
                                                                </Animated.Text>
                                                        </Animated.View> */}

                                                        <Animated.View
                                                                className='absolute bottom-0 left-0 right-0 z-20 h-1 origin-bottom'
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

                                        <LayoutAnimated
                                                className='pl-4 pr-4'
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
                                </View>
                        </View>
                )
        }
)

RenderTextInput.displayName = 'RenderTextInput'
