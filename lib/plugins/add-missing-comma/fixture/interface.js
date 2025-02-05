export interface ITerminalOptions {
    /**
     * Whether to allow the use of proposed API. When false, any usage of APIs
     * marked as experimental/proposed will throw an error. The default is
     * false.
     */
    allowProposedApi ? : boolean;
}