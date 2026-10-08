import {cssInterop} from 'nativewind'
import {TextInput} from 'react-native'
import Animated from 'react-native-reanimated'

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
 */
cssInterop(AnimatedText, {className: 'style'})
cssInterop(AnimatedTextInput, {className: 'style'})
cssInterop(AnimatedView, {className: 'style'})
