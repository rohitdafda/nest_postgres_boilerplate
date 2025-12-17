export type NormalObjT = Record<string, any>;

export interface ApiResponse<T = any> {
  statusCode: number;
  status: boolean;
  data: T | null;
  message: string;
}

export interface HttpSuccessResponse<T> {
  readonly data: T;
}

export interface HttpSuccessResponse<T> {
  readonly data: T;
}

export interface FailResponse {
  readonly message: string;
  readonly code: number;
}

export interface HttpFailResponse {
  readonly error: FailResponse;
}

export interface FileObjT {
  fileKey: string;
  url: string;
}

export type FileObjArrT = FileObjT[];
