import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Select, MenuItem } from "@mui/material";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { object, number, string } from "yup";
import { useEffect } from "react";
import axios from "axios";
import { useAction } from "../../store/hooks/useAction";
import { useSelector } from "react-redux";

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "0px auto",
    [theme.breakpoints.up("sm")]: {
        maxWidth: "450px",
    },
    boxShadow:
        "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles("dark", {
        boxShadow:
            "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    minHeight: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4),
    },
    "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        zIndex: -1,
        inset: 0,
        backgroundImage:
            "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        backgroundRepeat: "no-repeat",
        ...theme.applyStyles("dark", {
            backgroundImage:
                "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
        }),
    },
}));

const initValues = {
    title: "",
    description: "",
    image: "",
    rating: 0,
    number_of_pages: 100,
    publish_date: new Date().getFullYear(),
    authorId: 0,
};

const BookUpdateForm = () => {
    const { updateBook, loadAuthors } = useAction();
    const navigate = useNavigate();
    const { authors, isLoaded } = useSelector((state) => state.author);
    const { id } = useParams();

    async function handleSubmit(newBook) {    
        console.log(newBook);
            
        const result = await updateBook(newBook);
        if (result) {
            navigate("/books");
        } else {
            console.log("Помилка під час редагування");
        }
    }

    const getError = (prop) => {
        return formik.touched[prop] && formik.errors[prop] ? (
            <Typography sx={{ mx: 1, color: "red" }} variant="h7">
                {formik.errors[prop]}
            </Typography>
        ) : null;
    };

    // validation scheme
    const maxYear = new Date().getFullYear();
    const validationScheme = object({
        title: string()
            .required("Обов'язкове поле")
            .max(100, "Максимальна довжина 100 символів"),
        publishDate: number()
            .min(1000, `Рік не може бути меншим за 1000`)
            .max(maxYear, `Рік не може бути більшим за ${maxYear}`),
        rating: number()
            .min(0, `Рейтинг не може бути меншим за 0`)
            .max(10, `Рейтинг не може бути більшим за 10`),
        numberOfPages: number().min(1, `Повинна бути хоча б одна сторінка`),
    });

    // formik
    const formik = useFormik({
        initialValues: initValues,
        onSubmit: handleSubmit,
        validationSchema: validationScheme,
    });

    useEffect(() => {
        const fetchAuthors = async () => {
            await loadAuthors();
        };
        if (!isLoaded) {
            fetchAuthors();
        }
    }, []);

    useEffect(() => {
        const readBook = async () => {
            const booksUrl = import.meta.env.VITE_BOOKS_URL;

            const response = await axios.get(`${booksUrl}/${id}`);
            if (response.status === 200) {
                const { data } = response;
                const oldBook = data.data;
                if(oldBook.author) {
                    oldBook.authorId = oldBook.author.id;
                } else {
                    oldBook.authorId = 0;
                }
                await formik.setValues(oldBook, false);
            } else {
                navigate("/books");
            }
        };
        readBook();
    }, []);

    return (
        <Box>
            <SignInContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            width: "100%",
                            fontSize: "clamp(2rem, 10vw, 2.15rem)",
                        }}
                    >
                        Редагування книги
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="title">Назва</FormLabel>
                            <TextField
                                name="title"
                                placeholder="Назва книги"
                                autoComplete="title"
                                fullWidth
                                variant="outlined"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                        {getError("title")}
                        <FormControl>
                            <FormLabel htmlFor="description">Опис</FormLabel>
                            <TextField
                                name="description"
                                placeholder="Опис"
                                fullWidth
                                variant="outlined"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="publish_date">Рік</FormLabel>
                            <TextField
                                name="publish_date"
                                placeholder="Рік публікацї"
                                fullWidth
                                type="number"
                                variant="outlined"
                                value={formik.values.publish_date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {getError("publish_date")}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="rating">Рейтинг</FormLabel>
                            <TextField
                                name="rating"
                                placeholder="0-10"
                                autoComplete="rating"
                                fullWidth
                                type="number"
                                variant="outlined"
                                value={formik.values.rating}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {getError("rating")}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="number_of_pages">
                                К-сть сторінок
                            </FormLabel>
                            <TextField
                                name="number_of_pages"
                                placeholder="100"
                                fullWidth
                                type="number"
                                variant="outlined"
                                value={formik.values.number_of_pages}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {getError("number_of_pages")}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="image">Обкладинка</FormLabel>
                            <TextField
                                name="image"
                                placeholder="Обкладинка"
                                fullWidth
                                variant="outlined"
                                value={formik.values.image}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="authorId">Автор</FormLabel>
                            <Select
                                name="authorId"
                                value={formik.values.authorId}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={0}>Невідомий</MenuItem>
                                {authors.map((author) => (
                                    <MenuItem key={author.id} value={author.id}>
                                        {author.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="error"
                        >
                            Зберегти
                        </Button>
                    </Box>
                </Card>
            </SignInContainer>
        </Box>
    );
};

export default BookUpdateForm;
