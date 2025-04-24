import React, { useState } from "react";
import { FaComments } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { showToast } from "@/helpers/showToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "./ui/textarea";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RouteSignIn } from "@/helpers/RouteName";
import CommentList from "./CommentList";
const Comment = ({ props }) => {
  const [newComment, setNewComment] = useState()
  const user = useSelector((state) => state.user);
  const formSchema = z.object({
    comment: z.string().min(3, "Comment must be 3 character long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values) {
    const newValues = {...values, blogid:props.blogid, user: user.user._id}
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/comment/add`,
        {
          method: "POST",
          credentials: 'include',
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newValues),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      setNewComment(data.comment)
      form.reset();
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div>
      <h4 className="flex items-center gap-2 text-2xl font-bold">
        {" "}
        <FaComments className="text-violet-500" /> Comment
      </h4>

      {user && user.isLoggedIn ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mb-3">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Type your comment" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5">
              <Button type="submit" className="">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="mt-5">
          <Button asChild>
            <Link to={RouteSignIn}>Sign In</Link>
          </Button>
        </div>
      )}
       <div className="border-t mt-5 pt-5">
              <CommentList props={{ blogid: props.blogid, newComment }} />
            </div>
    </div>
  );
};

export default Comment;
