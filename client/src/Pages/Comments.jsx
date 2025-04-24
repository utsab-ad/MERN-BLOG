import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteAddCategory, RouteEditCategory } from "@/helpers/RouteName";
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
import Loading from "@/components/Loading";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import moment from "moment";
import { useSelector } from "react-redux";

const Comments = () => {
  const [refreshData, setRefreshData] = useState(false);

  const user = useSelector((state) => state.user);

  const {
    data: data,
    loading,
    error,
  } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/comment/get-all-comments`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${import.meta.env.VITE_API_BASE_URL}/comment/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Data Deleted");
    } else {
      showToast("error", "Data Not Deleted");
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Blog</TableHead>
                <TableHead>Commented by</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.comments.length > 0 ? (
                data.comments.map((comment) => {
                  return (
                    <TableRow key={comment._id}>
                      <TableCell> {comment?.blogid?.title}</TableCell>
                      <TableCell> {comment?.user?.name}</TableCell>
                      <TableCell> {comment?.comment}</TableCell>
                      <TableCell>
                        {" "}
                        {moment(comment?.createdAt).format("DD-MM-YYYY")}
                      </TableCell>

                      <TableCell className="flex gap-3">
                        <Button
                          onClick={() => handleDelete(comment._id)}
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
                  <TableCell colSpan="3">Data not Found !</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comments;
