"use client"

import React, { ReactNode, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
//    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  //  AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  // import { Button } from "@/components/ui/button"
  
  export function useInformationDialog(title: string, message: string): [ReactNode, () => void] {
    const [shown, setShown] = useState<boolean>(false);
    const show = () => {setShown(true)};
    const hide = () => {setShown(false)};
    
    const dialog = shown? (
      <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={hide}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    ):(<></>);

    return [dialog, show];
  }
