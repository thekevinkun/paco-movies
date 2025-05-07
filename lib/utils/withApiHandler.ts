import { NextResponse } from "next/server";

export const withApiHandler = (handler: (req: Request) => Promise<unknown>) => {
  return async (req: Request) => {
    try {
      const result = await handler(req);
      return NextResponse.json(result);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };
};