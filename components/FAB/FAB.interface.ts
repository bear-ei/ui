import {ComponentStatus, EventName} from '@/constants'
import {HandleStateEventChangeOptions, InteractionHandlers} from '@/hooks'
import {Size} from '@bearei/theme-token'
import type {TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {ElevationLevel} from '../Elevation'
import type {TouchableProps} from '../Touchable'
import type {FAB_TYPE} from './FAB.enum'

export type FABType = (typeof FAB_TYPE)[keyof typeof FAB_TYPE]
export interface FABProps extends TouchableProps {
        disabled?: boolean
        elevated?: boolean
        extended?: boolean
        icon?: React.JSX.Element
        labelText?: string
        loading?: boolean
        size?: Size
        type?: FABType
}

export interface RenderFABProps extends FABProps {
        backgroundUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
        elevation?: ElevationLevel
        eventName?: EventName
        iconElement?: React.JSX.Element
        interactionHandlers: InteractionHandlers
        labelTextAnimatedStyle: AnimatedStyle<TextStyle>
}

export type FABBaseProps = FABProps
export interface FABState {
        elevation?: ElevationLevel
        eventName?: EventName
        status: ComponentStatus
}

export type HandleFABStateChangeOptions = HandleStateEventChangeOptions & Pick<RenderFABProps, 'elevated'>
export type RenderFABIconProps = Pick<RenderFABProps, 'size' | 'disabled' | 'type' | 'id' | 'icon' | 'extended'>
export type UseFABAnimatedOptions = Pick<RenderFABProps, 'disabled' | 'type'>
