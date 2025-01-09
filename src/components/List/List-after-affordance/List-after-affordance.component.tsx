import {forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Icon} from '../../Icon'
import {ListAffordanceButton} from '../List-affordance-button'
import {ListAfterAffordanceBase} from './List-after-affordance-base.component'
import {ListAfterAffordanceProps, RenderListAfterAffordanceProps} from './List-after-affordance.interface'
import {Container, Danger} from './List-after-affordance.styles'

const AnimatedDanger = Animated.createAnimatedComponent(Danger)
const render = ({
        dangerAnimatedStyle,
        doubleConfirmed,
        onCancel,
        onConfirm,
        primaryButtonProps,
        secondaryButtonProps,
        theme,
        visible,
        ...containerProps
}: RenderListAfterAffordanceProps) => {
        const fill = theme.token.scheme.onPrimary

        return (
                <Container
                        {...containerProps}
                        pointerEvents={visible ? 'auto' : 'none'}
                >
                        <ListAffordanceButton
                                {...(doubleConfirmed && {
                                        icon: (
                                                <Icon
                                                        fill={fill}
                                                        iconStyle='sharp'
                                                        name='check'
                                                        type='outlined'
                                                />
                                        )
                                })}
                                {...{labelText: 'Confirm', ...primaryButtonProps}}
                                onPressOut={onConfirm}
                                visible={visible}
                        />

                        <ListAffordanceButton
                                {...(doubleConfirmed && {
                                        icon: (
                                                <Icon
                                                        fill={fill}
                                                        iconStyle='sharp'
                                                        name='close'
                                                        type='outlined'
                                                />
                                        )
                                })}
                                {...{labelText: 'Cancel', ...secondaryButtonProps}}
                                onPressOut={onCancel}
                                visible={visible}
                        />

                        <AnimatedDanger
                                pointerEvents='none'
                                style={[dangerAnimatedStyle]}
                        />
                </Container>
        )
}

export const ForwardRefListAfterAffordance = forwardRef<View, ListAfterAffordanceProps>((props, ref) => (
        <ListAfterAffordanceBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const ListAfterAffordance = ForwardRefListAfterAffordance
