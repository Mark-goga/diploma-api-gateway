import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

export function callGrpcWithMetadata<T, R>(
  grpcMethod: (req: T) => Observable<R>,
  request: T,
  metadata?: Metadata,
): Observable<R> {
  return (grpcMethod as any)(request, metadata);
}
