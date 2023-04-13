import type { NextApiRequest, NextApiResponse } from 'next'


export default function GET(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json('hello')
  return
}
