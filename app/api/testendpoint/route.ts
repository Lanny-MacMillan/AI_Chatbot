import { NextResponse } from 'next/server'
import data from '@/data.json'


export async function POST() {
  // const { params } = context;
  // console.log("PARAMS", params, context)
  // const user = data.filter(x => params.userId === x.id.toString())

  return NextResponse.json({
    data,
  })
}