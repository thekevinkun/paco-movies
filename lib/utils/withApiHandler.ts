import { NextResponse } from "next/server";

export const withApiHandler = (handler: Function) => {
  return async (req: Request) => {
    try {
      const result = await handler(req);
      return NextResponse.json(result);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Something went wrong" },
        { status: 500 }
      );
    }
  };
};