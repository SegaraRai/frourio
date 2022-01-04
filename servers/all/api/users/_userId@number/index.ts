import { UserInfo, UserInfoPatchWrapper } from 'validators'

export type Methods = {
  get: {
    resBody: UserInfo
  }

  patch: {
    reqBody: UserInfoPatchWrapper['!payload']
  }
}
