"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
export default function EditPosts({ params }: { params: { id: string } }) {
  const { id } = params;
  const { toast } = useToast();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const FetchPosts = async (id: string) => {
    try {
      const res = await axios.get(`/api/posts`);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (id) {
      FetchPosts(id);
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.put(`/api/post/${id}`, {
        title,
        desc,
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      console.log("error", error);
    }
  };
  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
        <div>
          <h3>Title</h3>
          <input
            type="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <h3>Description</h3>
          <input
            type="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button type="submit">EDIT</button>
        <button type="reset">RESET</button>
      </form>
    </div>
  );
}
