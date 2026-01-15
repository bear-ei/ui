import {AnimatedTextInput, AnimatedView} from '@/components/Animated-component'
import {ICON_BUTTON_TYPE} from '@/components/Icon-button'
import {Underlay} from '@/components/Underlay'
import {ICON_BUTTON_SIZE} from '@/constants'
import {useTheme} from '@/hooks'
import {classesName, platformValue, processIconSize, typographyClasses} from '@/utils'
import {hexToRGBA, SHAPE, SIZE, TYPOGRAPHY, type Size} from '@bearei/theme-token'
import {Search} from 'lucide-react-native'
import {cloneElement, forwardRef} from 'react'
import {Pressable, TextInput, View} from 'react-native'
import type {RenderSearchTextInputProps} from './Search-text-input.interface'

export const RenderSearchTextInput = forwardRef<TextInput, RenderSearchTextInputProps>(
        (
                {
                        accessibilityLabel,
                        autoCapitalize = 'none',
                        autoComplete = 'off',
                        autoCorrect = false,
                        contentAnimatedStyle,
                        disabled,
                        editable,
                        eventName,
                        id,
                        inputAnimatedStyle,
                        interactionHandlers,
                        leadingElement = <Search />,
                        listVisible,
                        onChangeText,
                        placeholder,
                        size = SIZE.MEDIUM,
                        testID,
                        trailingElement,
                        value,
                        ...textInputProps
                },
                ref
        ) => {
                const {onBlur, onFocus, ...touchableInteractionHandlers} = interactionHandlers
                const theme = useTheme()
                const iconSize = processIconSize(theme)(ICON_BUTTON_SIZE[size])
                const isLeadingShow = !!leadingElement
                const isTrailingShow = !!trailingElement
                const placeholderTextColor =
                        disabled ?
                                hexToRGBA(theme.token.scheme.onSurface)(theme.token.opacity.level5)
                        :       theme.token.scheme.onSurfaceVariant

                const trailingSize = ICON_BUTTON_SIZE[size]
                const underlayColor = theme.token.scheme.onSurface
                const underlayOpacities = [theme.token.opacity.level0, theme.token.opacity.level1] as [number, number]

                return (
                        <View
                                className={classesName('relative justify-center self-stretch', {
                                        ['h-10']: size === SIZE.SMALL,
                                        ['h-12']: size === SIZE.MEDIUM,
                                        ['h-14']: size === SIZE.LARGE,
                                        ['h-16']: size === SIZE.EXTRA_LARGE,
                                        ['h-8']: size === SIZE.EXTRA_SMALL
                                })}
                                testID={testID ?? `searchTextInput--${id}`}
                        >
                                <Pressable
                                        {...touchableInteractionHandlers}
                                        className='flex-1 cursor-text outline-none'
                                        tabIndex={-1}
                                        testID={`searchTextInput__touchable--${id}`}
                                >
                                        <AnimatedView
                                                accessibilityLabel={accessibilityLabel ?? placeholder}
                                                accessibilityRole='keyboardkey'
                                                className={classesName(
                                                        'relative z-10 flex flex-1 flex-row items-center justify-between self-stretch',
                                                        {
                                                                ['pr-6']: !isTrailingShow && size === SIZE.EXTRA_LARGE,
                                                                ['pl-6']: !isLeadingShow && size === SIZE.EXTRA_LARGE,
                                                                ['pr-3']:
                                                                        (isTrailingShow && size === SIZE.EXTRA_LARGE) ||
                                                                        (!isTrailingShow && size === SIZE.SMALL),

                                                                ['pl-3']:
                                                                        (isLeadingShow && size === SIZE.EXTRA_LARGE) ||
                                                                        (!isLeadingShow && size === SIZE.SMALL),

                                                                ['pr-5']: !isTrailingShow && size === SIZE.LARGE,
                                                                ['pl-5']: !isLeadingShow && size === SIZE.LARGE,
                                                                ['pr-[0.625rem]']:
                                                                        isTrailingShow && size === SIZE.LARGE,

                                                                ['pl-[0.625rem]']: isLeadingShow && size === SIZE.LARGE,

                                                                ['pr-4']: !isTrailingShow && size === SIZE.MEDIUM,
                                                                ['pl-4']: !isLeadingShow && size === SIZE.MEDIUM,
                                                                ['pr-2']:
                                                                        (isTrailingShow && size === SIZE.MEDIUM) ||
                                                                        (!isTrailingShow && size === SIZE.EXTRA_SMALL),

                                                                ['pl-2']:
                                                                        (isLeadingShow && size === SIZE.MEDIUM) ||
                                                                        (!isLeadingShow && size === SIZE.EXTRA_SMALL),

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
                                                        }
                                                )}
                                                style={[contentAnimatedStyle]}
                                                testID={`searchTextInput__content--${id}`}
                                        >
                                                <View
                                                        className={classesName(
                                                                'flex flex-col items-center justify-center',
                                                                {
                                                                        ['mr-1']: (
                                                                                [
                                                                                        SIZE.SMALL,
                                                                                        SIZE.EXTRA_SMALL
                                                                                ] as readonly Size[]
                                                                        ).includes(size),
                                                                        ['mr-2']: size === SIZE.MEDIUM,
                                                                        ['mr-3']: size === SIZE.EXTRA_LARGE,
                                                                        ['mr-[0.625rem]']: size === SIZE.LARGE,
                                                                        ['h-12 w-12']: size === SIZE.EXTRA_LARGE,
                                                                        ['h-10 w-10']: size === SIZE.LARGE,
                                                                        ['h-8 w-8']:
                                                                                size &&
                                                                                (
                                                                                        [
                                                                                                SIZE.MEDIUM,
                                                                                                SIZE.SMALL
                                                                                        ] as readonly Size[]
                                                                                ).includes(size),

                                                                        ['h-6 w-6']: size === SIZE.EXTRA_SMALL
                                                                }
                                                        )}
                                                        testID={`searchTextInput__leading--${id}`}
                                                >
                                                        {cloneElement(leadingElement, {
                                                                color: theme.token.scheme.onSurfaceVariant,
                                                                disabled,
                                                                size: platformValue(iconSize),
                                                                testID: `searchTextInput__leadingIcon--${id}`
                                                        })}
                                                </View>

                                                <View
                                                        className='z-10 flex flex-1 flex-col justify-center self-stretch'
                                                        testID={`searchTextInput__main--${id}`}
                                                >
                                                        <View
                                                                className='flex min-w-16 flex-1 flex-col justify-center self-stretch'
                                                                testID={`searchTextInput__control--${id}`}
                                                        >
                                                                <AnimatedTextInput
                                                                        {...textInputProps}
                                                                        autoCapitalize={autoCapitalize}
                                                                        autoComplete={autoComplete}
                                                                        autoCorrect={autoCorrect}
                                                                        editable={
                                                                                typeof disabled === 'boolean' ?
                                                                                        !disabled
                                                                                :       editable
                                                                        }
                                                                        className={classesName(
                                                                                'flex-1 self-stretch pb-0 pl-0 pr-0 pt-0 text-left outline-none',
                                                                                typographyClasses(TYPOGRAPHY.BODY)(
                                                                                        size
                                                                                )()
                                                                        )}
                                                                        onBlur={onBlur}
                                                                        onChangeText={onChangeText}
                                                                        onFocus={onFocus}
                                                                        placeholder={placeholder}
                                                                        placeholderTextColor={placeholderTextColor}
                                                                        ref={ref}
                                                                        style={[inputAnimatedStyle]}
                                                                        testID={`searchTextInput__input--${id}`}
                                                                        value={value}
                                                                />
                                                        </View>
                                                </View>

                                                {trailingElement && (
                                                        <View
                                                                className={classesName(
                                                                        'flex flex-col items-center justify-center',
                                                                        {
                                                                                ['ml-1']: (
                                                                                        [
                                                                                                SIZE.SMALL,
                                                                                                SIZE.EXTRA_SMALL
                                                                                        ] as readonly Size[]
                                                                                ).includes(size),
                                                                                ['ml-2']: size === SIZE.MEDIUM,
                                                                                ['ml-3']: size === SIZE.EXTRA_LARGE,
                                                                                ['ml-[0.625rem]']: size === SIZE.LARGE,
                                                                                ['h-12 w-12']:
                                                                                        size === SIZE.EXTRA_LARGE,

                                                                                ['h-10 w-10']: size === SIZE.LARGE,
                                                                                ['h-8 w-8']:
                                                                                        size &&
                                                                                        (
                                                                                                [
                                                                                                        SIZE.MEDIUM,
                                                                                                        SIZE.SMALL
                                                                                                ] as readonly Size[]
                                                                                        ).includes(size),

                                                                                ['h-6 w-6']: size === SIZE.EXTRA_SMALL
                                                                        }
                                                                )}
                                                                testID={`searchTextInput__trailing--${id}`}
                                                        >
                                                                {cloneElement(trailingElement, {
                                                                        disabled,
                                                                        size: trailingSize,
                                                                        tabIndex: -1,
                                                                        type: ICON_BUTTON_TYPE.STANDARD
                                                                })}
                                                        </View>
                                                )}

                                                <Underlay
                                                        eventName={eventName}
                                                        opacities={underlayOpacities}
                                                        shape={listVisible ? SHAPE.MEDIUM_TOP : SHAPE.EXTRA_LARGE}
                                                        testID={`searchTextInput__underlay--${id}`}
                                                        underlayColor={underlayColor}
                                                />
                                        </AnimatedView>
                                </Pressable>
                        </View>
                )
        }
)

RenderSearchTextInput.displayName = 'RenderSearchTextInput'
