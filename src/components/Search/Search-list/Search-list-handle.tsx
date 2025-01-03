import {SharedValue} from 'react-native-reanimated'
import {emitter} from '../../../contexts'
import {AnimatedTiming} from '../../../hooks'

export const handleSearchListEmit = (id: string) => (_render: () => JSX.Element) => (visible?: boolean) =>
        typeof visible === 'boolean' && emitter.emit('modal', {id: `search__list--${id}`, name: 'tooltip'})

export const handleSearchListUnmount = (id: string) =>
        emitter.emit('modal', {id: `search__list--${id}`, name: 'tooltip'})

export const handleSearchListAnimatedTiming =
        (animatedTiming: AnimatedTiming) => (heightSharedValue: SharedValue<number>) => (visible?: boolean) =>
                animatedTiming({
                        duration: visible ? 'medium3' : 'short3',
                        easing: visible ? 'emphasizedDecelerate' : 'emphasizedAccelerate'
                })(heightSharedValue)(visible ? 1 : 0)
