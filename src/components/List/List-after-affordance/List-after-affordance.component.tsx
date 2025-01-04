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
        id,
        onCancel,
        onConfirm,
        primaryButtonProps,
        secondaryButtonProps,
        testID,
        theme,
        visible,
        ...containerProps
}: RenderListAfterAffordanceProps) => {
        const fill = theme.token.scheme.onPrimary

        return (
                <Container
                        {...containerProps}
                        pointerEvents={visible ? 'auto' : 'none'}
                        testID={testID ?? `listAfterAffordance--${id}`}
                >
                        <ListAffordanceButton
                                {...(doubleConfirmed && {
                                        icon: (
                                                <Icon
                                                        fill={fill}
                                                        iconStyle='sharp'
                                                        name='check'
                                                        testID={`listAfterAffordance__icon--${id}`}
                                                        type='outlined'
                                                />
                                        )
                                })}
                                {...{labelText: 'Confirm', ...primaryButtonProps}}
                                onPressOut={onConfirm}
                                testID={`listAfterAffordance__confirmButton--${id}`}
                                visible={visible}
                        />

                        <ListAffordanceButton
                                {...(doubleConfirmed && {
                                        icon: (
                                                <Icon
                                                        fill={fill}
                                                        iconStyle='sharp'
                                                        name='close'
                                                        testID={`listAfterAffordance__icon--${id}`}
                                                        type='outlined'
                                                />
                                        )
                                })}
                                {...{labelText: 'Cancel', ...secondaryButtonProps}}
                                onPressOut={onCancel}
                                testID={`listAfterAffordance__cancelButton--${id}`}
                                visible={visible}
                        />

                        <AnimatedDanger
                                pointerEvents='none'
                                style={[dangerAnimatedStyle]}
                                testID={`listAfterAffordance__danger--${id}`}
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
