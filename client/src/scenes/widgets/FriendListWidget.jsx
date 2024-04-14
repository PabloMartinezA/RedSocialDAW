import { Box, Typography, useTheme } from "@mui/material";
import api from "@/api";
import Friend from "@/components/Friend";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "@/state/auth";

const FriendListWidget = ({ usuarioId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.auth.token);
  const friends = useSelector((state) => state.auth.user.amigos);

  const getFriends = async () => {
    const response = await api(`/usuarios/${usuarioId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response) {
      dispatch(setFriends({ friends: response}));
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.nombre} ${friend.apellido}`}
            subtitle={friend.ocupacion}
            usuarioImgRuta={friend.imgRuta}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;