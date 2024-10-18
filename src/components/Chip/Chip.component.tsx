import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../Elevation'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {ChipBase} from './Chip-base.component'
import {ChipProps, RenderChipProps} from './Chip.interface'
import {
    AvatarContainer,
    Container,
    Content,
    ContentUnderlay,
    FilterIcon,
    IconContainer,
    LabelText,
    Main
} from './Chip.styles'

const AnimatedContentUnderlay = Animated.createAnimatedComponent(ContentUnderlay)
const AnimatedIconContainer = Animated.createAnimatedComponent(IconContainer)
const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const render = ({
    active,
    activeColor,
    avatar,
    contentUnderlayAnimatedStyle,
    disabled,
    elevation,
    eventName,
    filterIconContainerAnimatedStyle,
    id,
    labelText,
    labelTextAnimatedStyle,
    leadingIcon,
    loading,
    onStateEvent,
    ref,
    trailingIcon,
    type = 'assist',
    underlayColor,
    ...contentProps
}: RenderChipProps) => {
    const shape = avatar ? 'full' : 'small'
    const backgroundUnderlayElement = (
        <AnimatedContentUnderlay
            pointerEvents='none'
            shape={shape}
            style={[contentUnderlayAnimatedStyle]}
            testID={`chip__contentUnderlay--${id}`}
        />
    )

    const elevationUnderlayElement =
        elevation ?
            <Elevation
                level={elevation}
                shape={shape}
            />
        :   undefined

    return (
        <Container
            testID={`chip--${id}`}
            type={type}
        >
            <Touchable
                {...onStateEvent}
                backgroundUnderlay={backgroundUnderlayElement}
                disabled={loading || disabled}
                elevationUnderlay={elevationUnderlayElement}
                enableFocusRing={false}
                ref={ref}
                shape={shape}
                underlayColor={underlayColor}
            >
                <Content
                    {...contentProps}
                    accessibilityLabel={labelText}
                    accessibilityRole='button'
                    pointerEvents='none'
                    shape={shape}
                    testID={`chip__content--${id}`}
                    type={type}
                >
                    <Main
                        avatarShow={!!avatar}
                        leadingIconShow={!!leadingIcon}
                        testID={`chip__main--${id}`}
                        trailingIconShow={!!trailingIcon}
                        type={type}
                    >
                        {leadingIcon &&
                            (type === 'filter' ?
                                <AnimatedIconContainer
                                    testID={`chip__iconContainer--${id}`}
                                    style={[filterIconContainerAnimatedStyle]}
                                >
                                    <FilterIcon testID={`chip__filterIcon--${id}`}>{leadingIcon}</FilterIcon>
                                </AnimatedIconContainer>
                            :   <IconContainer testID={`chip__iconContainer--${id}`}>{leadingIcon}</IconContainer>)}

                        {avatar && <AvatarContainer testID={`chip__avatarContainer--${id}`}>{avatar}</AvatarContainer>}

                        <AnimatedLabelText
                            ellipsizeMode='tail'
                            numberOfLines={1}
                            size='large'
                            style={[labelTextAnimatedStyle]}
                            testID={`chip__labelText--${id}`}
                            type='label'
                        >
                            {labelText}
                        </AnimatedLabelText>

                        {trailingIcon && (
                            <IconContainer testID={`chip__iconContainer--${id}`}>{trailingIcon}</IconContainer>
                        )}
                    </Main>

                    <Underlay
                        active={active}
                        activeAnimatedType='scaleX'
                        activeColor={activeColor}
                        eventName={eventName}
                        shape={shape}
                        underlayColor={underlayColor}
                    />
                </Content>
            </Touchable>
        </Container>
    )
}

const ForwardRefChip = forwardRef<View, ChipProps>((props, ref) => (
    <ChipBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const Chip: FC<ChipProps> = ForwardRefChip
