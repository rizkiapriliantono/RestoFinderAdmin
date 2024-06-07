import { PagingInfo } from 'app/modules/vendor-management/interface/paging_info';

export interface PaginatedData {
  [key: string]: {
    data: any[];
    pagingInfo: PagingInfo;
  };
}
