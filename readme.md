# media-query-width

> A small utility (559b or lite 271b) for creating responsive media queries.

This utility allows you to save custom breakpoints, convert values px ​​to em, and create flexible queries that support dynamic styling. This fits when working with styled components or similar CSS-in-JS libraries.

## Install

```
$ npm install --save media-query-width
```

## Usage

Import and bind desired breakpoints.

```js
import { mediaQueryWidth } from 'media-query-width';

const BREAKPOINTS = Object.freeze({
  mobile: 375,
  phablet: 600,
});

export const mqw = mediaQueryWidth.bind(BREAKPOINTS);

/* The default size is 16. If the value is 1, the size will not be converted to em. */
const mqw = mediaQueryWidth.bind(BREAKPOINTS, 1);

/* Separate min and max range definitions. */
const mqw = mediaQueryWidth.bind({
  min: { ...BREAKPOINTS, tablet: 768 },
  max: BREAKPOINTS,
});
```

Now, can be used to create media queries based on the defined breakpoints.

```js
import { styled } from 'pkg';
import { mqw } from './breakpoints';

const Styled = styled.div`
  /* Sets a custom width. */
  ${mqw({ max: 400 })} {
    color: red;
  }
  /* Query between min and max range. */
  ${mqw({ min: 'mobile', max: 'phablet' })} {
    color: red;
  }
  /* The main size will be override. */
  ${mqw({ size: 1, min: 'mobile' })} {
    color: red;
  }
`;
```

Allows for dynamic styling by accepting styles through props, using template literals or array syntax.

```js
import { styled } from 'pkg';
import { mqw } from './breakpoints';

const fn = mqw({ min: 'mobile' })`
  color: ${({ $color }) => $color};
  ${['display: block;']}
  ${{ zIndex: 1 }}
`;

const fn = mqw({ min: 'mobile' })([
  'color: ',
  ({ $color }) => $color,
  ';',
  ['display: block;'],
  { zIndex: 1 },
]);

const Styled = styled.div`
  ${fn}
`;

<Styled $color='red' />;
```

To make TypeScript aware of theme's structure, extend the Theme interface in a declaration file.

```js
type ThemeType = (typeof import('./theme'))['theme'];

declare module 'media-query-width' {
  export interface Theme extends ThemeType {}
};
```

### Lite version

The lite version returns only the string of the media query without using template literals.

```js
import { mediaQueryWidth } from 'media-query-width/lite';
```

## License

MIT License © Salemsky
