import {shapeClasses, typographyClasses} from '@/constants'
import {useTheme} from '@/hooks'
import {hexToRGBA, SHAPE, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '@bearei/theme-token'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {clsx} from 'clsx'
import {cloneElement, forwardRef} from 'react'
import {Pressable, TextInput, View} from 'react-native'
import Animated from 'react-native-reanimated'
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
                        leading,
                        listVisible,
                        onChangeText,
                        placeholder,
                        testID,
                        trailing,
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
                const shape = SHAPE.EXTRA_LARGE
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
                                        testID={`search__touchable--${id}`}
                                        tabIndex={-1}
                                        className='cursor-text outline-none'
                                >
                                        <Animated.View
                                                accessibilityLabel={accessibilityLabel ?? placeholder}
                                                accessibilityRole='keyboardkey'
                                                className={clsx(
                                                        'relative z-10 flex h-14 flex-row items-center justify-between gap-1 self-stretch pl-1',
                                                        {
                                                                ['pr-4']: !trailing,
                                                                ['pr-1']: !!trailing
                                                        },
                                                        shapeClasses(shape)
                                                )}
                                                style={[contentAnimatedStyle]}
                                                testID={`search__content--${id}`}
                                        >
                                                <View
                                                        className='flex h-10 w-10 flex-col items-center justify-center'
                                                        testID={`search__leading--${id}`}
                                                >
                                                        {cloneElement(
                                                                leading ?? (
                                                                        <MaterialIcons
                                                                                name='search'
                                                                                size={24}
                                                                                testID={`search__iconSearch--${id}`}
                                                                        />
                                                                ),
                                                                {disabled}
                                                        )}
                                                </View>

                                                <View
                                                        className='z-10 flex flex-1 flex-col justify-center self-stretch'
                                                        testID={`search__main--${id}`}
                                                >
                                                        <View
                                                                className='max-h-6 min-w-16'
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
                                                                                        TYPOGRAPHY_SIZE.LARGE
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

                                                {trailing && (
                                                        <View
                                                                className='flex h-10 w-10 flex-col items-center justify-center'
                                                                testID={`search__trailing--${id}`}
                                                        >
                                                                {cloneElement(trailing, {disabled})}
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
