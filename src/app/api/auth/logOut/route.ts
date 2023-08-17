import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../sql/sql';

export async function GET(req: NextRequest) {

  const { dbClient: client, dbRelease: release } = await connectToDatabase();

  try {
    // DECONSTRUCT COOKIE

    const { value: sessionID } = req.cookies.get('tta-session') as { name: string, value: string };

    // DELETE SESSION FROM SESSION TABLE FOR CURRENT USER
    const sessionsQuery = `DELETE FROM sessions WHERE sessionID = $1`;
    await client?.query(sessionsQuery, [sessionID]);

    // DELETE COOKIE
    const response = NextResponse.json({ msg: 'Logout successful' })
    response.cookies.set({
      name: 'tta-session',
      value: '',
      expires: Date.now() - (24 * 60 * 60 * 1000)
    })

    return response;


  } catch (error) {
    throw new Error('Logout Failed')

  } finally {
    release?.();
  }

}
