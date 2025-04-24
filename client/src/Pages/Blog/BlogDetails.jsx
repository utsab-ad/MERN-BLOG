import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  RouteAddCategory,
  RouteBlogAdd,
  RouteBlogEdit,
  RouteEditCategory,
} from "@/helpers/RouteName";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import { showToast } from "@/helpers/showToast";
import Loading from "@/components/Loading";
import { deleteData } from "@/helpers/handleDelete";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import moment from "moment";
import { useSelector } from "react-redux";

const BlogDetails = () => {
  const [refreshData, setRefreshData] = useState(false);
  const user = useSelector((state) => state.user);

  const user_Id = user?.user?._id;
  const {
    data: userData,
    usaerLoading,
    userError,
  } = useFetch(
    user_Id
      ? `${import.meta.env.VITE_API_BASE_URL}/user/get-user/${user_Id}`
      : "",
    {
      method: "get",
      Credentials: "include",
    }
  );
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/blog/get-all`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${import.meta.env.VITE_API_BASE_URL}/blog/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Data Deleted");
    } else {
      showToast("error", "Data Not Deleted");
    }
  };
  if (loading || usaerLoading) return <Loading />;

  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteBlogAdd}>Add Blog</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
  {blogData && blogData.blog.length > 0 ? (
    blogData.blog.map((blog) => {
        return (
          <TableRow key={blog._id}>
            <TableCell>{blog?.author?.name}</TableCell>
            <TableCell>{blog?.category?.name}</TableCell>
            <TableCell  className="max-w-[6rem] sm:max-w-[10rem] truncate overflow-hidden whitespace-nowrap">{blog?.title}</TableCell>
            <TableCell  className="max-w-[6rem] sm:max-w-[10rem] truncate overflow-hidden whitespace-nowrap">{blog.slug}</TableCell>
            <TableCell>{moment(blog?.createdAt).format("DD-MM-YYYY")}</TableCell>
            <TableCell className="flex gap-3">
              <Button
                variant="outline"
                className="hover:bg-violet-500 hover:text-white"
                asChild
              >
                <Link to={RouteBlogEdit(blog._id)}>
                  <FiEdit />
                </Link>
              </Button>
              <Button
                onClick={() => handleDelete(blog._id)}
                variant="outline"
                className="hover:bg-violet-500 hover:text-white"
              >
                <FaTrashAlt />
              </Button>
            </TableCell>
          </TableRow>
        );
    })
  ) : (
    <TableRow>
      <TableCell colSpan="6">Data not Found!</TableCell>
    </TableRow>
  )}
</TableBody>

          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetails;
