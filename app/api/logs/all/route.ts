
import prisma from "@/lib/prosmadb"
import { NextResponse } from "next/server"

export
  async function GET(
) {
  try {
    const logs = await prisma.log.findMany()

    return NextResponse.json(logs)
  } catch ( error ) {
    console.log( error, 'LOGS_GET_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

/*export
  async function POST(
    request: Request
) {
  try {
    const body = await request.json()

    const {
      date,
    } = body
    console.log(body)

    if ( !date ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }

    const dash = await prisma.log.create({
      data: {
        date: date
      }
    })

    return NextResponse.json(dash.id)
  } catch ( error ) {
    console.log( error, 'DASH_CREATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

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