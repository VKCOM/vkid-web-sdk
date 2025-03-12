interface ApiError {
  error_code: number;
  error_msg: string;
}
interface ApiResponse<T> {
  response?: T;
  error?: ApiError;
}

interface AccountGetProfileShortInfo {
  is_service_account: boolean;
  id: number;
}

export type AccountGetProfileShortInfoResponse = ApiResponse<AccountGetProfileShortInfo>;

export interface GroupsGetById {
  groups: Array<{
    name: string;
    description: string;
    photo_100: string;
    members_count: number;
    is_closed: boolean;
    is_member?: boolean;
    deactivated?: string;
    verified: boolean;
    id: number;
  }>;
}

export interface GroupsGetMembersById {
  items: Array<{
    photo_50: string;
    id: number;
  }>;
  count: number;
}

export interface GetGroupInfoResponse
  extends ApiResponse<[GroupsGetById | false, GroupsGetMembersById | false, GroupsGetMembersById | false]> {
  execute_errors?: Array<ApiError & {
    method: string;
  }>;
}

export type GroupsJoinResponse = ApiResponse<1>;
