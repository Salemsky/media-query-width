import { expectType } from 'tsd';

import {
  type Fn,
  type Interpolation,
  mediaQueryWidth,
} from '..';

const bp = <const>{ a: 0, b: 1 };

mediaQueryWidth.bind(bp, 1)({ size: 2, min: 'a', max: 'b' });
mediaQueryWidth.bind({ min: bp, max: { c: 2 } })({ min: 'a', max: 'c' });

const mqw = mediaQueryWidth.bind(bp);

expectType<Fn>(mqw());
expectType<string>(mqw()``());
expectType<string>(mqw()([''])());
expectType<Interpolation<{ c: string }>>(
  mqw<{ c: string }>()`${({ c }): string => c}`({ c: 'red' }),
);
expectType<Interpolation<{ c: string }>>(
  mqw<{ c: string }>()([({ c }): string => c])({ c: 'red' }),
);

mqw()`${({ theme: { c } }): string => c}`;

declare module '..' {
  interface Theme {
    c: 'red';
  }
}