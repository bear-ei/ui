import {CommonProps, EventName} from '@/constants'
import {AnimateSharedValueTo, HandleStateEventChangeOptions, InteractionHandlers} from '@/hooks'
import type {ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {TouchableProps} from '../Touchable'
import type {ICON_BUTTON_TYPE} from './Icon-button.enum'

export type IconButtonType = (typeof ICON_BUTTON_TYPE)[keyof typeof ICON_BUTTON_TYPE]
export interface IconButtonProps extends TouchableProps, CommonProps {
        active?: boolean
        defaultActive?: boolean
        icon?: React.JSX.Element
        iconColor?: string
        labelText?: string
        loading?: boolean
        type?: IconButtonType
}

export interface RenderIconButtonProps extends IconButtonProps {
        backgroundUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
        eventName?: EventName
        iconElement?: React.JSX.Element
        interactionHandlers: InteractionHandlers
}

export type IconButtonBaseProps = IconButtonProps
export interface IconButtonState {
        eventName?: EventName
}

export interface RenderIconButtonIconProps
        extends Pick<RenderIconButtonProps, 'disabled' | 'type' | 'iconColor' | 'loading' | 'id' | 'icon' | 'size'> {
        eventName?: EventName
}

export type HandleIconButtonStateChangeOptions = HandleStateEventChangeOptions
export type UseIconButtonAnimatedOptions = Pick<RenderIconButtonProps, 'disabled' | 'type'>
export interface AnimateIconButtonOptions extends Pick<UseIconButtonAnimatedOptions, 'type'> {
        animateSharedValueTo: AnimateSharedValueTo
}

export interface AnimateIconButtonSharedValues {
        borderSharedValue: SharedValue<number>
        colorSharedValue: SharedValue<number>
}
