"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { API_URL } from "@/types/common";
import { toast } from "react-toastify";
import { IRestoreUser } from "../types/common";

const AlertDialogRestoreUser: React.FC<IRestoreUser> = ({
  idUser,
  fetchUser,
}) => {
  const handleRestoreUser = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.patch(
        `${API_URL}/api/v1/user/restore/${idUser}`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response) {
        toast.success("User restored successfully..!!!");
        fetchUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="font-sans text-sm capitalize text-red-600"
        >
          restore user
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to restore this user?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white font-sans"
            onClick={handleRestoreUser}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogRestoreUser;
