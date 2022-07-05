import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";

const CreateQuiz: React.FC = () => {
    const [questions, setQuestions] = useState<number[]>([]);

    const addQuestionHandler = () => {
        setQuestions(oldState => [...oldState, oldState.length + 1]);
    }

    return (
        <form>
            <Grid container spacing={3} textAlign='center'>
                <Grid item xs={12}>
                    <Typography variant='h3' component='h1'>Add quiz</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{ width: '100%' }}
                        id='title'
                        label='Quiz title'
                        variant='outlined'
                        type='text' />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            labelId="category"
                            id="demo-simple-select"
                            label="Category"
                        >
                            <MenuItem value='JavaScript'>JavaScript</MenuItem>
                            <MenuItem value='Java'>Java</MenuItem>
                            <MenuItem value='C#'>C#</MenuItem>
                            <MenuItem value='Python'>Python</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={addQuestionHandler}>Add question</Button>
                </Grid>
                {questions.map(q => (
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ width: '100%' }}
                                id={`Question ${q}`}
                                label={`Question ${q}`}
                                variant='outlined'
                                type='text' />
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </form>
    )
}

export default CreateQuiz;