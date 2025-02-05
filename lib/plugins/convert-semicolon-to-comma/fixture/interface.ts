  /**
   * The class that represents an xterm.js terminal.
   */
  export class Terminal implements IDisposable {
      /**
       * The element containing the terminal.
       */
      readonly element: HTMLElement | undefined;

      /**
       * The textarea that accepts input for the terminal.
       */
      readonly textarea: HTMLTextAreaElement | undefined;

      /**
       * The number of rows in the terminal's viewport. Use
       * `ITerminalOptions.rows` to set this in the constructor and
       * `Terminal.resize` for when the terminal exists.
       */
      readonly rows: number;

      /**
       * The number of columns in the terminal's viewport. Use
       * `ITerminalOptions.cols` to set this in the constructor and
       * `Terminal.resize` for when the terminal exists.
       */
      readonly cols: number;

      /**
       * Access to the terminal's normal and alt buffer.
       */
      readonly buffer: IBufferNamespace;

      /**
       * (EXPERIMENTAL) Get all markers registered against the buffer. If the alt
       * buffer is active this will always return [].
       */
      readonly markers: ReadonlyArray<IMarker>;

      /**
       * Get the parser interface to register custom escape sequence handlers.
       */
      readonly parser: IParser;

      /**
       * (EXPERIMENTAL) Get the Unicode handling interface
       * to register and switch Unicode version.
       */
      readonly unicode: IUnicodeHandling;

      /**
       * Gets the terminal modes as set by SM/DECSET.
       */
      readonly modes: IModes;

      /**
       * Gets or sets the terminal options. This supports setting multiple
       * options.
       *
       * @example Get a single option
       * ```ts
       * console.log(terminal.options.fontSize);
       * ```
       *
       * @example Set a single option:
       * ```ts
       * terminal.options.fontSize = 12;
       * ```
       * Note that for options that are object, a new object must be used in order
       * to take effect as a reference comparison will be done:
       * ```ts
       * const newValue = terminal.options.theme;
       * newValue.background = '#000000';
       *
       * // This won't work
       * terminal.options.theme = newValue;
       *
       * // This will work
       * terminal.options.theme = { ...newValue };
       * ```
       *
       * @example Set multiple options
       * ```ts
       * terminal.options = {
       *   fontSize: 12,
       *   fontFamily: 'Courier New'
       * };
       * ```
       */
      options: ITerminalOptions;

      /**
       * Natural language strings that can be localized.
       */
      static strings: ILocalizableStrings;

      /**
       * Creates a new `Terminal` object.
       *
       * @param options An object containing a set of options.
       */
      constructor(options?: ITerminalOptions & ITerminalInitOnlyOptions);

      /**
       * Adds an event listener for when the bell is triggered.
       * @returns an `IDisposable` to stop listening.
       */
      onBell: IEvent<void>;

      /**
       * @param handler The function that determines character joins. It is called
       * with a string of text that is eligible for joining and returns an array
       * where each entry is an array containing the start (inclusive) and end
       * (exclusive) indexes of ranges that should be rendered as a single unit.
       * @returns The ID of the new joiner, this can be used to deregister
       */
      registerCharacterJoiner(handler: (text: string) => [number, number][]): number;

      /**
       * (EXPERIMENTAL) Deregisters the character joiner if one was registered.
       * NOTE: character joiners are only used by the webgl renderer.
       * @param joinerId The character joiner's ID (returned after register)
       */
      deregisterCharacterJoiner(joinerId: number): void;
  }