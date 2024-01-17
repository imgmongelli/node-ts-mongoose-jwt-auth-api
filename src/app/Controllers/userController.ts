import type express from 'express'
import { getUserById } from '@services/userService'
import Exception from '@exceptions/baseException'

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    if (req.userData === null || req.userData === undefined) {
      return res.status(400).json({ message: 'user not authenticate' })
    }

    const userLogged: User | null = await getUserById(req.userData.id)
    if (userLogged === null) {
      return res.status(404).json({ message: 'user not found' })
    }
    console.log(userLogged)
    res.status(200).json({ data: userLogged })
  } catch (error) {
    console.log(error)
    return new Exception('somthing went wrong', 400)
  }
}
