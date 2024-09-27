import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {StepItem} from './Step-item'
import {
    HandleStepActiveOptions,
    InitialStepState,
    RenderStepItemOptions,
    StepBaseProps,
    StepData
} from './Step.interface'
import {ItemContainer, Line} from './Step.style'

const handleStepActive = ({onActive}: HandleStepActiveOptions = {}) => {
    const createNextActiveEvent = (value?: string) => () => onActive?.(value)

    return (setState: Updater<InitialStepState>) => (value?: string) => {
        setState(draft => {
            const prevStepActiveKey = draft.stepActiveKey

            draft.stepActiveKey = value
            prevStepActiveKey !== draft.stepActiveKey && (draft.nextActiveEvent = createNextActiveEvent(value))
        })
    }
}

const renderStepItems =
    ({id, ...renderStepItemOptions}: RenderStepItemOptions) =>
    (data?: StepData[]) =>
        data?.map(({indexKey, disabled, finished, ...props}, index) =>
            index === 0 ?
                <StepItem
                    {...props}
                    {...renderStepItemOptions}
                    disabled={disabled}
                    extraData={[disabled, finished]}
                    finished={finished}
                    itemKey={indexKey ?? index.toString()}
                    key={indexKey ?? index.toString()}
                />
            :   <ItemContainer
                    key={indexKey ?? index.toString()}
                    testID={`step__itemContainer--${id}`}
                >
                    <Line
                        shape='full'
                        testID={`step__line--${id}`}
                    />

                    <StepItem
                        {...props}
                        {...renderStepItemOptions}
                        disabled={disabled}
                        extraData={[disabled, finished]}
                        finished={finished}
                        itemKey={indexKey ?? index.toString()}
                    />
                </ItemContainer>
        )

export const StepBase = forwardRef<View, StepBaseProps>(
    ({activeKey, data, defaultActiveKey, onActive, render, type, densityScale, ...renderProps}, ref) => {
        const [{stepActiveKey, nextActiveEvent}, setState] = useImmer<InitialStepState>({
            nextActiveEvent: undefined,
            stepActiveKey: undefined
        })

        const id = useId()
        const onStepActive = handleStepActive({onActive, activeKey: stepActiveKey})(setState)
        const onStepActiveSource = useMemo(() => handleStepActive()(setState), [setState])
        const stepItemElements = renderStepItems({
            activeKey: stepActiveKey,
            densityScale,
            id,
            onActive: onStepActive,
            type
        })(data)

        useEffect(() => {
            onStepActiveSource(activeKey ?? defaultActiveKey)
        }, [activeKey, defaultActiveKey, onStepActiveSource])

        useEffect(() => {
            nextActiveEvent?.()
        }, [nextActiveEvent])

        if (typeof defaultActiveKey === 'string' && !stepActiveKey) {
            return <></>
        }

        return render({
            ...renderProps,
            activeKey: stepActiveKey,
            id,
            ref,
            stepItemElements
        })
    }
)
