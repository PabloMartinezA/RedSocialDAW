import { Box, Stack, TextField, Skeleton } from "@mui/material";
import UserChatButton from "@/components/chat/UserChatButton";
import { useFetch } from "@/hooks/useFetch";
import { useSelector } from "react-redux";
import { useState } from "react";

const UserChats = () => {
  const { _id } = useSelector((state) => state.auth.user);
  const [friends, friendsLoading] = useFetch({ url:`/usuarios/${_id}/friends`, options: { method: "GET" } });
  const [search, setSearch] = useState("");

  return (
    <>
      <TextField
        fullWidth
        placeholder="Buscar amigo"
        sx={{
          padding: "0 0.5rem",
          margin: "0.5rem 0",
        }}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <Stack justifyContent="flex-start" sx={{ overflowY: "auto" }}>
        { friendsLoading ? (
          <Box display="flex" padding="1rem" alignItems="center" justifyContent="left">
            <Skeleton variant="circular" width="60px" height="60px" sx={{ marginRight:"0.5rem" }} />
            <Skeleton variant="text" sx={{ fontSize:"3rem" }} width="100%" />
          </Box>
        ) : (
          <>
            { !search ? (
              <>
                { friends?.map((friend) => {
                  return (
                    <UserChatButton
                      key={friend._id}
                      user={friend}
                    />
                  );
                })}
              </>
            ):(
              <>
                { friends?.filter((friend) => {
                    const name = `${friend.nombre} ${friend.apellido}`.toLowerCase();
                    return name.includes(search.toLowerCase());
                  }).map((friend) => {
                    return (
                      <UserChatButton
                        key={friend._id}
                        user={friend}
                      />
                    );
                })}
              </>
            )}
          </>
        )}
      </Stack>
    </>
  );
}
export default UserChats;