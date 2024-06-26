import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "@/scenes/navbar";
import FriendListWidget from "@/scenes/widgets/FriendListWidget";
import MyPostWidget from "@/scenes/widgets/MyPostWidget";
import PostsWidget from "@/scenes/widgets/PostsWidget";
import UserWidget from "@/scenes/widgets/UserWidget";
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id, imgRuta } = useSelector((state) => state.auth.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget usuarioId={_id} imgRuta={imgRuta} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget imgRuta={imgRuta} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Box m="2rem 0" />
            <FriendListWidget usuarioId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default HomePage;
