/**
 * Base Result Pattern for functional error handling in Clean Architecture.
 */
export class Result {
    isSuccess;
    isFailure;
    _error;
    _value;
    constructor(isSuccess, error, value) {
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this._error = error;
        this._value = value;
    }
    getValue() {
        if (!this.isSuccess) {
            throw new Error(`Cannot retrieve value from failed Result: ${JSON.stringify(this._error)}`);
        }
        return this._value;
    }
    getError() {
        if (this.isSuccess) {
            throw new Error('Cannot retrieve error from successful Result');
        }
        return this._error;
    }
    static ok(value) {
        return new Result(true, undefined, value);
    }
    static fail(error) {
        return new Result(false, error);
    }
}
//# sourceMappingURL=result.js.map