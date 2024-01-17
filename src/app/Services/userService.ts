import UserModel from '@models/User'

export const getUsers = () => {
  return UserModel.find()
}

export const getUserById = async (id: string): Promise<User | null> => {
  return await UserModel.findOne({ id })
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await UserModel.findOne({ email })
}

export const getUserByUuid = (uuid: string) => {
  return UserModel.findOne({ id: uuid })
}

export const createUser = async (values: Record<string, any>) => {
  return await UserModel.create(values)
}

export const updateUserModel = (uuid: string, values: Record<string, any>) => {
  return UserModel.findOneAndUpdate({ uuid }, values, { new: true })
}

export const deleteUser = (id: string) => {
  return UserModel.findOneAndDelete({ _id: id })
}
