import { SortDirection } from "../../../@seedwork/domain/repository/repository-contracts";

export type SearchInputDto<Filter = string> = {
    page?: number;
    per_page?: number;
    sort?: string | null;
    sort_dir?: SortDirection | null;
    filter?: Filter | null;
};

// SearchInputDto params copied from type SearchProps<Filter = string>
// strategy: use it! - but does not depend on it?!
// issue: maintenance if something changes