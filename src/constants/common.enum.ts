export const LAYOUT = {
	HORIZONTAL: 'HORIZONTAL',
	VERTICAL: 'VERTICAL'
} as const

export const COMPONENT_STATUS = {
	FAILED: 'FAILED',
	IDLE: 'IDLE',
	LOADING: 'LOADING',
	SUCCEEDED: 'SUCCEEDED'
} as const

export const STATE = {
	DISABLED: 'DISABLED',
	ENABLED: 'ENABLED',
	ERROR: 'ERROR',
	FOCUSED: 'FOCUSED',
	HOVERED: 'HOVERED',
	LONG_PRESS_IN: 'LONG_PRESS_IN',
	PRESS_IN: 'PRESS_IN'
} as const

export const EVENT_NAME = {
	BLUR: 'BLUR',
	FOCUS: 'FOCUS',
	HOVER_IN: 'HOVER_IN',
	HOVER_OUT: 'HOVER_OUT',
	LAYOUT: 'LAYOUT',
	LONG_PRESS: 'LONG_PRESS',
	NONE: 'NONE',
	PRESS_IN: 'PRESS_IN',
	PRESS_OUT: 'PRESS_OUT',
	PRESS: 'PRESS'
} as const

export const TRIGGER_ON = {
	FOCUS: 'FOCUS',
	HOVER: 'HOVER',
	NONE: 'NONE',
	PRESS: 'PRESS'
} as const

export const ALIGNMENT = {
	CENTER: 'CENTER',
	END: 'END',
	START: 'START'
} as const

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
