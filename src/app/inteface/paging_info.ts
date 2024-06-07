export interface PagingInfo {
  activePage?: number;
  pageNumber?: number;
  rowStart?: number;
  rowPerPage: number;
  rowPerPageOptions?: number[];
  rowCount?: number;
  totalRecords?: number;
}
