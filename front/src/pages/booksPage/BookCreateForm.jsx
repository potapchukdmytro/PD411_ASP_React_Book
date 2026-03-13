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
import { useFormik } from "formik";
import { object, string, number } from "yup";
import { useNavigate } from "react-router";
import { useAction } from "../../store/hooks/useAction";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

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
    numberOfPages: 100,
    publishDate: new Date().getFullYear(),
    authorId: 0,
};

const BookCreateForm = () => {
    const navigate = useNavigate();
    const { createBook, loadAuthors } = useAction();
    const { authors, isLoaded } = useSelector((state) => state.author);

    useEffect(() => {
        const fetchAuthors = async () => {
            await loadAuthors();
        };
        if (!isLoaded) {
            fetchAuthors();
        }
    }, []);

    const handleSubmit = async (newBook) => {        
        // const result = await createBook(newBook);
        const result = false;
        if (result) {
            toast.success(`Книгу '${newBook.title}' успішно додано`);
            navigate("/books");
        } else {
            toast.error('Не вдалося створити книгу', {
                position: "top-center"
            });

            toast.warning('Попередежння', {
                position: "top-center"
            });

            toast('Інформація', {
                
            });
        }

        // перенаправити користувача на сторінку з книгами
    };

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
                        Додавання нової книги
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
                            <FormLabel htmlFor="publishDate">Рік</FormLabel>
                            <TextField
                                name="publishDate"
                                placeholder="Рік публікацї"
                                fullWidth
                                type="number"
                                variant="outlined"
                                value={formik.values.publishDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {getError("publishDate")}
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
                            <FormLabel htmlFor="numberOfPages">
                                К-сть сторінок
                            </FormLabel>
                            <TextField
                                name="numberOfPages"
                                placeholder="100"
                                fullWidth
                                type="number"
                                variant="outlined"
                                value={formik.values.numberOfPages}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {getError("numberOfPages")}
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
                            Додати
                        </Button>
                    </Box>
                </Card>
            </SignInContainer>
        </Box>
    );
};

export default BookCreateForm;

// function bookList() {
//     const list = [2, 3];

//     function addNew(value) {
//         list.push(value);
//     }

//     // form(addNew);
//     "<form addCallback={addNew}/>"
// }

// function form({addCallback}) {
//     const book = 1;
//     addCallback(book);
// }

// const BookCreateForm = () => {
//     const [values, setValues] = useState({
//         title: "",
//         author: "",
//         genre: "",
//         year: "",
//         cover: ""
//     });

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         console.log(values);
//     };

//     return (
//         <Box>
//             <SignInContainer direction="column" justifyContent="space-between">
//                 <Card variant="outlined">
//                     <Typography
//                         component="h1"
//                         variant="h4"
//                         sx={{
//                             width: "100%",
//                             fontSize: "clamp(2rem, 10vw, 2.15rem)",
//                         }}
//                     >
//                         Додавання нової книги
//                     </Typography>
//                     <Box
//                         component="form"
//                         onSubmit={handleSubmit}
//                         sx={{
//                             display: "flex",
//                             flexDirection: "column",
//                             width: "100%",
//                             gap: 2,
//                         }}
//                     >
//                         <FormControl>
//                             <FormLabel htmlFor="title">Назва</FormLabel>
//                             <TextField
//                                 name="title"
//                                 placeholder="Назва книги"
//                                 autoComplete="title"
//                                 autoFocus
//                                 fullWidth
//                                 variant="outlined"
//                                 onChange={event => setValues({...values, title: event.target.value})}
//                                 value={values.title}
//                             />
//                         </FormControl>
//                         <FormControl>
//                             <FormLabel htmlFor="author">Автор</FormLabel>
//                             <TextField
//                                 name="author"
//                                 placeholder="Автор"
//                                 autoComplete="author"
//                                 fullWidth
//                                 variant="outlined"
//                                 onChange={event => setValues({...values, author: event.target.value})}
//                                 value={values.author}
//                             />
//                         </FormControl>
//                         <FormControl>
//                             <FormLabel htmlFor="genre">Жанр</FormLabel>
//                             <TextField
//                                 name="genre"
//                                 placeholder="Жанр"
//                                 autoComplete="genre"
//                                 fullWidth
//                                 variant="outlined"
//                                 onChange={event => setValues({...values, genre: event.target.value})}
//                                 value={values.genre}
//                             />
//                         </FormControl>
//                         <FormControl>
//                             <FormLabel htmlFor="year">Рік</FormLabel>
//                             <TextField
//                                 name="year"
//                                 placeholder="Рік публікацї"
//                                 autoComplete="year"
//                                 fullWidth
//                                 variant="outlined"
//                                 onChange={event => setValues({...values, year: event.target.value})}
//                                 value={values.year}
//                             />
//                         </FormControl>
//                         <FormControl>
//                             <FormLabel htmlFor="cover">Обкладинка</FormLabel>
//                             <TextField
//                                 name="cover"
//                                 placeholder="Обкладинка"
//                                 autoComplete="cover"
//                                 fullWidth
//                                 variant="outlined"
//                                 onChange={event => setValues({...values, cover: event.target.value})}
//                                 value={values.cover}
//                             />
//                         </FormControl>
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             color="error"
//                         >
//                             Додати
//                         </Button>
//                     </Box>
//                 </Card>
//             </SignInContainer>
//         </Box>
//     );
// };
