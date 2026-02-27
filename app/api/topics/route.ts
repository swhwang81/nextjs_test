import { NextResponse } from "next/server";
import { createTopic, getTopics } from "@/lib/topics-store";

export function GET() {
  return NextResponse.json(getTopics());
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<{ title: string; body: string }>;
  const title = body.title?.trim();
  const content = body.body?.trim();

  if (!title || !content) {
    return NextResponse.json(
      { message: "title과 body를 모두 입력해주세요." },
      { status: 400 }
    );
  }

  const created = createTopic({ title, body: content });
  return NextResponse.json(created, { status: 201 });
}
