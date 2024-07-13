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
import { UserContext } from "@/context/userContext";
import { toast } from "react-toastify";
import { IDeleteUser } from "../types/common";

const BanUserDialog: React.FC<IDeleteUser> = ({ idUser, tabCurr }) => {
  const context = React.useContext(UserContext);
  const fetchUser = context?.fetchUser;
  const onSetActive = context?.setActive;
  const handleDeleteUser = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.delete(`${API_URL}/api/v1/user/${idUser}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response) {
        tabCurr === "actived" ? onSetActive(true) : onSetActive(false);
        fetchUser();
        toast.success("Deleted user successfully...!!!");
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
          delete user
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this user?
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
            onClick={handleDeleteUser}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BanUserDialog;
