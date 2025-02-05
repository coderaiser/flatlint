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
  
  export interface ILogger {
      /**
       * Log a trace message, this will only be called if
       * {@link ITerminalOptions.logLevel} is set to trace.
       */
      trace(message: string, ...args: any[]): void;
      /**
       * Log a debug message, this will only be called if
       * {@link ITerminalOptions.logLevel} is set to debug or below.
       */
      debug(message: string, ...args: any[]): void;
      /**
       * Log a debug message, this will only be called if
       * {@link ITerminalOptions.logLevel} is set to info or below.
       */
      info(message: string, ...args: any[]): void;
      /**
       * Log a debug message, this will only be called if
       * {@link ITerminalOptions.logLevel} is set to warn or below.
       */
      warn(message: string, ...args: any[]): void;
      /**
       * Log a debug message, this will only be called if
       * {@link ITerminalOptions.logLevel} is set to error or below.
       */
      error(message: string | Error, ...args: any[]): void;
  }
