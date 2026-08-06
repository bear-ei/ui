import type {PressableType, TouchableProps} from '@/components/Touchable'
import type {ComponentStatus, EventName} from '@/constants'
import type {AnimateSharedValueTo, HandleStateEventChangeOptions, InteractionHandlers} from '@/hooks'
import type {TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {NavigationRailProps} from '../Navigation-rail.interface'

export interface NavigationRailItemProps
    extends TouchableProps, Pick<NavigationRailProps, 'activeKey' | 'onActive' | 'type' | 'animatedType'> {
    dependencies?: unknown[]
    icon?: React.JSX.Element
    indexKey?: string
    labelText?: string
}

export interface RenderNavigationRailItemProps extends Omit<NavigationRailItemProps, 'indexKey'> {
    active?: boolean
    contentAnimatedStyle: AnimatedStyle<ViewStyle>
    eventName?: EventName
    iconElement?: React.JSX.Element
    interactionHandlers: InteractionHandlers
    labelTextAnimatedStyle: AnimatedStyle<TextStyle>
}

export type NavigationRailItemBaseProps = NavigationRailItemProps
export interface NavigationRailItemState {
    eventName?: EventName
    nextPressOutEvent?: () => void
    status: ComponentStatus
}

export interface HandleNavigationRailItemStateChangeOptions
    extends HandleStateEventChangeOptions, Pick<NavigationRailItemProps, 'indexKey' | 'onActive'> {
    ref: React.RefObject<PressableType | null>
}

export interface UseNavigationRailItemAnimatedOptions extends Pick<RenderNavigationRailItemProps, 'active' | 'type'> {
    defaultActive?: boolean
    status?: ComponentStatus
}

export interface AnimateNavigationRailItemOptions extends UseNavigationRailItemAnimatedOptions {
    animateSharedValueTo: AnimateSharedValueTo
}

export interface AnimateNavigationRailItemSharedValues {
    contentTranslateYSharedValue: SharedValue<number>
    labelTextSharedValue: SharedValue<number>
}
