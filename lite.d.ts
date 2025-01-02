type Breakpoints<obj extends Record<string, number>> =
  | keyof obj
  | Readonly<obj>;

type Params<
  font_size extends number,
  min_obj extends Record<string, number>,
  max_obj extends Record<string, number>,
> = Omit<
  {
    size?: font_size | undefined;
    min?: number | Breakpoints<min_obj> | undefined;
    max?: number | Breakpoints<max_obj> | undefined;
  },
  'size'
> & {
  size?: number | undefined;
} extends infer u
  ? u
  : never;

declare const mediaQueryWidth: {
  bind<obj extends Record<string, number>, size extends number = 16>(
    ctx: Readonly<obj>,
    font_size?: size,
  ): (params: Params<size, obj, obj>) => string;
  bind<
    min_obj extends Record<string, number>,
    max_obj extends Record<string, number>,
    size extends number = 16,
  >(
    ctx:
      | {
          min: Readonly<min_obj>;
          max: Readonly<max_obj>;
        }
      | Readonly<min_obj | max_obj>,
    font_size?: size,
  ): (params: Params<size, min_obj, max_obj>) => string;
};

export { mediaQueryWidth, Params };
