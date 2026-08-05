import {useEffect} from 'react'
import type {Updater} from 'use-immer'

export const useClearComponentEvent = <T = Record<string, unknown>>(setState: Updater<T>) => {
    useEffect(
        () => () => {
            setState(draft => {
                Object.entries({...draft} as Record<string, unknown>).forEach(([key, value]) => {
                    if (typeof value === 'function') {
                        ;(draft as Record<string, unknown>)[key] = undefined
                    }
                })
            })
        },
        [setState]
    )
}
