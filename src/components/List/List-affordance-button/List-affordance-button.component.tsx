import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Touchable} from '../../Touchable'
import {Underlay} from '../../Underlay'
import {ListAffordanceButtonBase} from './List-affordance-button-base.component'
import {
    ListAffordanceButtonProps,
    RenderListAffordanceButtonProps
} from './List-affordance-button.interface'
import {
    Container,
    Content,
    ContentUnderlay,
    LabelText
} from './List-affordance-button.styles'

const AnimatedContentUnderlay =
    Animated.createAnimatedComponent(ContentUnderlay)

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const render = ({
    contentUnderlayAnimatedStyle,
    disabled,
    eventName,
    icon,
    id,
    labelText,
    labelTextAnimatedStyle,
    onStateEvent,
    underlayColor
}: RenderListAffordanceButtonProps) => {
    const backgroundUnderlayElement = (
        <AnimatedContentUnderlay
            pointerEvents='none'
            style={[contentUnderlayAnimatedStyle]}
            testID={`listAffordanceButton__contentUnderlay--${id}`}
        />
    )

    return (
        <Container
            accessibilityLabel={labelText}
            accessibilityRole='button'
            disabled={disabled}
            testID={`listAffordanceButton--${id}`}
        >
            <Touchable
                {...onStateEvent}
                backgroundUnderlay={backgroundUnderlayElement}
                disabled={disabled}
                underlayColor={underlayColor}
            >
                <Content
                    testID={`listAffordanceButton__content--${id}`}
                    pointerEvents='none'
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
                    />
                </Content>
            </Touchable>
        </Container>
    )
}

const ForwardRefListAffordanceButton = forwardRef<
    View,
    ListAffordanceButtonProps
>((props, ref) => (
    <ListAffordanceButtonBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const ListAffordanceButton: FC<ListAffordanceButtonProps> =
    ForwardRefListAffordanceButton
