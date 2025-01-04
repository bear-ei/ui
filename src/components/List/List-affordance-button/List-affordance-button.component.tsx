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
        id,
        labelText,
        labelTextAnimatedStyle,
        onStateEvent,
        testID,
        theme
}: RenderListAffordanceButtonProps) => {
        const underlayColor = theme.token.scheme.onPrimary
        const backgroundUnderlayElement = (
                <AnimatedBackgroundUnderlay
                        pointerEvents='none'
                        style={[backgroundUnderlayAnimatedStyle]}
                        testID={`listAffordanceButton__backgroundUnderlay--${id}`}
                />
        )

        return (
                <Container testID={testID ?? `listAffordanceButton--${id}`}>
                        <Touchable
                                {...onStateEvent}
                                backgroundUnderlay={backgroundUnderlayElement}
                                disabled={disabled}
                                underlayColor={underlayColor}
                        >
                                <Content
                                        testID={`listAffordanceButton__content--${id}`}
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
                                                        testID={`listAffordanceButton__labelText--${id}`}
                                                        type='label'
                                                >
                                                        {labelText}
                                                </AnimatedLabelText>
                                        )}

                                        <Underlay
                                                eventName={eventName}
                                                underlayColor={underlayColor}
                                                testID={`listAffordanceButton__underlay--${id}`}
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
