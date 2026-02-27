"use client";

import { AppDispatch } from "@/lib/Redux/Store";
import { fetchCurrentUser } from "@/lib/Redux/userSlice/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


export default function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return null
}