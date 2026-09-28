/**
 * Generic Use Case interface in Clean Architecture Application layer.
 */
export interface IUseCase<TRequest, TResponse> {
    execute(request?: TRequest): Promise<TResponse> | TResponse;
}
