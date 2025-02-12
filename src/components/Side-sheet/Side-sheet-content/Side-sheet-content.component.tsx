import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Button} from '../../Button'
import {Divider} from '../../Divider'
import {SideSheetContentBase} from './Side-sheet-content-base.component'
import {RenderSideSheetContentProps, SideSheetContentProps} from './Side-sheet-content.interface'
import {
        Container,
        Content,
        Footer,
        FooterLayout,
        FooterLayoutAnimated,
        Header,
        HeaderText,
        HeadlineLayout,
        Leading,
        Main,
        PrimaryButton,
        SecondaryButton,
        Trailing
} from './Side-sheet-content.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)

/**
 * TODO: Add visible animation for modal layer types.
 */
const render = ({
        containerAnimatedStyle,
        content,
        footerVisible,
        headlineText,
        id,
        leading,
        onCancel,
        onConfirm,
        primaryButton,
        primaryButtonProps,
        secondaryButton,
        secondaryButtonProps,
        shape,
        sheetPosition,
        style,
        testID,
        theme,
        trailing,
        type,
        ...innerProps
}: RenderSideSheetContentProps) => {
        const footerLayoutAnimatedContentStyle = {minHeight: theme.adaptFontSize(theme.token.spacing.extraSmall * 20)}
        const sheetShape = shape ?? (sheetPosition === 'horizontalStart' ? 'largeEnd' : 'largeStart')

        return (
                <AnimatedContainer
                        sheetPosition={sheetPosition}
                        style={[containerAnimatedStyle]}
                        testID={testID ?? `sideSheetContent--${id}}`}
                        type={type}
                >
                        <Content
                                {...innerProps}
                                accessibilityRole='alert'
                                shape={sheetShape}
                                style={[style]}
                                testID={`sideSheetContent__content--${id}}`}
                                type={type}
                        >
                                <Header
                                        leadingShow={!!leading}
                                        testID={`sideSheetContent__header--${id}}`}
                                        trailingShow={!!trailing}
                                >
                                        {leading && (
                                                <Leading testID={`sideSheetContent__leading--${id}}`}>
                                                        {leading}
                                                </Leading>
                                        )}

                                        <HeadlineLayout testID={`sideSheetContent__headlineLayout--${id}}`}>
                                                <HeaderText
                                                        numberOfLines={1}
                                                        size='large'
                                                        testID={`sideSheetContent__headerText--${id}}`}
                                                        type='title'
                                                >
                                                        {headlineText}
                                                </HeaderText>
                                        </HeadlineLayout>

                                        {trailing && (
                                                <Trailing testID={`sideSheetContent__trailing--${id}}`}>
                                                        {trailing}
                                                </Trailing>
                                        )}
                                </Header>

                                <Main testID={`sideSheetContent__main--${id}}`}>{content}</Main>
                                <FooterLayoutAnimated
                                        animatedType='collapseY'
                                        contentStyle={footerLayoutAnimatedContentStyle}
                                        entry={{duration: 'medium3', easing: 'emphasizedDecelerate'}}
                                        exit={{duration: 'short3', easing: 'emphasizedAccelerate'}}
                                        testID={`sideSheetContent__footerLayoutAnimated--${id}}`}
                                        visible={footerVisible}
                                >
                                        <FooterLayout testID={`sideSheetContent__footerLayout--${id}}`}>
                                                <Divider
                                                        size='large'
                                                        testID={`sideSheetContent__divider--${id}}`}
                                                />

                                                <Footer
                                                        type={type}
                                                        testID={`sideSheetContent__footer--${id}}`}
                                                >
                                                        <PrimaryButton
                                                                testID={`sideSheetContent__primaryButton--${id}}`}
                                                        >
                                                                {primaryButton ?? (
                                                                        <Button
                                                                                {...{
                                                                                        labelText: 'Confirm',
                                                                                        ...primaryButtonProps
                                                                                }}
                                                                                onPressOut={onConfirm}
                                                                                testID={`sideSheetContent__confirmButton--${id}}`}
                                                                                type='filled'
                                                                        />
                                                                )}
                                                        </PrimaryButton>

                                                        <SecondaryButton
                                                                testID={`sideSheetContent__secondaryButton--${id}}`}
                                                        >
                                                                {secondaryButton ?? (
                                                                        <Button
                                                                                {...{
                                                                                        labelText: 'Cancel',
                                                                                        ...secondaryButtonProps
                                                                                }}
                                                                                onPressOut={onCancel}
                                                                                testID={`sideSheetContent__cancelButton--${id}}`}
                                                                                type='outlined'
                                                                        />
                                                                )}
                                                        </SecondaryButton>
                                                </Footer>
                                        </FooterLayout>
                                </FooterLayoutAnimated>
                        </Content>
                </AnimatedContainer>
        )
}

const ForwardRefSideSheetContent = forwardRef<View, SideSheetContentProps>((props, ref) => (
        <SideSheetContentBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const SideSheetContent: FC<SideSheetContentProps> = ForwardRefSideSheetContent
