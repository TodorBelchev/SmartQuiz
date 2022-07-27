import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ISection from "../../../interfaces/ISection";

const CreateArticle: React.FC = () => {
    const [sections, setSections] = useState<ISection[]>([]);

    const addSectionHandler = () => {
        setSections(oldState => [...oldState, { id: oldState.length + 1 } as ISection]);
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
                    type='text' />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    sx={{ width: '100%' }}
                    id='sub-title'
                    label='Article sub-title'
                    variant='outlined'
                    type='text' />
            </Grid>
            {sections.map(s => (
                <>
                    <Grid item xs={12}>
                        <Typography variant='h5' component='h3'>Section {s.id}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            sx={{ width: '100%' }}
                            id='title'
                            label='Section title'
                            variant='outlined'
                            type='text' />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            sx={{ width: '100%' }}
                            id='text'
                            label='Section text'
                            variant='outlined'
                            type='text' />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            sx={{ width: '100%' }}
                            id='title'
                            label='Image url'
                            variant='outlined'
                            type='text' />
                    </Grid>
                </>
            ))}
            <Grid item xs={12}>
                <Button type='submit' variant='contained' color='secondary' onClick={addSectionHandler}>Add section</Button>
                <Button variant='contained'>Save article</Button>
            </Grid>
        </Grid>
    )
}

export default CreateArticle;