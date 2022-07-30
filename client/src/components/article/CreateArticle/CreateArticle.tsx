import { Subtitles } from "@mui/icons-material";
import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/useHttp";
import useUserInput from "../../../hooks/useUserInput";
import IArticle from "../../../interfaces/IArticle";
import ISection from "../../../interfaces/ISection";
import articleOptions from "../../../utils/articleOptions";
import validators from "../../../validators";

import classes from './CreateArticle.module.css';

const CreateArticle: React.FC = () => {
    const [sections, setSections] = useState<ISection[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>();
    const [fileIsValid, setFileIsValid] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [sectionTextErrors, setSectionTextErrors] = useState<string[]>([]);
    const uploadInputRef = useRef<HTMLInputElement>(null);
    const { isLoading, sendRequest } = useHttp();
    const navigate = useNavigate();

    const {
        value: titleValue,
        isValid: titleIsValid,
        hasError: titleHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
        reset: resetTitle,
        setValue: setTitle
    } = useUserInput(validators.minLength.bind(null, 5));
    const {
        value: subTitleValue,
        isValid: subTitleIsValid,
        hasError: subTitleHasError,
        valueChangeHandler: subTitleChangeHandler,
        inputBlurHandler: subTitleBlurHandler,
        reset: resetSubTitle,
        setValue: setSubTitle
    } = useUserInput(validators.minLength.bind(null, 0));
    const {
        value: categoryValue,
        isValid: categoryIsValid,
        hasError: categoryHasError,
        valueChangeHandler: categoryChangeHandler,
        inputBlurHandler: categoryBlurHandler,
        reset: resetCategory,
        setValue: setCategory
    } = useUserInput(validators.minLength.bind(null, 1));

    const addSectionHandler = () => {
        setSections(oldState => [...oldState, { id: oldState[oldState.length - 1]?.id + 1 || 1 } as ISection]);
    }

    const uploadFileClickHandler = () => {
        uploadInputRef.current?.click();
    }

    const clearFileHandler = () => {
        setSelectedFile(null);
        setFileIsValid(true);
        uploadInputRef.current!.value = '';
    }

    const fileChangeHandler = (e: ChangeEvent) => {
        const element = e.target as HTMLInputElement;

        if (element.files?.length !== 0) {
            const type = element.files![0].type;

            if (type.endsWith('jpeg') || type.endsWith('png')) {
                setSelectedFile(element.files![0]);
                setFileIsValid(true);
            } else {
                setFileIsValid(false);
            }
        }
    }

    const removeSectionClickHandler = (index: number) => {
        setSections(oldValue => oldValue.filter((x, i) => i !== index));
    }

    const sectionTextBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, i: number) => {
        const section = sections[i];
        section.text = e.target.value.trim();
        setSections(oldValue => {
            const newValue = oldValue.slice();
            newValue[i] = section;
            return newValue;
        });

        if (e.target.value.trim().length >= 10) {
            setSectionTextErrors(oldValue => [...oldValue, e.target.value.trim()]);
        } else {
            if (sectionTextErrors.includes(e.target.value.trim())) {
                setSectionTextErrors(oldValue => {
                    const index = oldValue.indexOf(e.target.value.trim());
                    const newValue = oldValue.slice();
                    newValue.splice(index, 1);
                    return newValue;
                });
            }
        }
    }

    const getSectionText = (i: number) => {
        return sections[i].text;
    }

    const getValidSections = () => {
        return sections.filter(x => x.text.trim().length > 10);
    }

    const processResponse = (response: IArticle) => {
        navigate('/articles/' + response.id);
    }

    const submitHandler = () => {
        if (getValidSections.length > 0 && titleIsValid && subTitleIsValid && categoryIsValid) { return; }

        const article = {
            title: titleValue,
            subTitle: subTitleValue,
            category: categoryValue,
            sections: getValidSections()
        }

        const formData = new FormData();
        if (selectedFile) {
            formData.append('articleImage', selectedFile!, selectedFile!.name);
        }

        formData.append('article', JSON.stringify(article));

        setShowDialog(false);

        let options = articleOptions.add(formData);
        sendRequest(options, processResponse);
    }

    return (
        <Grid container spacing={3} textAlign='center'>
            <Grid item xs={12}>
                <Typography variant='h3' component='h1'>Add article</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    sx={{ width: '100%' }}
                    id='title'
                    label='Article title'
                    variant='outlined'
                    type='text'
                    error={titleHasError}
                    disabled={isLoading}
                    value={titleValue}
                    onChange={(e) => {
                        titleChangeHandler(e);
                        setShowDialog(true);
                    }}
                    onBlur={titleBlurHandler} />
            </Grid>
            {titleHasError && <Grid item xs={12}>
                <Alert variant="filled" severity="error">
                    Article title must be at least 5 characters long!
                </Alert>
            </Grid>}
            <Grid item xs={12}>
                <TextField
                    sx={{ width: '100%' }}
                    id='sub-title'
                    label='Article sub-title'
                    variant='outlined'
                    type='text'
                    error={subTitleHasError}
                    disabled={isLoading}
                    value={subTitleValue}
                    onChange={subTitleChangeHandler}
                    onBlur={subTitleBlurHandler} />
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                        labelId="category"
                        id="category"
                        label="Category"
                        error={categoryHasError}
                        disabled={isLoading}
                        value={categoryValue}
                        onChange={(e) => {
                            categoryChangeHandler(e);
                            setShowDialog(true);
                        }}
                        onBlur={categoryBlurHandler}>
                        <MenuItem value='JAVASCRIPT'>JavaScript</MenuItem>
                        <MenuItem value='JAVA'>Java</MenuItem>
                        <MenuItem value='C#'>C#</MenuItem>
                        <MenuItem value='PYTHON'>Python</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            {categoryHasError && <Grid item xs={12}>
                <Alert variant="filled" severity="error">
                    Category is required!
                </Alert>
            </Grid>}
            <Grid item xs={12}>
                <input
                    type='file'
                    ref={uploadInputRef}
                    className={classes['input-file']}
                    onChange={fileChangeHandler} />
                {!fileIsValid && <Typography sx={{ color: '#D32F2F', marginBottom: 3 }}>Selected file is invalid! Supported formats: jpeg and png.</Typography>}
                {selectedFile && <Button className={classes['file-upload-success']} variant='contained' color='success'>File uploaded</Button>}
                <Button sx={{ margin: '0 20px' }} onClick={uploadFileClickHandler} variant='contained' color='secondary'>Upload file</Button>
                {selectedFile && <Button onClick={clearFileHandler} variant='contained' color='error'>Clear file</Button>}
            </Grid>
            {sections.map((s, i) => (
                <Grid item xs={12} key={s.id}>
                    <Grid container spacing={3} textAlign='center'>
                        <Grid item xs={12}>
                            <Typography variant='h5' component='h3'>Section {i + 1} <Button onClick={() => removeSectionClickHandler(i)} variant='contained' color='error' >X</Button></Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ width: '100%' }}
                                id='title'
                                label='Section title'
                                variant='outlined'
                                type='text'
                                disabled={isLoading} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ width: '100%' }}
                                id='text'
                                label='Section text'
                                variant='outlined'
                                type='text'
                                disabled={isLoading}
                                onBlur={(e) => sectionTextBlurHandler(e, i)}
                                error={sectionTextErrors.includes(getSectionText(i))} />
                        </Grid>
                        {sectionTextErrors.includes(getSectionText(i)) && <Grid item xs={12}>
                            <Alert variant="filled" severity="error">
                                Section text must be at least 10 characters long!
                            </Alert>
                        </Grid>}
                        <Grid item xs={12}>
                            <TextField
                                sx={{ width: '100%' }}
                                id='title'
                                label='Gist url'
                                variant='outlined'
                                type='text'
                                disabled={isLoading} />
                        </Grid>
                    </Grid>
                </Grid>
            ))}
            <Grid item xs={12}>
                <Button type='submit' variant='contained' color='secondary' onClick={addSectionHandler}>Add section</Button>
                <Button variant='contained' onClick={submitHandler}>Save article</Button>
            </Grid>
        </Grid>
    )
}

export default CreateArticle;