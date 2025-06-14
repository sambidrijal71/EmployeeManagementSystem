export interface BackendError {
  type?: string;
  title: string;
  status: number;
  errors?: Record<string, string[]>;
  detail?: string;
  path?: string;
  traceId?: string;
}
