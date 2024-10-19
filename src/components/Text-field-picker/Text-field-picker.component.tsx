import {FC, forwardRef} from 'react'
import {TextInput} from 'react-native'
import {Menu} from '../Menu'
import {TextField} from '../Text-field'
import {TextFieldPickerBase} from './Text-field-picker-base.component'
import {RenderTextFieldPickerProps, TextFieldPickerProps} from './Text-field-picker.interface'
import {Container} from './Text-field-picker.styles'

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
    ...textFieldProps
}: RenderTextFieldPickerProps) => (
    <Container testID={`textFieldPicker--${id}`}>
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
            <TextField
                {...onStateEvent}
                {...textFieldProps}
                content={contentElements}
                filled={menuVisible}
            />
        </Menu>
    </Container>
)

const ForwardRefTextFieldPicker = forwardRef<TextInput, TextFieldPickerProps>((props, ref) => (
    <TextFieldPickerBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const TextFieldPicker: FC<TextFieldPickerProps> = ForwardRefTextFieldPicker
