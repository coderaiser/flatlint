export interface ITerminalOptions {
    /**
     * Whether to allow the use of proposed API. When false, any usage of APIs
     * marked as experimental/proposed will throw an error. The default is
     * false.
     */
    allowProposedApi?: boolean;

    /**
     * Whether background should support non-opaque color. It must be set before
     * executing the `Terminal.open()` method and can't be changed later without
     * executing it again. Note that enabling this can negatively impact
     * performance.
     */
    allowTransparency?: boolean;

    /**
     * If enabled, alt + click will move the prompt cursor to position
     * underneath the mouse. The default is true.
     */
    altClickMovesCursor?: boolean;

    /**
     * When enabled the cursor will be set to the beginning of the next line
     * with every new line. This is equivalent to sending `\r\n` for each `\n`.
     * Normally the settings of the underlying PTY (`termios`) deal with the
     * translation of `\n` to `\r\n` and this setting should not be used. If you
     * deal with data from a non-PTY related source, this settings might be
     * useful.
     *
     * @see https://pubs.opengroup.org/onlinepubs/007904975/basedefs/termios.h.html
     */
    convertEol?: boolean;

    /**
     * Whether the cursor blinks.
     */
    cursorBlink?: boolean;

    /**
     * The style of the cursor when the terminal is focused.
     */
    cursorStyle?: 'block' | 'underline' | 'bar';

    /**
     * The width of the cursor in CSS pixels when `cursorStyle` is set to 'bar'.
     */
    cursorWidth?: number;

    /**
     * The style of the cursor when the terminal is not focused.
     */
    cursorInactiveStyle?: 'outline' | 'block' | 'bar' | 'underline' | 'none';

    /**
     * Whether to draw custom glyphs for block element and box drawing
     * characters instead of using the font. This should typically result in
     * better rendering with continuous lines, even when line height and letter
     * spacing is used. Note that this doesn't work with the DOM renderer which
     * renders all characters using the font. The default is true.
     */
    customGlyphs?: boolean;

    /**
     * Whether input should be disabled.
     */
    disableStdin?: boolean;

    /**
     * A {@link Document} to use instead of the one that xterm.js was attached
     * to. The purpose of this is to improve support in multi-window
     * applications where HTML elements may be references across multiple
     * windows which can cause problems with `instanceof`.
     *
     * The type is `any` because using `Document` can cause TS to have
     * performance/compiler problems.
     */
    documentOverride?: any | null;

    /**
     * Whether to draw bold text in bright colors. The default is true.
     */
    drawBoldTextInBrightColors?: boolean;

    /**
     * The modifier key hold to multiply scroll speed.
     * @deprecated This option is no longer available and will always use alt.
     * Setting this will be ignored.
     */
    fastScrollModifier?: 'none' | 'alt' | 'ctrl' | 'shift';

    /**
     * The scroll speed multiplier used for fast scrolling when `Alt` is held.
     */
    fastScrollSensitivity?: number;

    /**
     * The font size used to render text.
     */
    fontSize?: number;

    /**
     * The font family used to render text.
     */
    fontFamily?: string;

    /**
     * The font weight used to render non-bold text.
     */
    fontWeight?: FontWeight;

    /**
     * The font weight used to render bold text.
     */
    fontWeightBold?: FontWeight;

    /**
     * Whether to ignore the bracketed paste mode. When true, this will always
     * paste without the `\x1b[200~` and `\x1b[201~` sequences, even when the
     * shell enables bracketed mode.
     */
    ignoreBracketedPasteMode?: boolean;

    /**
     * The spacing in whole pixels between characters.
     */
    letterSpacing?: number;

    /**
     * The line height used to render text.
     */
    lineHeight?: number;

    /**
     * The handler for OSC 8 hyperlinks. Links will use the `confirm` browser
     * API with a strongly worded warning if no link handler is set.
     *
     * When setting this, consider the security of users opening these links,
     * at a minimum there should be a tooltip or a prompt when hovering or
     * activating the link respectively. An example of what might be possible is
     * a terminal app writing link in the form `javascript:...` that runs some
     * javascript, a safe approach to prevent that is to validate the link
     * starts with http(s)://.
     */
    linkHandler?: ILinkHandler | null;

    /**
     * What log level to use, this will log for all levels below and including
     * what is set:
     *
     * 1. trace
     * 2. debug
     * 3. info (default)
     * 4. warn
     * 5. error
     * 6. off
     */
    logLevel?: LogLevel;

    /**
     * A logger to use instead of `console`.
     */
    logger?: ILogger | null;

    /**
     * Whether to treat option as the meta key.
     */
    macOptionIsMeta?: boolean;

    /**
     * Whether holding a modifier key will force normal selection behavior,
     * regardless of whether the terminal is in mouse events mode. This will
     * also prevent mouse events from being emitted by the terminal. For
     * example, this allows you to use xterm.js' regular selection inside tmux
     * with mouse mode enabled.
     */
    macOptionClickForcesSelection?: boolean;

    /**
     * The minimum contrast ratio for text in the terminal, setting this will
     * change the foreground color dynamically depending on whether the contrast
     * ratio is met. Example values:
     *
     * - 1: The default, do nothing.
     * - 4.5: Minimum for WCAG AA compliance.
     * - 7: Minimum for WCAG AAA compliance.
     * - 21: White on black or black on white.
     */
    minimumContrastRatio?: number;

    /**
     * Whether to reflow the line containing the cursor when the terminal is
     * resized. Defaults to false, because shells usually handle this
     * themselves.
     */
    reflowCursorLine?: boolean;
}