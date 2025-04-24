import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from "react-dropzone";
import usericon from "@/assets/images/user.png";
import { setUser } from "@/redux/user/user.slice";

const Profile = () => {
  const [filePreview, setPreview] = useState();

  const [file, setFile] = useState();

  const user = useSelector((state) => state.user);

  const user_Id = user?.user?._id;
  const {
    data: userData,
    loading,
    error,
  } = useFetch(
    user_Id
      ? `${import.meta.env.VITE_API_BASE_URL}/user/get-user/${user_Id}`
      : '',
    {
      method: "get",
      Credentials: "include"
    }
  );

  const dispatch = useDispatch();

  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 character"),
    email: z.string().email(),
    bio: z.string().min(3, "Bio must be at least 3 character"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userData && userData?.success) {
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio,
      });
    }
  }, [userData]);

  async function onSubmit(values) {
    try {
      const userId = userData?.user?._id;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(values));

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/update-user/${userId}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispatch(setUser(data.user));
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
  };

  if (loading) return <Loading />;
  return (
    <Card className="max-w-full mx-auto">
       <CardTitle className="flex justify-center items-center mx-auto text-2xl">Profile</CardTitle>
      <CardContent>
        <div className="flex justify-center items-center mt-10 rounded-full">
          <Dropzone
            onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />

                <Avatar className="w-28 h-28 rounded-full relative group">
                  <AvatarImage
                    src={
                      filePreview
                        ? filePreview
                        : userData?.user?.avatar || usericon
                    }
                    className="w-28 h-28 max-w-28 max-h-28 rounded-full border-2 border-gray-500"
                  />
                  <AvatarFallback className="w-28 h-28 max-w-28 max-h-28 rounded-full border-2 border-gray-500">
                    CN
                  </AvatarFallback>

                  <div
                    className="absolute z-50 
                    w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    flex justify-center items-center bg-black/15 rounded-full group-hover:flex hidden cursor-pointer"
                  >
                    <IoCameraOutline className="text-violet-500 w-10 h-10" />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>
        </div>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter Bio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                {" "}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
