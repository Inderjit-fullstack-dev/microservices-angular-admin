interface Meta {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface ListResponse<T> {
  data: T[];
  meta: Meta;
}
