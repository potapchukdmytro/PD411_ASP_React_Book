import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Link } from "react-router";
import { Rating } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useAction } from "../../store/hooks/useAction";

const BookCard = ({ book }) => {
    const {deleteBook} = useAction();

    const deleteClickHandle = async () => {
        await deleteBook(book.id);
    };

    return (
        <Card sx={{ maxWidth: 345, height: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label="recipe"
                        src="https://knu.ua/img/kobzar.jpg"
                    ></Avatar>
                }
                action={
                    <IconButton
                        onClick={deleteClickHandle}
                        color="error"
                        aria-label="settings"
                    >
                        <DeleteIcon />
                    </IconButton>
                }
                title={book.title}
                subheader={book.author ? book.author.name : "Невідомий"}
            />
            <CardMedia
                sx={{ objectFit: "contain" }}
                component="img"
                height="350"
                image={
                    book.image
                        ? book.image
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                }
                alt={book.title}
            />
            <CardContent sx={{textAlign: "center"}}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <Rating readOnly max={10} value={book.rating * 2}/>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    aria-label="add to favorites"
                >
                    <FavoriteIcon />
                </IconButton>
                <Link to={`update/${book.id}`}>
                    <IconButton color="success" aria-label="share">
                        <EditIcon />
                    </IconButton>
                </Link>
            </CardActions>
        </Card>
    );
};

export default BookCard;
