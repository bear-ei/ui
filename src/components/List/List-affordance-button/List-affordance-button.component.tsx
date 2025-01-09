import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Touchable} from '../../Touchable'
import {Underlay} from '../../Underlay'
import {ListAffordanceButtonBase} from './List-affordance-button-base.component'
import {ListAffordanceButtonProps, RenderListAffordanceButtonProps} from './List-affordance-button.interface'
import {BackgroundUnderlay, Container, Content, LabelText} from './List-affordance-button.styles'

const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const render = ({
        backgroundUnderlayAnimatedStyle,
        disabled,
        eventName,
        icon,
        labelText,
        labelTextAnimatedStyle,
        onStateEvent,
        theme
}: RenderListAffordanceButtonProps) => {
        const underlayColor = theme.token.scheme.onPrimary
        const backgroundUnderlayElement = (
                <AnimatedBackgroundUnderlay
                        pointerEvents='none'
                        style={[backgroundUnderlayAnimatedStyle]}
                />
        )

        return (
                <Container>
                        <Touchable
                                {...onStateEvent}
                                backgroundUnderlay={backgroundUnderlayElement}
                                disabled={disabled}
                                underlayColor={underlayColor}
                        >
                                <Content
                                        pointerEvents='none'
                                        accessibilityLabel={labelText}
                                        accessibilityRole='button'
                                >
                                        {icon ?? (
                                                <AnimatedLabelText
                                                        ellipsizeMode='tail'
                                                        numberOfLines={1}
                                                        size='large'
                                                        style={[labelTextAnimatedStyle]}
                                                        type='label'
                                                >
                                                        {labelText}
                                                </AnimatedLabelText>
                                        )}

                                        <Underlay
                                                eventName={eventName}
                                                underlayColor={underlayColor}
                                        />
                                </Content>
                        </Touchable>
                </Container>
        )
}

const ForwardRefListAffordanceButton = forwardRef<View, ListAffordanceButtonProps>((props, ref) => (
        <ListAffordanceButtonBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const ListAffordanceButton: FC<ListAffordanceButtonProps> = ForwardRefListAffordanceButton
