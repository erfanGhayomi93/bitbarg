import React from 'react'
import { TextField, InputAdornment, IconButton, Box, Button, FormControl, InputLabel, Select, MenuItem, Autocomplete } from '@mui/material'
import { makeStyles, withStyles } from '@mui/styles'
import SearchIcon from '@mui/icons-material/Search';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { filterPriceType } from '../../pages';

const CustomTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: 8,
                border: "1px solid #e0e0e0",
            },
        },
    },
})(TextField);

const useStyles = makeStyles({
    filter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 25
    },
    autocomplete: {
        '& .muirtl-17vbkzs-MuiFormControl-root-MuiTextField-root': {
            margin: 0
        }
    },
    button: {
        padding: "0 47px",
        height: 56,
        border: "1px solid #e0e0e0",
        whiteSpace: "nowrap"
    },
    select: {
        border: "1px solid #e0e0e0",
    },
    buttonGroup: {
        width: "345px",
        border: "1px solid #e0e0e0",
        height: 56,
        display: "flex",
        borderRadius: 8,
    },
    buttonActive: {
        margin: 4,
        backgroundColor: "#4285F21A",
        color: "#4285F2",
        fontWeight: 400
    },
    buttonDeactive: {
        margin: 3,
        color: "black",
        fontWeight: 400
    },
   
})

export default function Filter({ filterPrice, setfilterPrice, search, setsearch, sort, setsort }) {
    const classes = useStyles()

    return (
        <div className={classes.filter}>
            <Box>
                <Box mr={"6px"} width={340}>
                    <CustomTextField
                        variant='outlined'
                        fullWidth
                        placeholder='جستجو'
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>
            </Box>
            <Box display={"flex"} alignItems="center">
                <Box mx={"6px"}>
                    <Button
                        className={`${classes.button}`}
                        variant="outlined"
                        color="inherit"
                        startIcon={<StarOutlineIcon />}
                    >
                        نشان شده‌ها
                    </Button>
                </Box>

                <Box width={195} mx={"6px"}>
                    <Autocomplete
                        options={optionsSort}
                        getOptionLabel={option => option.label}
                        id="controlled"
                        value={sort}
                        onChange={(event, newValue) => {
                            setsort(newValue);
                        }}
                        renderInput={params => (
                            <CustomTextField {...params} label="ترتیب بر اساس" margin="normal" fullWidth />
                        )}
                        className={classes.autocomplete}
                    />
                </Box>
            </Box>
            <Box>
                <Box ml={"6px"} className={classes.buttonGroup}>
                    <Button
                        className={filterPrice === filterPriceType.toman ? classes.buttonActive : classes.buttonDeactive}
                        fullWidth
                        onClick={() => setfilterPrice(filterPriceType.toman)}
                    >
                        تومان
                    </Button>
                    <Button
                        className={filterPrice === filterPriceType.ttr ? classes.buttonActive : classes.buttonDeactive}
                        onClick={() => setfilterPrice(filterPriceType.ttr)}
                        fullWidth
                    >
                        تتر
                    </Button>
                </Box>
            </Box>
        </div>
    )
}


const optionsSort = [
    { label: "بیشترین قیمت", value: "2" },
    { label: "کمترین قیمت", value: "1" },
]