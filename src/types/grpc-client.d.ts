import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import { AuthResponseWithUser, Empty, Sessions } from '@proto/auth/auth';

declare module '@proto/auth/auth' {
  interface AuthServiceClient {
    refresh(request: Empty, meta: Metadata): Observable<AuthResponseWithUser>;
    logout(request: Empty, meta: Metadata): Observable<Empty>;
    getSessions(request: Empty, meta: Metadata): Observable<Sessions>;
  }
}
