"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function CreatePage(){
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.currentTarget;
      const formData = new FormData(form);
      const title = String(formData.get("title") ?? "").trim();
      const body = String(formData.get("body") ?? "").trim();

      if (!title || !body) {
        alert("title과 body를 모두 입력해주세요.");
        return;
      }

      const response = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });

      if (!response.ok) {
        alert("저장에 실패했습니다.");
        return;
      }

      const result: { id: number | string } = await response.json();
      form.reset();
      router.push(`/read/${result.id}`);
      router.refresh();
    };

    return(
    
        <form onSubmit={handleSubmit}>
        <p>
        <input type="text" name="title" placeholder="title"/></p>
        <p>
        <textarea name="body" placeholder="body"></textarea></p>
        <p>
        <input type="submit" value="Create"/>
        </p>
        </form>
        
    )
}