import { Type } from 'class-transformer'
import {
  Allow,
  ArrayNotEmpty,
  Equals,
  IsBoolean,
  IsBooleanString,
  IsInt,
  IsNumberString,
  IsObject,
  IsOptional,
  IsPort,
  IsString,
  MaxLength,
  ValidateNested
} from 'class-validator'
import type { ReadStream } from 'fs'

export class Query {
  requiredNum: number
  optionalNum?: number
  optionalNumArr?: Array<number>

  @IsOptional()
  @IsInt()
  emptyNum?: number

  @IsInt({ each: true })
  requiredNumArr: number[]

  @IsNumberString()
  id: string

  @IsBooleanString()
  disable: string

  @IsBoolean()
  bool: boolean

  @IsOptional()
  @IsBoolean()
  optionalBool?: boolean

  @IsBoolean({ each: true })
  boolArray: boolean[]

  @IsOptional()
  @IsBoolean({ each: true })
  optionalBoolArray?: boolean[]
}

export class Body {
  @IsPort()
  port: string

  file: File | ReadStream
}

export class UserInfo {
  @IsInt()
  id: number

  @MaxLength(20)
  name: string

  @IsInt()
  age: number
}

export class UserInfoPatchName {
  @Equals('name')
  type: 'name'

  @MaxLength(20)
  name: string
}

export class UserInfoPatchAge {
  @Equals('age')
  type: 'age'

  @IsInt()
  age: number
}

export class UserInfoPatchWrapper {
  // Boolean is a dummy class, which will be used as default class when no suitable subTypes found
  // invalid types are rejected by combining this with @IsObject
  @IsObject({
    message: 'invalid type'
  })
  @ValidateNested()
  @Type(() => Boolean, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'type',
      subTypes: [
        { value: UserInfoPatchName, name: 'name' },
        { value: UserInfoPatchAge, name: 'age' }
      ]
    }
  })
  '!payload': UserInfoPatchName | UserInfoPatchAge
}

export class MultiForm {
  requiredArr: string[]
  optionalArr?: string[]

  @IsOptional()
  @IsInt({ each: true })
  empty?: number[]

  @IsString()
  name: string

  // class-transformer always tries to transform nested object, even if there are no decorators on it
  // there is no such thing like @Ignore decorator available natively ;(
  // see also. https://stackoverflow.com/q/66662904
  @Allow()
  icon: Blob

  @IsString({ each: true })
  vals: string[]

  @ArrayNotEmpty()
  files: Blob[]
}
