import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	html,
	body,
	#root {
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		display: flex;
		flex-direction: column;
		height: 100%;
		margin: 0;
		overscroll-behavior: none;
		padding: 0;
		text-rendering: optimizeLegibility;
		width: 100%;
	}

	body {
		background-color: #ffffff;
		color: #1a1a1a;
		font-size: 16px;
		line-height: 1.5;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
			'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
	}

	input,
	button,
	textarea,
	select {
		background: none;
		border: none;
		color: inherit;
		font: inherit;
		margin: 0;
		outline: none;
		padding: 0;
	}

	button {
		cursor: pointer;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	img {
		display: block;
		height: auto;
		max-width: 100%;
	}
`
