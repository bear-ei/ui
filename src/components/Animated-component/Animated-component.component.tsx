import {cssInterop} from 'nativewind'
import {TextInput} from 'react-native'
import Animated from 'react-native-reanimated'

export const AnimatedText = Animated.Text
export const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)
export const AnimatedView = Animated.View

/**
 * HACK:
 *
 * Waiting for upstream fix.
 *
 * Temporarily trigger Animated to correctly handle nativewind style
 */
cssInterop(AnimatedText, {className: 'style'})
cssInterop(AnimatedTextInput, {className: 'style'})
cssInterop(AnimatedView, {className: 'style'})
