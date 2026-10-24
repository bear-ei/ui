import {type FC} from 'react'

import type {RenderLayoutPaneProps} from './Layout-pane.interface'

import {LAYOUT} from '../../../constants'
import {useTheme} from '../../../hooks'
import {DURATION, EASING} from '../../../theme'
import {LayoutAnimated} from '../../Layout-animated'

const ENTRY_EXIT = {
	entry: {duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE},
	exit: {duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}
}

export const RenderLayoutPane: FC<RenderLayoutPaneProps> = ({
	children,
	className,
	id,
	layoutType,
	testID,
	...containerProps
}) => {
	const {token} = useTheme()
	const {classesName} = token.classes
	const {entry, exit} = ENTRY_EXIT

	return (
		<LayoutAnimated
			{...containerProps}
			className={classesName(
				'flex min-w-[--density-layout-sidebar] flex-1 self-stretch bg-[--color-surface]',
				className,
				{
					['flex-col']: layoutType === LAYOUT.VERTICAL,
					['flex-row']: layoutType === LAYOUT.HORIZONTAL
				}
			)}
			entry={entry}
			exit={exit}
			testID={testID ?? `layoutPane--${id}`}
		>
			{children}
		</LayoutAnimated>
	)
}
