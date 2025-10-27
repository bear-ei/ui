import {useTheme} from '@/hooks'
import {platformValue, processIconSize, shapeClasses, typographyClasses} from '@/utils'
import {hexToRGBA, SHAPE, SIZE, TYPOGRAPHY} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {Search} from 'lucide-react-native'
import {cloneElement, forwardRef} from 'react'
import {Pressable, TextInput, View} from 'react-native'
import Animated from 'react-native-reanimated'
import {ICON_BUTTON_TYPE} from '../Icon-button'
import {Underlay} from '../Underlay'
import type {RenderSearchProps} from './Search.interface'

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)
export const RenderSearch = forwardRef<TextInput, RenderSearchProps>(
        (
                {
                        accessibilityLabel,
                        containerRef,
                        contentAnimatedStyle,
                        disabled,
                        editable,
                        eventName,
                        id,
                        inputAnimatedStyle,
                        interactionHandlers,
                        layout: _,
                        leadingElement,
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
                const theme = useTheme()
                const placeholderTextColor =
                        disabled ?
                                hexToRGBA(theme.token.scheme.onSurface)(theme.token.opacity.level5)
                        :       theme.token.scheme.onSurfaceVariant

                const {onBlur, onFocus, ...touchableInteractionHandlers} = interactionHandlers
                const iconSize = processIconSize(theme)(size)
                const isLeadingShow = !!leadingElement
                const isTrailingShow = !!trailingElement
                const shape = SHAPE.FULL
                const underlayColor = theme.token.scheme.onSurface
                const underlayOpacities = [theme.token.opacity.level0, theme.token.opacity.level1] as [number, number]

                return (
                        <View
                                {...(containerRef && {ref: containerRef})}
                                className='relative z-40 justify-center self-stretch'
                                testID={testID ?? `search--${id}`}
                        >
                                <Pressable
                                        {...touchableInteractionHandlers}
                                        className='cursor-text outline-none'
                                        tabIndex={-1}
                                        testID={`search__touchable--${id}`}
                                >
                                        <Animated.View
                                                accessibilityLabel={accessibilityLabel ?? placeholder}
                                                accessibilityRole='keyboardkey'
                                                className={clsx(
                                                        'relative z-10 flex flex-row items-center justify-between self-stretch pl-1',
                                                        {
                                                                ['h-10']: size === SIZE.MEDIUM,
                                                                ['h-12']: size === SIZE.LARGE,
                                                                ['h-14']: size === SIZE.EXTRA_LARGE,
                                                                ['h-6']: size === SIZE.EXTRA_SMALL,
                                                                ['h-8']: size === SIZE.SMALL,
                                                                ['pr-6']: !isTrailingShow && size === SIZE.EXTRA_LARGE,
                                                                ['pr-5']: !isTrailingShow && size === SIZE.LARGE,
                                                                ['pr-4']:
                                                                        (!isTrailingShow && size === SIZE.MEDIUM) ||
                                                                        (isTrailingShow && size === SIZE.EXTRA_LARGE),
                                                                ['pr-3']:
                                                                        (!isTrailingShow && size === SIZE.SMALL) ||
                                                                        (isTrailingShow && size === SIZE.MEDIUM),
                                                                ['pr-2']:
                                                                        (!isTrailingShow &&
                                                                                size === SIZE.EXTRA_SMALL) ||
                                                                        (isTrailingShow && size === SIZE.SMALL),

                                                                ['pr-[0.875rem]']:
                                                                        isTrailingShow && size === SIZE.LARGE,

                                                                ['pr-1']: isTrailingShow && size === SIZE.EXTRA_SMALL,
                                                                ['pl-6']: !isLeadingShow && size === SIZE.EXTRA_LARGE,

                                                                ['pl-5']: !isLeadingShow && size === SIZE.LARGE,
                                                                ['pl-4']:
                                                                        (!isLeadingShow && size === SIZE.MEDIUM) ||
                                                                        (isLeadingShow && size === SIZE.EXTRA_LARGE),
                                                                ['pl-3']:
                                                                        (!isLeadingShow && size === SIZE.SMALL) ||
                                                                        (isLeadingShow && size === SIZE.MEDIUM),
                                                                ['pl-2']:
                                                                        (!isLeadingShow && size === SIZE.EXTRA_SMALL) ||
                                                                        (isLeadingShow && size === SIZE.SMALL),
                                                                ['pl-[0.875rem]']: isLeadingShow && size === SIZE.LARGE,
                                                                ['pl-1']: isLeadingShow && size === SIZE.EXTRA_SMALL
                                                        },
                                                        shapeClasses(shape)
                                                )}
                                                style={[contentAnimatedStyle]}
                                                testID={`search__content--${id}`}
                                        >
                                                <View
                                                        className={clsx('flex flex-col items-center justify-center', {
                                                                ['mr-[0.875rem] h-8 w-8']: size === SIZE.LARGE,
                                                                ['mr-1 h-6 w-6']: size === SIZE.EXTRA_SMALL,
                                                                ['mr-2 h-6 w-6']: size === SIZE.SMALL,
                                                                ['mr-3 h-6 w-6']: size === SIZE.MEDIUM,
                                                                ['mr-4 h-10 w-10']: size === SIZE.EXTRA_LARGE
                                                        })}
                                                        testID={`search__leading--${id}`}
                                                >
                                                        {cloneElement(leadingElement ?? <Search />, {
                                                                color: theme.token.scheme.onSurfaceVariant,
                                                                disabled,
                                                                size: platformValue(iconSize),
                                                                testID: `search__leadingIcon--${id}`
                                                        })}
                                                </View>

                                                <View
                                                        className='z-10 flex flex-1 flex-col justify-center self-stretch'
                                                        testID={`search__main--${id}`}
                                                >
                                                        <View
                                                                className='flex min-w-16 flex-1 flex-col justify-center self-stretch'
                                                                testID={`search__control--${id}`}
                                                        >
                                                                <AnimatedTextInput
                                                                        {...textInputProps}
                                                                        editable={
                                                                                typeof disabled === 'boolean' ?
                                                                                        !disabled
                                                                                :       editable
                                                                        }
                                                                        className={clsx(
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
                                                                        testID={`search__searchTextInput--${id}`}
                                                                        value={value}
                                                                />
                                                        </View>
                                                </View>

                                                {trailingElement && (
                                                        <View
                                                                className={clsx(
                                                                        'flex flex-col items-center justify-center',
                                                                        {
                                                                                ['ml-4 h-10 w-10']:
                                                                                        size === SIZE.EXTRA_LARGE,
                                                                                ['ml-[0.875rem] h-8 w-8']:
                                                                                        size === SIZE.LARGE,
                                                                                ['ml-3 h-6 w-6']: size === SIZE.MEDIUM,
                                                                                ['ml-2 h-6 w-6']: size === SIZE.SMALL,
                                                                                ['ml-1 h-6 w-6']:
                                                                                        size === SIZE.EXTRA_SMALL
                                                                        }
                                                                )}
                                                                testID={`search__trailing--${id}`}
                                                        >
                                                                {cloneElement(trailingElement, {
                                                                        disabled,
                                                                        tabIndex: -1,
                                                                        type: ICON_BUTTON_TYPE.STANDARD
                                                                })}
                                                        </View>
                                                )}

                                                <Underlay
                                                        eventName={eventName}
                                                        opacities={underlayOpacities}
                                                        shape={listVisible ? SHAPE.EXTRA_LARGE_TOP : shape}
                                                        testID={`search__underlay--${id}`}
                                                        underlayColor={underlayColor}
                                                />
                                        </Animated.View>
                                </Pressable>

                                {/* <SearchList
				{...listProps}
				containerLayout={layout}
				testID={`search__searchList--${id}`}
			/> */}
                        </View>
                )
        }
)

RenderSearch.displayName = 'RenderSearch'
