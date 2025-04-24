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
import usericon from "@/assets/images/user.png";
import { Link } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import moment from "moment";


const User = () => {

  const [refreshData, setRefreshData] = useState(false)


  const {
    data: data,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_API_BASE_URL}/user/get-all-user`, {
    method: "get",
    credentials: "include",
  }, [refreshData]);

  const handleDelete = async (id) => {
      const response = await deleteData(`${import.meta.env.VITE_API_BASE_URL}/user/delete/${id}`)
      if(response) {
        setRefreshData(!refreshData)
        showToast('success', 'Data Deleted')
      } else {
        showToast('error', 'Data Not Deleted')
      }
  }

  if (loading) return <Loading />;

  return (
    <div>
      <Card>
      
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.user.length > 0 ? (
                data.user.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell> {user?.role}</TableCell>
                    <TableCell> {user?.name}</TableCell>
                    <TableCell> {user?.email}</TableCell>
                    <TableCell> <img src={user?.avatar || usericon} className="w-10 rounded-full" alt="" /></TableCell>
    
                    <TableCell> {moment(user?.createdAt).format('DD-MM-YYYY')}</TableCell>
                    <TableCell className="flex gap-3">
                      <Button onClick={() => handleDelete(user?._id)} variant="outline" className="hover:bg-violet-500 hover:text-white">
                          <FaTrashAlt/>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
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

export default User;
