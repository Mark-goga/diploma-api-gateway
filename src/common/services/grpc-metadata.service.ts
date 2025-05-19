import { Metadata } from '@grpc/grpc-js';

export class GrpcMetadataService {
  private readonly metadata: Metadata;
  constructor() {
    this.metadata = new Metadata();
  }

  setAccessToken(token: string): void {
    this.metadata.set('authorization', `Bearer ${token}`);
  }

  setRefreshToken(token: string): void {
    this.metadata.set('refresh-token', token);
  }

  removeAccessToken(): void {
    this.metadata.remove('authorization');
  }

  removeRefreshToken(): void {
    this.metadata.remove('refresh-token');
  }

  clearTokens(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
  }

  getMetadata(): Metadata {
    return this.metadata;
  }
}
