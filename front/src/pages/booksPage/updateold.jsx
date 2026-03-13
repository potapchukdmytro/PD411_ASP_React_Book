// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import FormLabel from "@mui/material/FormLabel";
// import FormControl from "@mui/material/FormControl";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import Stack from "@mui/material/Stack";
// import MuiCard from "@mui/material/Card";
// import { styled } from "@mui/material/styles";
// import { useNavigate, useParams } from "react-router";
// import { useEffect, useState } from "react";

// const Card = styled(MuiCard)(({ theme }) => ({
//     display: "flex",
//     flexDirection: "column",
//     alignSelf: "center",
//     width: "100%",
//     padding: theme.spacing(4),
//     gap: theme.spacing(2),
//     margin: "0px auto",
//     [theme.breakpoints.up("sm")]: {
//         maxWidth: "450px",
//     },
//     boxShadow:
//         "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
//     ...theme.applyStyles("dark", {
//         boxShadow:
//             "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
//     }),
// }));

// const SignInContainer = styled(Stack)(({ theme }) => ({
//     minHeight: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
//     padding: theme.spacing(2),
//     [theme.breakpoints.up("sm")]: {
//         padding: theme.spacing(4),
//     },
//     "&::before": {
//         content: '""',
//         display: "block",
//         position: "absolute",
//         zIndex: -1,
//         inset: 0,
//         backgroundImage:
//             "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
//         backgroundRepeat: "no-repeat",
//         ...theme.applyStyles("dark", {
//             backgroundImage:
//                 "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
//         }),
//     },
// }));

// const BookUpdateForm = () => {
//     const [formValues, setFormValues] = useState({
//         title: "",
//         author: "",
//         genre: "",
//         year: 0,
//         cover_url: "",
//     });
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();
//     const { id } = useParams();

//     useEffect(() => {
//         const localData = localStorage.getItem("books");
//         if (localData) {
//             const books = JSON.parse(localData);
//             const book = books.find((b) => b.id == id);
//             if (!book) {
//                 navigate("/books", { replace: true });
//             }
//             setFormValues(book);
//         } else {
//             navigate("/books", { replace: true });
//         }
//     }, []);

//     function onChangeHandle(event) {
//         const { name, value } = event.target;
//         setFormValues({ ...formValues, [name]: value });
//     }

//     function validate() {
//         const validateErrors = {};
//         let result = true;

//         // title
//         if (formValues.title.length === 0) {
//             validateErrors.title = "Обов'язкове поле";
//             result = false;
//         } else if (formValues.title.length > 100) {
//             validateErrors.title = "Максимальна довжина 100 символів";
//             result = false;
//         }

//         // author
//         if (formValues.author.length > 100) {
//             validateErrors.author = "Максимальна довжина 100 символів";
//             result = false;
//         }

//         // genre
//         if (formValues.genre.length === 0) {
//             validateErrors.genre = "Обов'язкове поле";
//             result = false;
//         } else if (formValues.genre.length > 50) {
//             validateErrors.genre = "Максимальна довжина 50 символів";
//             result = false;
//         }

//         // year
//         const maxYear = new Date().getFullYear();
//         if (formValues.year < 0) {
//             validateErrors.year = "Рік не може бути від'ємним";
//             result = false;
//         } else if (formValues.year > maxYear) {
//             validateErrors.year = `Рік не може бути більшим за ${maxYear}`;
//             result = false;
//         }

//         return { result: result, errors: validateErrors };
//     }

//     function handleSubmit(event) {
//         event.preventDefault();

//         const validateResult = validate();

//         if (!validateResult.result) {
//             setErrors(validateResult.errors);
//             return;
//         } else {
//             setErrors({});
//         }

//         const localData = localStorage.getItem("books");
//         if (localData) {
//             const books = JSON.parse(localData);
//             const index = books.findIndex(b => b.id == id);
//             books[index] = formValues;
//             localStorage.setItem("books", JSON.stringify(books));
//         }

//         // перенаправити користувача на сторінку з книгами
//         navigate("/books");
//     }

//     const getError = (prop) => {
//         return errors[prop] ? (
//             <Typography sx={{ mx: 1, color: "red" }} variant="h7">
//                 {errors[prop]}
//             </Typography>
//         ) : null;
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
//                         Редагування книги
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
//                                 fullWidth
//                                 variant="outlined"
//                                 value={formValues.title}
//                                 onChange={onChangeHandle}
//                             />
//                         </FormControl>
//                         {getError("title")}
//                         <FormControl>
//                             <FormLabel htmlFor="author">Автор</FormLabel>
//                             <TextField
//                                 name="author"
//                                 placeholder="Автор"
//                                 autoComplete="author"
//                                 fullWidth
//                                 variant="outlined"
//                                 value={formValues.author}
//                                 onChange={onChangeHandle}
//                             />
//                         </FormControl>
//                         {getError("author")}
//                         <FormControl>
//                             <FormLabel htmlFor="genre">Жанр</FormLabel>
//                             <TextField
//                                 name="genre"
//                                 placeholder="Жанр"
//                                 autoComplete="genre"
//                                 fullWidth
//                                 variant="outlined"
//                                 value={formValues.genre}
//                                 onChange={onChangeHandle}
//                             />
//                         </FormControl>
//                         {getError("genre")}
//                         <FormControl>
//                             <FormLabel htmlFor="year">Рік</FormLabel>
//                             <TextField
//                                 name="year"
//                                 placeholder="Рік публікацї"
//                                 autoComplete="year"
//                                 fullWidth
//                                 type="number"
//                                 variant="outlined"
//                                 value={formValues.year}
//                                 onChange={onChangeHandle}
//                             />
//                             {getError("year")}
//                         </FormControl>
//                         <FormControl>
//                             <FormLabel htmlFor="cover_url">
//                                 Обкладинка
//                             </FormLabel>
//                             <TextField
//                                 name="cover_url"
//                                 placeholder="Обкладинка"
//                                 autoComplete="cover"
//                                 fullWidth
//                                 variant="outlined"
//                                 value={formValues.cover_url}
//                                 onChange={onChangeHandle}
//                             />
//                         </FormControl>
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             color="error"
//                         >
//                             Зберегти
//                         </Button>
//                     </Box>
//                 </Card>
//             </SignInContainer>
//         </Box>
//     );
// };

// export default BookUpdateForm;
