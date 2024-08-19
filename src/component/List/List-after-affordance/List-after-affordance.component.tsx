import {forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Icon} from '../../Icon'
import {ListAffordanceButton} from '../List-affordance-button'
import {ListAfterAffordanceBase} from './List-after-affordance-base.component'
import {ListAfterAffordanceProps, RenderListAfterAffordanceProps} from './List-after-affordance.interface'
import {Container, Danger} from './List-after-affordance.style'

const AnimatedDanger = Animated.createAnimatedComponent(Danger)
const render = ({
    dangerAnimatedStyle,
    doubleConfirmed,
    fill,
    id,
    onCancel,
    onConfirm,
    primaryButtonProps,
    secondaryButtonProps,
    ...containerProps
}: RenderListAfterAffordanceProps) => (
    <Container
        {...containerProps}
        testID={`listAfterAffordance--${id}`}
    >
        <ListAffordanceButton
            {...(doubleConfirmed && {
                icon: (
                    <Icon
                        fill={fill}
                        name='check'
                    />
                )
            })}
            {...{labelText: 'Confirm', ...primaryButtonProps}}
            onPressOut={onConfirm}
        />

        <ListAffordanceButton
            {...(doubleConfirmed && {
                icon: (
                    <Icon
                        fill={fill}
                        name='close'
                    />
                )
            })}
            {...{labelText: 'Cancel', ...secondaryButtonProps}}
            onPressOut={onCancel}
        />

        <AnimatedDanger
            disabled={secondaryButtonProps?.loading || secondaryButtonProps?.disabled}
            pointerEvents='none'
            style={[dangerAnimatedStyle]}
            testID={`listAfterAffordance__danger--${id}`}
        />
    </Container>
)

export const ForwardRefListAfterAffordance = forwardRef<View, ListAfterAffordanceProps>((props, ref) => (
    <ListAfterAffordanceBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const ListAfterAffordance = ForwardRefListAfterAffordance
