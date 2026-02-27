import { getTopicById } from "@/lib/topics-store";
import ReadActions from "./read-actions";

export default async function ReadPage({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    const { id } = await params;
    const topic = getTopicById(Number(id));

    if (!topic) {
      return (
        <>
          <h2>Read</h2>
          <p>해당 글을 찾을 수 없습니다.</p>
        </>
      );
    }
  
    return (
      <>
        <h2>{topic.title}</h2>
        <p>{topic.body}</p>
        <ReadActions id={topic.id} />
      </>
    );
  }