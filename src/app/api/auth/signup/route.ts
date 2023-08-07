import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../sql/sql';
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
    
  const { dbClient, dbRelease } = await connectToDatabase();

    // check to see if username already exists
    try {
			const { firstName, lastName, email, password } = await req.json();
			// @ts-ignore
			const emailCheck = 'SELECT email FROM users WHERE email = $1;'
      const existResponse = await dbClient?.query(emailCheck, [email]);
			
      if (existResponse?.rows.length === 1) {
				return NextResponse.json({response: 'email already exists'}, {status: 400});
			}
			
      // BCRYPT PASSWORD
      const hashPassword = await bcrypt.hash(password, 10);

			// email does not exist --> create new user
			const userSignUp = `
      INSERT INTO users (firstName, lastName, email, password)
      VALUES ($1, $2, $3, $4)
      `;

			await dbClient?.query(userSignUp, [firstName, lastName, email, hashPassword]);

			return NextResponse.json({response: 'Sign Up Successful'});
			
    } catch (error) {
       return NextResponse.json({response: 'Sign Up Failed'})

    } finally {
      dbRelease?.();
    }
}