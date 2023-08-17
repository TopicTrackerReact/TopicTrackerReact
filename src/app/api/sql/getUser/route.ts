import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../sql';
import type { InitialState } from '@/_redux/features/taskSlice';


// GET REQUEST TO UPDATE REDUX STORE UPON USER SIGN IN
export async function GET(req: NextRequest) {
  // FUNCTIONS FOR DB QUERIES
  const { dbClient: client, dbRelease: release } = await connectToDatabase();
  // FIND WAY TO GET PARAM
  try {
    // FETCH DATA FOR CURRENT USER UPON SIGN IN

    // URL OBJECT METHOD FOR PARAMS
    // const url = new URL(req.url);
    // const searchParams = url.searchParams.get('email');
    // console.log('URL object method for params: ', searchParams);

    // NEXTURL OBJECT METHOD FOR PARAMS
    const email = req.nextUrl.searchParams.get('email');
    console.log('email from getUser: ', email);
    console.log(typeof email);


    /*
    ** 2 INNER JOIN SQL QUERY VERSION **
    SELECT t.taskId, topic, notes, completed FROM tasks AS t
    INNER JOIN utjoin AS ut ON t.taskId=ut.taskId
    INNER JOIN users AS s ON s.userId=ut.userId
    WHERE email='chrispark31@yahoo.com'

    ** INNER JOIN + SUBQUERY VERSION **
    SELECT notes, completed, topic FROM utjoin utj
    INNER JOIN tasks t
    ON t.taskid = utj.taskid
    WHERE utj.userid = (SELECT userid FROM users WHERE email = 'chrispark31@yahoo.com')
    */

    const getDataQuery = `
    SELECT * FROM utjoin utj
    INNER JOIN tasks t
    ON t.taskid = utj.taskid
    WHERE utj.userid = (SELECT userid FROM users WHERE email = $1)
    `;

    const taskData = await client?.query(getDataQuery, [email]);

    const getMaxCount = `
    SELECT COUNT(*) FROM tasks
    `;

    const data = await client?.query(getMaxCount);
    console.log('data from Max ID call: ', data?.rows[0].count);

    const stateMock: InitialState = {
      taskCache: {},
      taskNames: {},
      totalTasks: taskData?.rows.length as number,
      maxId: data?.rows[0].count,
    };

    interface taskEntry { userid: number, taskid: number, notes: string | null, completed: boolean, topic: string }

    taskData?.rows.forEach((entry: taskEntry) => {
      const { taskid: id, notes: dbNotes, completed: isCompleted, topic: taskName } = entry;
      const task = { id: id - 1, notes: dbNotes ? dbNotes : '', isCompleted, taskName }

      stateMock.taskCache[id - 1] = task;
      stateMock.taskNames[taskName] = id - 1;
    });

    console.log('Initial State: ', stateMock);

    return NextResponse.json({ initialState: stateMock });

  } catch (error) {

    return NextResponse.json({ error: (error as Error).message }, { status: 400 });

  } finally {
    release?.()
  }

} 
