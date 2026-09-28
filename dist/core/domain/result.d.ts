/**
 * Base Result Pattern for functional error handling in Clean Architecture.
 */
export declare class Result<T, E = string> {
    readonly isSuccess: boolean;
    readonly isFailure: boolean;
    private readonly _error?;
    private readonly _value?;
    private constructor();
    getValue(): T;
    getError(): E;
    static ok<U, F = string>(value?: U): Result<U, F>;
    static fail<U, F = string>(error: F): Result<U, F>;
}
