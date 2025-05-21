import React, {forwardRef} from 'react'
import {typedMemo} from './typed-memo.utils'

describe('typedMemo', () => {
	it('should wrap a component with React.memo', () => {
		const Comp = forwardRef<HTMLDivElement, {value: string}>((props, ref) => (
			<div ref={ref}>{props.value}</div>
		))

		const MemoComp = typedMemo(Comp as any)()
		const el = <MemoComp value='test' />

		expect(React.isValidElement(el)).toBe(true)
	})

	it('should use the custom propsAreEqual if provided', () => {
		const Comp = forwardRef<HTMLDivElement, {x: number}>((props, ref) => <div ref={ref}>{props.x}</div>)
		const propsAreEqual = jest.fn((prev, next) => prev.x === next.x)
		const MemoComp = typedMemo(Comp as any)(propsAreEqual)
		const prev = {x: 1}
		const next = {x: 1}

		expect(
			(MemoComp as any).type && (MemoComp as any).compare ?
				(MemoComp as any).compare(prev, next)
			:	propsAreEqual(prev, next)
		).toBe(true)
	})
})
