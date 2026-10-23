import {useMemo, type FC} from 'react'

import type {RenderLayoutProps} from './Layout.interface'

import {LAYOUT} from '../../constants'
import {useTheme} from '../../hooks'
import {DURATION, EASING} from '../../theme'
import {LayoutAnimated} from '../Layout-animated'

export const RenderLayout: FC<RenderLayoutProps> = ({
	children,
	className,
	id,
	layoutType,
	testID,
	...containerProps
}) => {
	const {token} = useTheme()
	const {classesName} = token.classes
	const {entry, exit} = useMemo(
		() => ({
			entry: {duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE},
			exit: {duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}
		}),
		[]
	)

	return (
		<LayoutAnimated
			{...containerProps}
			className={classesName('flex flex-1 self-stretch bg-[--color-surface-container]', className, {
				['flex-col']: layoutType === LAYOUT.VERTICAL,
				['flex-row']: layoutType === LAYOUT.HORIZONTAL
			})}
			entry={entry}
			exit={exit}
			testID={testID ?? `layout--${id}`}
		>
			{children}
		</LayoutAnimated>
	)
}


