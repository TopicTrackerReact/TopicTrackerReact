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
    const login = `
    SELECT * FROM users
    WHERE email = $1
    `;

    const results = await client?.query(login, [email])

    // CHECKS IF ENTRY EXISTS
    if (results?.rows.length) {

      const { password: hashPass }: { password: string } = results?.rows[0];

      // COMPARE PASSWORD TO HASHED PASS IN DB
      if (bcrypt.compareSync(password, hashPass)) {

        const sessionID = crypto.randomUUID();
        console.log('sessionID: ', sessionID);

        const { userid, firstname }: { userid: number, firstname: string } = results?.rows[0];
        console.log('userid: ', userid);

        // UPDATE DB WITH SESSION
        const sessionDB = `
        INSERT INTO sessions (sessionID, userID)
        VALUES ($1, $2)
        `;

        await client?.query(sessionDB, [sessionID, userid])

        // SET COOKIE
        const response = NextResponse.json({ msg: 'Successful Login!', name: firstname });
        response.cookies.set({
          name: 'tta-session',
          value: sessionID,
          // httpOnly: true,
          secure: true,
          maxAge: 60,
        })

        return response;

      } else throw new Error('Incorrect Password');
    } else throw new Error('Email Does Not Exist');

  } catch (error) {
    return NextResponse.json({ msg: (error as Error).message }, { status: 400 })

  } finally {
    release?.()
  }

}