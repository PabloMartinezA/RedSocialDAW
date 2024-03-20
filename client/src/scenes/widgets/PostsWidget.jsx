import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/auth";
import PostWidget from "./PostWidget";
const PostsWidget = ({ usuarioId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.auth.publicaciones);
    const token = useSelector((state) => state.auth.token);

    const getPosts = async () => {
        const response = await fetch("http://localhost:3001/publicaciones", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },

        });
        const data = await response.json();
        dispatch(setPosts({ publicaciones: data }));
    }

    const getUserPosts = async () => {
        const response = await fetch(`http://localhost:3001/publicaciones/${usuarioId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
            
        });
        const data = await response.json();
        dispatch(setPosts({publicaciones:data}));
    }

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []) ;
    
    return (
        <>
            {publicaciones.map(
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
