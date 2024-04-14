import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "@/state/auth";
import FlexBetween from "@/components/FlexBetween";
import UserImage from "@/components/UserImage";
import api from "@/api";

const Friend = ({friendId, name, subtitle, usuarioImgRuta}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {_id} = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const friends = useSelector ((state) => state.auth.user.amigos);

    const {palette} = useTheme();
    const primaryLight = palette.primaryLight;
    const primaryDark = palette.primaryDark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = friends.find((friend) => friend._id === friendId);
    const patchFriend = async () => {
      const response = await api(`/usuarios/${_id}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        dispatch(setFriends({friends:response}));
      }
    };

    return (
        <FlexBetween>
          <FlexBetween gap="1rem">
            <UserImage image={usuarioImgRuta} size="55px" />
            <Box
              onClick={() => {
                navigate(`/profile/${friendId}`);
              }}
            >
              <Typography
                color={main}
                variant="h5"
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {name}
              </Typography>
              <Typography color={medium} fontSize="0.75rem">
                {subtitle}
              </Typography>
            </Box>
          </FlexBetween>
          { _id !== friendId && (
            <IconButton
              onClick={() => patchFriend()}
              sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
              {isFriend ? (
                <PersonRemoveOutlined sx={{ color: primaryDark }} />
              ) : (
                <PersonAddOutlined sx={{ color: primaryDark }} />
              )}
            </IconButton>
          )}

        </FlexBetween>
      );
};

export default Friend;
