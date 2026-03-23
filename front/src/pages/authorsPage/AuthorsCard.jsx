import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {env} from "../../env.js";


const AuthorsCard = ({author}) => {
    return (
        <Card sx={{maxWidth: 345}}>
            <CardMedia
                sx={{objectFit: 'cover'}}
                component="img"
                height="350"
                image={
                    author.image
                        ? env.authorImages + author.image
                        : env.noImage
                }
                title={author.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {author.name}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    Україна, {author.birthDate}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default AuthorsCard;
