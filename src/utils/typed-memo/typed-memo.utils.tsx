import {memo, type ComponentProps, type ForwardRefExoticComponent} from 'react'

export const typedMemo =
        <T extends ForwardRefExoticComponent<Record<string, unknown>>>(component: T) =>
        (
                propsAreEqual?: (
                        prevProps: Readonly<ComponentProps<T>>,
                        nextProps: Readonly<ComponentProps<T>>
                ) => boolean
        ): T =>
                memo(component, propsAreEqual) as unknown as T
