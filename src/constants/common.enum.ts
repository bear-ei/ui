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
        PRESS: 'PRESS'
} as const

export const ALIGNMENT = {
        CENTER: 'CENTER',
        END: 'END',
        START: 'START'
} as const
