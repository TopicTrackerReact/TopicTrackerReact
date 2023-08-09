import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../sql/sql';
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {

  const { dbClient, dbRelease } = await connectToDatabase();


  try {
    const { firstName, lastName, email, password } = await req.json();

    // CHECK IF USER EXISTS
    const emailCheck = 'SELECT * FROM users WHERE email = $1;'
    const existResponse = await dbClient?.query(emailCheck, [email]);

    if (existResponse?.rows.length === 1) {
      return NextResponse.json({ response: 'Email Already Exists' }, { status: 400 });
    }

    // BCRYPT PASSWORD
    const hashPassword = await bcrypt.hash(password, 10);

    // CREATE NEW USER
    const userSignUp = `
      INSERT INTO users (firstName, lastName, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING userid
      `;

    const signUpResp = await dbClient?.query(userSignUp, [firstName, lastName, email, hashPassword]);

    // GET USER ID
    const { userid }: { userid: number } = signUpResp?.rows[0];

    // CREATE SESSION ID 
    const sessionID = crypto.randomUUID();

    // UPDATE SESSIONS TABLE
    const sessionsQuery = `INSERT INTO sessions (userID, sessionID) VALUES ($1, $2)`;
    await dbClient?.query(sessionsQuery, [userid, sessionID]);

    // SET COOKIE
    const response = NextResponse.json({ response: 'Sign Up Successful' });
    response.cookies.set({
      name: 'tta-session',
      value: sessionID,
      httpOnly: true,
      secure: true,
      maxAge: 60
    })

    return response;

  } catch (error) {
    return NextResponse.json({ response: 'Sign Up Failed' })

  } finally {
    dbRelease?.();
  }
}