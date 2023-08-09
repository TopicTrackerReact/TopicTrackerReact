import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../sql/sql";
import bcrypt from 'bcrypt';


export async function POST(req: NextRequest) {

  const { dbClient: client, dbRelease: release } = await connectToDatabase();

  try {
    // GET USER DATA
    const body = await req.json();
    const { email, password }: { email: string, password: string } = body;

    // QUERY FOR USER DATA
    const logIn = `
    SELECT * FROM users
    WHERE email = $1
    `;

    const results = await client?.query(logIn, [email])

    // CHECKS IF ENTRY EXISTS
    if (results?.rows.length) {

      const { password: hashPass }: { password: string } = results?.rows[0];

      // COMPARE PASSWORD TO HASHED PASS IN DB
      if (bcrypt.compareSync(password, hashPass)) {


        // SET COOKIE
        const response = NextResponse.json({ msg: 'Successful Login!' });
        response.cookies.set({
          name: 'session',
          value: 'token-random-string',
          httpOnly: true,
          maxAge: 20
        })

        return response;
        // return NextResponse.json({msg: 'Successful Login!'})

      } else throw new Error('Incorrect Password');
    } else throw new Error('Email Does Not Exist');
    
  } catch (error) {


    return NextResponse.json({ msg: (error as Error).message }, { status: 400 })
  } finally {
    release?.()
  }

}