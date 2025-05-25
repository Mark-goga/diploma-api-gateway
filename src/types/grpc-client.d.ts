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

declare module '@proto/review/review' {
  interface ReviewServiceClient {
    createReview(request: CreateReviewDto, meta: Metadata): Observable<Review>;

    findManyReviews(request: FindManyDto, meta: Metadata): Observable<Reviews>;

    findOneReview(
      request: FindOneDocumentDto,
      meta: Metadata,
    ): Observable<Review>;

    findReviewsByFilm(
      request: FindReviewsByFilmDto,
      meta: Metadata,
    ): Observable<Reviews>;

    updateReview(request: UpdateReviewDto, meta: Metadata): Observable<Review>;
    removeReview(
      request: FindOneDocumentDto,
      meta: Metadata,
    ): Observable<Review>;
  }
}
