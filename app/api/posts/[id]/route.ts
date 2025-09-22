// import { NextResponse } from "next/server";
// import { auth} from "@/lib/auth";
// import { db } from "@/lib/prisma";

// export async function PUT(req: Request,  { params }: { params: { id: string } }) {
//     try {

//          const { id } = await params;
//         const session = await  auth.api.getSession({
//             headers: req.headers
//         })
//         if (!session) {
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//         }

//         const body = await req.json();
//         const { title, content } = body;
        
//         if (!title || !content) {
//             return NextResponse.json({ error: "Missing fields" },
//                 { status: 400 }
//             );
//         }

//         const updatedPost = await db.post.updateMany({
//             where: {
//                id,
//                 userid: session.user.id,
//             },
//             data: {
//                 title,
//                 content
//             },
//         });

//         return NextResponse.json(updatedPost, {status: 200});

//     } catch (err) {
//         console.error(err);
//         return NextResponse.json({ error: "Server error" }, { status: 500 });
//     }
// }


// export async function DELETE(req: Request, {params}: {params:{id: string}}) {
//     try {

//         const { id } = await params;
//         const session = await  auth.api.getSession({
//             headers: req.headers
//         })
//         if (!session) {
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//         }

//         const DeletePost = await db.post.deleteMany({
//             where: {
//                id,
//                 userid: session.user.id,
//             },
//         });
//          return NextResponse.json(DeletePost, {status: 200});
//     } catch (err) {
//         console.error(err);
//         return NextResponse.json({ error: "Server error" }, { status: 500 });
//     }
// }

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";

// Kung params ay Promise<{id:string}>
interface Context {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, context: Context) {
  try {
    const { id } = await context.params;
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await req.json();
    if (!title || !content) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const updatedPost = await db.post.update({
      where: { id, userid: session.user.id },
      data: { title, content },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: Context) {
  try {
    const { id } = await context.params;
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deletedPost = await db.post.delete({
      where: { id, userid: session.user.id },
    });

    return NextResponse.json(deletedPost, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


