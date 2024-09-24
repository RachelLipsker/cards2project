import React, { useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useMenu } from "../menu/MenuProvider";
import { useCurrentUser } from "../../../users/providers/UserProvider";
import useUsers from "../../../users/hooks/useUsers";

export default function Logged() {
  const setOpen = useMenu();
  const { user } = useCurrentUser();
  const { getUserById, isLoading, error, profile } = useUsers();

  useEffect(() => {
    if (user) {
      getUserById(user._id)
    }
  }, [user]);

  if (isLoading || error) return (<Tooltip title="Open settings">
    <IconButton onClick={() => setOpen(true)}
      sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}>
      <Avatar alt="avatar" src="/images/avatar.png" />
    </IconButton>
  </Tooltip >
  );
  return (
    <Tooltip title="Open settings">
      <IconButton onClick={() => setOpen(true)}
        sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}>
        <Avatar alt="avatar" src={profile.image.url == "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png" ? "/images/avatar.png" : profile.image.url} />
      </IconButton>
    </Tooltip >
  );
}