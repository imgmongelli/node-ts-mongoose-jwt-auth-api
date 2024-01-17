import mongoose, { type Model } from 'mongoose'

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  password: {
    type: String,
    required: [true, 'password is required']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required']
  },
  id: {
    type: String,
    required: [true, 'uuid is required']
  },
  hourMaxWeek: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  versionKey: false
})

userSchema.set('toObject', { virtuals: true, getters: true, versionKey: false })
userSchema.set('toJSON', {
  virtuals: true,
  getters: true,
  versionKey: false,
  transform: (document, returnedObject) => {
    returnedObject.id = (returnedObject._id as unknown as string).toString()
    delete returnedObject._id
    delete returnedObject.password
  }
})

userSchema.virtual('isProfileComplete').get(function (this: User) {
  return this.lastname !== undefined && this.firstname !== undefined
})

interface UserServiceInterface extends Model<User> {
  getUsers: () => Promise<User[]>
  getUserById: (id: string) => Promise<User | null>
  getUserByEmail: (email: string) => Promise<User | null>
  getUserByUuid: (uuid: string) => Promise<User | null>
  createUser: (values: Record<string, any>) => Promise<User>
  updateUserModel: (uuid: string, values: Record<string, any>) => Promise<User | null>
  deleteUser: (id: string) => Promise<User | null>
}

const UserModel: UserServiceInterface = mongoose.model<User, UserServiceInterface>('User', userSchema)

export default UserModel
