import {
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    ChatBubbleOutline,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import WidgetWrapper from "@/components/WidgetWrapper";
import Friend from "@/components/Friend";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "@/state/auth";
import api, { BACKEND_URL } from "@/api";

const PostWidget = ({
    postId,
    postUsuarioId,
    nombre,
    descripcion,
    ubicacion,
    imgRuta,
    usuarioImgRuta,
    likes,
    comentarios,
}) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const loggedInUsuarioId = useSelector((state) => state.auth.user._id);
    const isLiked = Boolean(likes[loggedInUsuarioId]);
    const likeCount = Object.keys(likes).length;

    const {palette} = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.medium;

    const patchLike = async() => {
        const response = await api(`/publicaciones/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({usuarioId: loggedInUsuarioId}),
        });
        dispatch(setPost({post: response}));
    };

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUsuarioId}
                name={nombre}
                subtitle={ubicacion}
                usuarioImgRuta={usuarioImgRuta}
            />
            <Typography color={main} sx={{mt: "1rem"}}>
                {descripcion}
            </Typography>
            {imgRuta && (
                <img
                width="100%"
                height="auto"
                alt="post"
                style={{borderRadius: "0.75rem", marginTop: "0.75rem"}}
                src={`${BACKEND_URL}/assets/${imgRuta}`}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ?(
                                <FavoriteOutlined sx={{color:primary}} />

                            ) : (
                                <FavoriteBorderOutlined />
                             )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)} >
                            <ChatBubbleOutline />
                        </IconButton>
                        <Typography> {comentarios.length}</Typography>
                    </FlexBetween>
                </FlexBetween>
                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt="0.5rem">
                    {comentarios.map((commentario, i) => (
                        <Box key={`${nombre}-${i}`}>
                            <Divider />
                            <Typography  sx={{color: main, m:"0.5rem 0", pl: "1rem"}}>
                                {commentario}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper>
    )

};

export default PostWidget;