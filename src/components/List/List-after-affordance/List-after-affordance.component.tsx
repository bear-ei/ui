import {forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Icon, IconName, IconStyle, IconType} from '../../Icon'
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
                                                        iconStyle={IconStyle.SHARP}
                                                        name={IconName.CHECK}
                                                        testID={`listAfterAffordance__listAffordanceButtonIconCheck--${id}`}
                                                        type={IconType.OUTLINED}
                                                />
                                        )
                                })}
                                {...{labelText: 'Confirm', ...primaryButtonProps}}
                                onPressOut={onConfirm}
                                testID={`listAfterAffordance__listAffordanceButton--${id}`}
                                visible={visible}
                        />

                        <ListAffordanceButton
                                {...(doubleConfirmed && {
                                        icon: (
                                                <Icon
                                                        fill={fill}
                                                        iconStyle={IconStyle.SHARP}
                                                        name={IconName.CLOSE}
                                                        testID={`listAfterAffordance__listAffordanceButtonIconClose--${id}`}
                                                        type={IconType.OUTLINED}
                                                />
                                        )
                                })}
                                {...{labelText: 'Cancel', ...secondaryButtonProps}}
                                onPressOut={onCancel}
                                testID={`listAfterAffordance__listAffordanceButton--${id}`}
                                visible={visible}
                        />

                        <AnimatedDanger
                                pointerEvents='none'
                                style={[dangerAnimatedStyle]}
                                testID={`listAfterAffordance__animatedDanger--${id}`}
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
