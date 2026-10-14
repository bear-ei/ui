import {cssInterop} from 'nativewind'
import {TextInput} from 'react-native'
import Animated from 'react-native-reanimated'

// Reanimated ships built-in wrappers for Text and View.
// TextInput has no built-in equivalent, so we wrap it manually.
export const AnimatedText = Animated.Text
export const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)
export const AnimatedView = Animated.View

/**
 * HACK:
 * Waiting for upstream fix. (nativewind v4.x)
 * @see https://github.com/software-mansion/react-native-reanimated/issues/8329
 *
 * TODO: Remove when NativeWind v5 is adopted.
 * Note: cssInterop is no longer exported in NativeWind v5 RC.
 * ⚠️ Assumes `cssInterop` mutates the target in-place (NativeWind v4 behavior).
 * If v5 changes to functional return, these must be reassigned.
 */
cssInterop(AnimatedText, {className: 'style'})
cssInterop(AnimatedTextInput, {className: 'style'})
cssInterop(AnimatedView, {className: 'style'})
