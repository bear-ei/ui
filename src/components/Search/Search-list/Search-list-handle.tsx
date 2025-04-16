import {DURATION, EASING} from '@bearei/material-token'
import type {SharedValue} from 'react-native-reanimated'
import {emitter, MODAL_TYPE} from '../../../contexts'
import type {AnimatedTiming} from '../../../hooks'

export const handleSearchListEmit = (id: string) => (_render: () => React.JSX.Element) => (visible?: boolean) =>
	typeof visible === 'boolean' && emitter.emit('modal', {id: `search__list--${id}`, type: MODAL_TYPE.TOOL_TIP})

export const handleSearchListUnmount = (id: string) =>
	emitter.emit('modal', {id: `search__list--${id}`, type: MODAL_TYPE.TOOL_TIP})

export const handleSearchListAnimatedTiming =
	(animatedTiming: AnimatedTiming) => (heightSharedValue: SharedValue<number>) => (visible?: boolean) =>
		animatedTiming({
			duration: visible ? DURATION.MEDIUM_3 : DURATION.SHORT_3,
			easing: visible ? EASING.EMPHASIZED_DECELERATE : EASING.EMPHASIZED_ACCELERATE
		})(heightSharedValue)(visible ? 1 : 0)
