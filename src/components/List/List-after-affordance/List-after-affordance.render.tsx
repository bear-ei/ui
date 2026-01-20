import {LayoutAnimated} from '@/components/Layout-animated'
import {classesName} from '@/utils'
import {SIZE} from '@bearei/theme-token'
import {Check, X} from 'lucide-react-native'
import {forwardRef} from 'react'
import type {View, ViewStyle} from 'react-native'
import {ListAffordanceButton} from '../List-affordance-button'
import type {RenderListAfterAffordanceProps} from './List-after-affordance.interface'

export const RenderListAfterAffordance = forwardRef<View, RenderListAfterAffordanceProps>(
        (
                {
                        dangerAnimatedStyle,
                        doubleConfirmed,
                        id,
                        interactionHandlers,
                        onCancel,
                        onConfirm,
                        primaryButtonDisabled,
                        primaryButtonLabelText = 'Edit',
                        primaryButtonLoading,
                        primaryButtonStyle,
                        secondaryButtonDisabled,
                        secondaryButtonLabelText = 'Del',
                        secondaryButtonLoading,
                        secondaryButtonStyle,
                        size = SIZE.MEDIUM,
                        testID,
                        visible,
                        ...containerProps
                }: RenderListAfterAffordanceProps,
                ref
        ) => {
                const buttonTabIndex = visible ? 0 : -1
                const checkIconElement = <Check testID={`listAfterAffordance__listAffordanceButtonIconCheck--${id}`} />
                const closeIconElement = <X testID={`listAfterAffordance__listAffordanceButtonIconClose--${id}`} />
                const isDangerVisible = !secondaryButtonDisabled
                const listAfterAffordanceStyle = {flexDirection: 'row'} as ViewStyle

                return (
                        <LayoutAnimated
                                {...containerProps}
                                {...interactionHandlers}
                                className={classesName('relative flex w-32 self-stretch', {
                                        ['bg-[--color-primary]']: isDangerVisible
                                })}
                                entry={{duration: 0}}
                                lazy={true}
                                ref={ref}
                                style={listAfterAffordanceStyle}
                                testID={testID ?? `listAfterAffordance--${id}`}
                                visible={visible}
                        >
                                <ListAffordanceButton
                                        {...(doubleConfirmed && {icon: checkIconElement})}
                                        backgroundVisible={!isDangerVisible}
                                        disabled={primaryButtonDisabled}
                                        labelText={primaryButtonLabelText}
                                        loading={primaryButtonLoading}
                                        onPressOut={onConfirm}
                                        size={size}
                                        style={primaryButtonStyle}
                                        tabIndex={buttonTabIndex}
                                        testID={`listAfterAffordance__listAffordanceButton--confirmed--${id}`}
                                />

                                <ListAffordanceButton
                                        {...(doubleConfirmed && {icon: closeIconElement})}
                                        style={secondaryButtonStyle}
                                        backgroundVisible={false}
                                        disabled={secondaryButtonDisabled}
                                        labelText={secondaryButtonLabelText}
                                        loading={secondaryButtonLoading}
                                        onPressOut={onCancel}
                                        size={size}
                                        tabIndex={buttonTabIndex}
                                        testID={`listAfterAffordance__listAffordanceButton--close--${id}`}
                                />

                                <LayoutAnimated
                                        className='pointer-events-none absolute bottom-0 right-0 top-0 -z-10 w-1/2 bg-[--color-error]'
                                        style={[dangerAnimatedStyle]}
                                        testID={`listAfterAffordance__animatedDanger--${id}`}
                                        visible={isDangerVisible}
                                />
                        </LayoutAnimated>
                )
        }
)

RenderListAfterAffordance.displayName = 'RenderListAfterAffordance'
