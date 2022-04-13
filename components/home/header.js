import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'

const useStyles = makeStyles({
    onlineDot: {
        display: "inline-block",
        backgroundColor: "#fbbd06",
        width: 8,
        height: 8,
        borderRadius: "50%",
        margin: "0 32px 0 8px",
    },
    onlineText: {
        display: "inline-block",
        lineHeight: 1.5,
        color: "rgba(0, 0, 0, 0.6)",
    }
})

export default function Header({data}) {
    const classes = useStyles()

    return (
        <Box display="flex" alignItems="center">
            <h2>قیمت لحظه‌ای</h2>
            <p>
                <span className={classes.onlineDot}></span>
                <span className={classes.onlineText}>{data.meta.paginateHelper.total} ارز دیجیتال</span>
            </p>
        </Box>
    )
}
