import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/auth";
import PostWidget from "./PostWidget";
import api from "api";

const PostsWidget = ({ usuarioId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.auth.posts);
    const token = useSelector((state) => state.auth.token);

    const getPosts = async () => {
        const response = await api("/publicaciones", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response) {
          dispatch(setPosts({ posts: response }));
        }
    }

    const getUserPosts = async () => {
        const response = await api(`/publicaciones/${usuarioId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        if (response) {
          dispatch(setPosts({ posts: response }));
        }
    }

    useEffect(() => {
      if (isProfile) {
          getUserPosts();
      } else {
          getPosts();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) ;

    return (
        <>
            { posts.map(
                ({
                    _id,
                    usuarioId,
                    nombre,
                    apellido,
                    descripcion,
                    ubicacion,
                    imgRuta,
                    usuarioImgRuta,
                    likes,
                    comentarios,
                }) => (
                    <PostWidget
                    key= {_id}
                    post_id={_id}
                    postUsuarioId={usuarioId}
                    nombre={`${nombre} ${apellido}`}
                    descripcion={descripcion}
                    ubicacion={ubicacion}
                    imgRuta={imgRuta}
                    usuarioImgRuta={usuarioImgRuta}
                    likes={likes}
                    comentarios={comentarios}
                    />

                )
            )}

        </>
    )


};



export default PostsWidget;
