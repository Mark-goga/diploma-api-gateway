import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import {
  AuthResponseWithUser,
  Empty,
  RemoveSessionsDto,
  Sessions,
} from '@proto/auth/auth';

declare module '@proto/auth/auth' {
  interface AuthServiceClient {
    refresh(request: Empty, meta: Metadata): Observable<AuthResponseWithUser>;
    logout(request: Empty, meta: Metadata): Observable<Empty>;
    getSessions(request: Empty, meta: Metadata): Observable<Sessions>;
    removeSessions(
      request: RemoveSessionsDto,
      meta: Metadata,
    ): Observable<Empty>;
  }
}
declare module '@proto/films/films' {
  interface FilmServiceClient {
    createFilm(request: CreateFilmDto, meta: Metadata): Observable<Film>;
    update(request: UpdateFilmDto, meta: Metadata): Observable<Film>;
    remove(request: FindOneDocumentDto, meta: Metadata): Observable<Empty>;
  }
}
