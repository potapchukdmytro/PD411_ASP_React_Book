import {styled} from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useRef, useState} from "react";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const UploadImage = ({label, buttonText, onChange}) => {
    const [imageHover, setImageHover] = useState(false);
    const [image, setImage] = useState(null);
    const imageInput = useRef(null);

    const changeImageHandle = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setImage(file);
            onChange(file);
        }
    }

    const deleteImageHandle = () => {
        setImageHover(false);
        if (imageInput.current) {
            imageInput.current.value = null;
        }
        setImage(null);
        onChange(null);
    }

    return (
        <>
            <FormControl>
                <FormLabel htmlFor="image">{label}</FormLabel>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon/>}
                >
                    {buttonText}
                    <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        onChange={changeImageHandle}
                        ref={imageInput}
                    />
                </Button>
            </FormControl>
            {
                image &&
                <Box sx={{textAlign: 'center', width: "100%", position: "relative", cursor: "pointer"}}
                     onMouseEnter={() => setImageHover(true)}
                     onMouseLeave={() => setImageHover(false)}
                     className="hover-pointer">
                    <Box component="img"
                         sx={{objectFit: "contain", opacity: imageHover ? "0.5" : "1"}}
                         src={URL.createObjectURL(image)}
                         height="300px"
                         width="100%">
                    </Box>
                    {imageHover &&
                        <Box
                            onClick={deleteImageHandle}
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)"
                            }}>
                            <DeleteForeverIcon color="error" sx={{fontSize: "3em"}}/>
                        </Box>
                    }
                </Box>
            }
        </>
    )
}

export default UploadImage;