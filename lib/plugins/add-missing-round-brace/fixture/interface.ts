export interface IUnicodeHandling {
  /**
   * Register a custom Unicode version provider.
   */
   register(provider: IUnicodeVersionProvider): void;

  /**
   * Registered Unicode versions.
   */
  readonly versions: ReadonlyArray<string>;

  /**
   * Getter/setter for active Unicode version.
   */
   activeVersion: string;
}

export interface IUnicodeVersionProvider {
    /**
     * String indicating the Unicode version provided.
     */
    readonly version: string;

    /**
     * Unicode version dependent wcwidth implementation.
     */
    wcwidth(codepoint: number): 0 | 1 | 2;

    charProperties(codepoint: number, preceding: number): number;
}