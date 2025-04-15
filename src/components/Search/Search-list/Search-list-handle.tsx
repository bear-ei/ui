import {Duration, Easing} from '@bearei/material-token'
import {SharedValue} from 'react-native-reanimated'
import {emitter} from '../../../contexts'
import {AnimatedTiming} from '../../../hooks'

export const handleSearchListEmit = (id: string) => (_render: () => React.JSX.Element) => (visible?: boolean) =>
	typeof visible === 'boolean' && emitter.emit('modal', {id: `search__list--${id}`, name: 'tooltip'})

export const handleSearchListUnmount = (id: string) =>
	emitter.emit('modal', {id: `search__list--${id}`, name: 'tooltip'})

export const handleSearchListAnimatedTiming =
	(animatedTiming: AnimatedTiming) => (heightSharedValue: SharedValue<number>) => (visible?: boolean) =>
		animatedTiming({
			duration: visible ? Duration.MEDIUM_3 : Duration.SHORT_3,
			easing: visible ? Easing.EMPHASIZED_DECELERATE : Easing.EMPHASIZED_ACCELERATE
		})(heightSharedValue)(visible ? 1 : 0)
