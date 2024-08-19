import React, {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Underlay} from '../../Underlay'
import {StepItemBase} from './Step-item-base'
import {RenderStepItemProps, StepItemProps} from './Step-item.interface'
import {Container, Content, Header, Icon, IconContainer, Label, LabelText} from './Step-item.style'

const AnimatedLabel = Animated.createAnimatedComponent(Label)
const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const render = ({
    active,
    activeColor,
    activeIconElement,
    densityScale,
    eventName,
    finished,
    finishedIconElement,
    iconElement,
    id,
    labelAnimatedStyle,
    labelText,
    labelTextAnimatedStyle,
    onStateEvent,
    type,
    underlayColor,
    ...containerProps
}: RenderStepItemProps) => (
    <Container
        {...containerProps}
        accessibilityLabel={labelText}
        accessibilityRole='tab'
        testID={`stepItem--${id}`}
    >
        <Content
            {...onStateEvent}
            testID={`stepItem__content--${id}`}
            densityScale={densityScale}
            type={type}
        >
            <Header
                densityScale={densityScale}
                testID={`stepItem__header--${id}`}
                type={type}
            >
                <IconContainer testID={`stepItem__iconContainer--${id}`}>
                    <Icon
                        testID={`stepItem__icon--${id}`}
                        visible={finished}
                    >
                        {finishedIconElement}
                    </Icon>

                    <Icon
                        testID={`stepItem__icon--${id}`}
                        visible={!finished && !active}
                    >
                        {iconElement}
                    </Icon>

                    <Icon
                        testID={`stepItem__icon--${id}`}
                        visible={!finished && active}
                    >
                        {activeIconElement}
                    </Icon>
                </IconContainer>

                <Underlay
                    active={active}
                    activeAnimatedType={type === 'block' ? 'scale' : 'scaleX'}
                    activeColor={activeColor}
                    activeShape='full'
                    eventName={eventName}
                    shape={type === 'block' ? 'full' : 'large'}
                    underlayColor={underlayColor}
                />
            </Header>

            {type === 'segment' && labelText && (
                <AnimatedLabel
                    style={[labelAnimatedStyle]}
                    testID={`stepItem__label--${id}`}
                >
                    <AnimatedLabelText
                        active={active}
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        size='medium'
                        style={[labelTextAnimatedStyle]}
                        testID={`stepItem__labelText--${id}`}
                        type='label'
                    >
                        {labelText}
                    </AnimatedLabelText>
                </AnimatedLabel>
            )}
        </Content>
    </Container>
)

const ForwardRefStepItem = forwardRef<View, StepItemProps>((props, ref) => (
    <StepItemBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const StepItem: FC<StepItemProps> = ForwardRefStepItem
