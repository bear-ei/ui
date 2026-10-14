/**
 * Off-screen position / z-index used to hide popover content
 * before its layout is measured.
 *
 * The content must stay in the layout tree for `measureInWindow` to
 * read its size — so instead of `display: none`, we move it far off-screen.
 */
export const OFF_SCREEN_LAYOUT = {
	position: -16384,
	zIndex: -4096
} as const
