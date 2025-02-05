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
