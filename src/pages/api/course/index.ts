import { NextApiRequest, NextApiResponse } from "next";
import Cors from 'cors'
import { httpGet } from "@/libs/http";

const cors = Cors({
  methods: ['GET'],
})

const runMiddleware = async (
  req: NextApiRequest, res: NextApiResponse, fn: (req: any, res: any, next: (err?: any) => any) => void
) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req: NextApiRequest, res: NextApiResponse
) {
  await runMiddleware(req, res, cors)

  try {
    const response = await httpGet('/course')

    const { data } = response

    res.send({
      ...data
    })
  } catch (e) {
    console.error(e)
  } finally {
  }
}