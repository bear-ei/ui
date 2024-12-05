import {FC, forwardRef} from 'react'
import {TextInput as RNTextInput} from 'react-native'
import {Menu} from '../Menu'
import {TextInput} from '../Text-input'
import {TextInputPickerBase} from './Text-input-picker-base.component'
import {RenderTextInputPickerProps, TextInputPickerProps} from './Text-input-picker.interface'
import {Container} from './Text-input-picker.styles'

const render = ({
        activeKey,
        activeKeys,
        contentElements,
        data,
        id,
        keyCode,
        menuVisible,
        multiple,
        onActive,
        onActives,
        onMenuVisible,
        onStateEvent,
        testID,
        ...textFieldProps
}: RenderTextInputPickerProps) => (
        <Container testID={testID ?? `textFieldPicker--${id}`}>
                <Menu
                        activeKey={activeKey}
                        activeKeys={activeKeys}
                        data={data}
                        keyCode={keyCode}
                        multiple={multiple}
                        onActive={onActive}
                        onActives={onActives}
                        onVisible={onMenuVisible}
                        triggerEvent='focus'
                >
                        <TextInput
                                {...onStateEvent}
                                {...textFieldProps}
                                content={contentElements}
                                filled={menuVisible}
                        />
                </Menu>
        </Container>
)

const ForwardRefTextInputPicker = forwardRef<RNTextInput, TextInputPickerProps>((props, ref) => (
        <TextInputPickerBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const TextInputPicker: FC<TextInputPickerProps> = ForwardRefTextInputPicker
