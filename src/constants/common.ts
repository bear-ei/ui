import type {EventName, TriggerOn} from './common.interface'

import {EVENT_NAME, TRIGGER_ON} from './common.enum'

/**
 * Off-screen position / z-index used to hide popover content
 * before its layout is measured.
 *
 * The content must stay in the layout tree for `measureInWindow` to
 * read its size — so instead of `display: none`, we move it far off-screen.
 */
export const OFF_SCREEN_LAYOUT = {
	position: -16384,
	zIndex: -4096
} as const

/**
 * Event names emitted by each trigger mode, in `[enter, leave]` order.
 */
export const TRIGGER_EVENT_NAMES = {
	[TRIGGER_ON.FOCUS]: [EVENT_NAME.FOCUS, EVENT_NAME.BLUR],
	[TRIGGER_ON.HOVER]: [EVENT_NAME.HOVER_IN, EVENT_NAME.HOVER_OUT],
	[TRIGGER_ON.NONE]: [EVENT_NAME.NONE],
	[TRIGGER_ON.PRESS]: [EVENT_NAME.PRESS_IN]
} as Record<TriggerOn, readonly EventName[]>
