import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {StepBase} from './Step-base.component'
import {RenderStepProps, StepProps} from './Step.interface'
import {Container} from './Step.styles'

const render = ({id, stepItemElements, ...containerProps}: RenderStepProps) => (
    <Container
        {...containerProps}
        testID={`step--${id}`}
    >
        {stepItemElements}
    </Container>
)

const ForwardRefStep = forwardRef<View, StepProps>((props, ref) => (
    <StepBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const Step: FC<StepProps> = ForwardRefStep
