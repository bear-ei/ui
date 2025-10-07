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

export const TRIGGER_EVENT = {
        FOCUS: 'FOCUS',
        HOVER: 'HOVER',
        PRESS: 'PRESS'
} as const

export const DURATION = {
        EXTRA_LONG_0: 'EXTRA_LONG_0',
        EXTRA_LONG_1: 'EXTRA_LONG_1',
        EXTRA_LONG_2: 'EXTRA_LONG_2',
        EXTRA_LONG_3: 'EXTRA_LONG_3',
        LONG_0: 'LONG_0',
        LONG_1: 'LONG_1',
        LONG_2: 'LONG_2',
        LONG_3: 'LONG_3',
        MEDIUM_0: 'MEDIUM_0',
        MEDIUM_1: 'MEDIUM_1',
        MEDIUM_2: 'MEDIUM_2',
        MEDIUM_3: 'MEDIUM_3',
        SHORT_0: 'SHORT_0',
        SHORT_1: 'SHORT_1',
        SHORT_2: 'SHORT_2',
        SHORT_3: 'SHORT_3'
} as const

export const EASING = {
        EMPHASIZED_ACCELERATE: 'EMPHASIZED_ACCELERATE',
        EMPHASIZED_DECELERATE: 'EMPHASIZED_DECELERATE',
        EMPHASIZED: 'EMPHASIZED',
        LINEAR: 'LINEAR',
        STANDARD_ACCELERATE: 'STANDARD_ACCELERATE',
        STANDARD_DECELERATE: 'STANDARD_DECELERATE',
        STANDARD: 'STANDARD'
} as const
