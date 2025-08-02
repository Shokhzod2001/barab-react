import { MemberType, MemberStatus, MemberShift } from "../enums/member.enum"

export interface Member {
  toObject: any
  _id: string
  memberType: MemberType
  memberStatus: MemberStatus
  memberNick: string
  memberPhone: string
  memberPassword?: string
  memberAddress?: string
  memberDesc?: string
  memberImage?: string
  memberExperience: number
  memberShift?: MemberShift
  memberPoints: number
  googleId?: string
  createdAt: Date
  updatedAt: Date
}

export interface MemberInput {
  memberType?: MemberType
  memberStatus?: MemberStatus
  memberNick: string
  memberPhone: string
  memberPassword: string
  memberAddress?: string
  memberDesc?: string
  memberImage?: string
  memberExperience?: number
  memberShift?: MemberShift
  memberPoints?: number
}

export interface LoginInput {
  memberNick: string
  memberPassword: string
}

export interface MemberUpdateInput {
  memberNick?: string
  memberPhone?: string
  memberPassword?: string
  memberAddress?: string
  memberDesc?: string
  memberImage?: string
  memberExperience?: number
  memberShift?: MemberShift
}
