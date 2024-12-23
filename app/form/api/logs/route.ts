
import prisma from "@/lib/prosmadb"
import { Prisma } from "@prisma/client"
import { NextResponse } from "next/server"

export
  async function POST(
    request: Request
) {
  try {
    const body = await request.json()
    const {
      department,
      name,
      date,
      place,
      event,
      circs,
      gauge,
      note,
      liable,
      cause,
      comment
    } = body
    console.log("post log", body)

    if ( !date && !department && !name && !place && !event && !liable)
      return new NextResponse( 'Missing info', { status: 400 } )

    const log = await prisma.log.create({
      data: {
        department,
        name,
        date,
        place,
        event,
        circs,
        gauge,
        note,
        liable,
        cause,
        comment,
      }
    })

    return NextResponse.json(log.id)
  } catch ( error ) {
    console.log( error, 'LOG_CREATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}
/*
export
  async function DELETE(
    request: Request
) {
  try {
    const body = await request.json()

    const {
      id
    } = body

    const dash = await prisma.log.delete({
      where: {
        id: id
      }
    })

    if ( !id || !dash ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }

    return NextResponse.json(dash.id)
  } catch ( error ) {
    console.log( error, 'DASH_DELETE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

export
  async function PATCH(
    request: Request
) {
  try {
    const body = await request.json()

    const {
      id,
      date,
    } = body
    console.log(body)

    if ( !id || !date ) {
      return new NextResponse('Missing info', { status: 400 })
    }

    const dash = await prisma.log.update({
      where: {
        id
      },
      data: {
        date,
      }
    })

    return NextResponse.json(dash.id)
  } catch ( error ) {
    console.log( error, 'DASH_UPDATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}*/