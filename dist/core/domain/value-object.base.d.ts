/**
 * Base ValueObject class for immutable value objects.
 */
export declare abstract class ValueObject<T> {
    protected readonly props: T;
    constructor(props: T);
    equals(vo?: ValueObject<T>): boolean;
}
