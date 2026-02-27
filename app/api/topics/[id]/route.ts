import { NextResponse } from "next/server";
import { deleteTopic, getTopicById, updateTopic } from "@/lib/topics-store";

export function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return params.then(({ id }) => {
    const topic = getTopicById(Number(id));

    if (!topic) {
      return NextResponse.json(
        { message: "해당 글을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(topic);
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const topicId = Number(id);

  if (!Number.isFinite(topicId)) {
    return NextResponse.json({ message: "잘못된 id 입니다." }, { status: 400 });
  }

  const body = (await request.json()) as Partial<{ title: string; body: string }>;
  const updated = updateTopic(topicId, body);

  if (!updated) {
    return NextResponse.json(
      { message: "해당 글을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const topicId = Number(id);

  if (!Number.isFinite(topicId)) {
    return NextResponse.json({ message: "잘못된 id 입니다." }, { status: 400 });
  }

  const deleted = deleteTopic(topicId);

  if (!deleted) {
    return NextResponse.json(
      { message: "해당 글을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true });
}
