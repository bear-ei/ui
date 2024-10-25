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
        Main,
        Trailing
} from './Chip.styles'

const AnimatedContentUnderlay = Animated.createAnimatedComponent(ContentUnderlay)
const AnimatedIconContainer = Animated.createAnimatedComponent(IconContainer)
const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const render = ({
        active,
        activeColor,
        avatar,
        close,
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
        trailing,
        type = 'assist',
        underlayColor,
        ...contentProps
}: RenderChipProps) => {
        const inputFilledShape = 'extraSmall'
        const commonShape = avatar ? 'full' : 'small'
        const shape = type === 'inputFilled' ? inputFilledShape : commonShape
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
                :       undefined

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
                                        shape={shape}
                                        testID={`chip__content--${id}`}
                                        type={type}
                                >
                                        <Main
                                                avatarShow={!!avatar}
                                                leadingIconShow={!!leadingIcon}
                                                testID={`chip__main--${id}`}
                                                trailingIconShow={!!trailing}
                                                type={type}
                                        >
                                                {leadingIcon &&
                                                        !avatar &&
                                                        (type === 'filter' ?
                                                                <AnimatedIconContainer
                                                                        testID={`chip__iconContainer--${id}`}
                                                                        style={[filterIconContainerAnimatedStyle]}
                                                                >
                                                                        <FilterIcon testID={`chip__filterIcon--${id}`}>
                                                                                {leadingIcon}
                                                                        </FilterIcon>
                                                                </AnimatedIconContainer>
                                                        :       <IconContainer testID={`chip__iconContainer--${id}`}>
                                                                        {leadingIcon}
                                                                </IconContainer>)}

                                                {avatar && (
                                                        <AvatarContainer testID={`chip__avatarContainer--${id}`}>
                                                                {avatar}
                                                        </AvatarContainer>
                                                )}

                                                <AnimatedLabelText
                                                        ellipsizeMode='tail'
                                                        numberOfLines={1}
                                                        size={type === 'inputFilled' ? 'small' : 'large'}
                                                        style={[labelTextAnimatedStyle]}
                                                        testID={`chip__labelText--${id}`}
                                                        type='label'
                                                >
                                                        {labelText}
                                                </AnimatedLabelText>

                                                {trailing &&
                                                        (close ?
                                                                <Trailing
                                                                        testID={`chip__trailing--${id}`}
                                                                        type={type}
                                                                >
                                                                        {trailing}
                                                                </Trailing>
                                                        :       <IconContainer testID={`chip__iconContainer--${id}`}>
                                                                        {trailing}
                                                                </IconContainer>)}
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
