"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export default function ReadActions({ id }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/topics/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("삭제에 실패했습니다.");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <ul>
      <li>
        <Link href={`/update/${id}`}>Update</Link>
      </li>
      <li>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </li>
    </ul>
  );
}
