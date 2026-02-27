"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Topic = {
  id: number;
  title: string;
  body: string;
};

export default function UpdatePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopic = async () => {
      const response = await fetch(`/api/topics/${id}`, { cache: "no-store" });

      if (!response.ok) {
        alert("글을 불러오지 못했습니다.");
        router.push("/");
        return;
      }

      const topic: Topic = await response.json();
      setTitle(topic.title);
      setBody(topic.body);
      setLoading(false);
    };

    void fetchTopic();
  }, [id, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextTitle = title.trim();
    const nextBody = body.trim();

    if (!nextTitle || !nextBody) {
      alert("title과 body를 모두 입력해주세요.");
      return;
    }

    const response = await fetch(`/api/topics/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: nextTitle, body: nextBody }),
    });

    if (!response.ok) {
      alert("수정에 실패했습니다.");
      return;
    }

    router.push(`/read/${id}`);
    router.refresh();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </p>
      <p>
        <input type="submit" value="Update" />
      </p>
    </form>
  );
}
