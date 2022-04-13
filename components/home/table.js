import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { withStyles, makeStyles } from '@mui/styles';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { findCurrencyColor, handleNumber } from '../common/methods';
import { Box } from '@mui/material';
import { filterPriceType } from '../../pages';
import InfiniteScroll from "react-infinite-scroll-component";



const MuiTableHead = withStyles(() => ({
    root: {
        backgroundColor: '#fafafa',

    }
}))(TableHead);

const TableHeaderCell = withStyles(() => ({
    root: {
        border: "none",
        marginBottom: 15,
        padding: "14px 16px",
        whiteSpace: "nowrap",
        color: "#212121"
    }
}))(TableCell);

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        boxShadow: "none"
    },
    number: {
        backgroundColor: "#e0e0e0",
        color: "",
        display: "inline-block",
        marginRight: 3,
        fontWeight: 600,
        height: 13,
        minWidth: 13,
        borderRadius: 2
    },
    textMuted: {
        color: "rgba(0, 0, 0, 0.6)"
    },
    bolder: {
        fontWeight: "bold"
    }
});


export default function BasicTable({ data, filterPrice, fetchMoreData, page }) {
    const classes = useStyles()

    const handleColorPercent = (value) => {
        return { color: findCurrencyColor(value) }
    }

    const handleDataPriceBuy = (ttrPrice) => {
        return (
            <>
                <span>{handleNumber(ttrPrice * data.meta.prices.buy)}</span>
                {'\u00A0'}
                <span className={classes.textMuted}>تومان</span>
            </>
        )
    }

    const handleDataPriceSell = (ttrPrice) => {
        return (
            <>
                <span>{handleNumber(ttrPrice * data.meta.prices.sell)}</span>
                {'\u00A0'}
                <span className={classes.textMuted}>تومان</span>
            </>
        )
    }



    return (
        <InfiniteScroll
            dataLength={data.items.length}
            next={fetchMoreData}
            hasMore={data.meta.paginateHelper.lastPage !== page}
            loader={<h4>Loading...</h4>}
        >
            <TableContainer className={classes.table} component={Paper} >
                <Table aria-label="table">
                    <MuiTableHead>
                        <TableRow>
                            <TableHeaderCell align="center">نشان کردن</TableHeaderCell>
                            <TableHeaderCell align="center">تغییرات</TableHeaderCell>
                            <TableHeaderCell align="center">نمودار</TableHeaderCell>
                            <TableHeaderCell align="center" minwidth="250px">
                                {filterPrice === filterPriceType.toman ? "قیمت فروش" : "ارزش بازار"}
                            </TableHeaderCell>
                            <TableHeaderCell align="center" minwidth="250px">
                                {filterPrice === filterPriceType.toman ? "قیمت خرید" : "قیمت جهانی"}
                            </TableHeaderCell>
                            <TableHeaderCell align="center">ارز دیجیتال</TableHeaderCell>
                        </TableRow>
                    </MuiTableHead>
                    <TableBody>

                        {data.items.map((row, ind) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align='center' component="th" scope="row">
                                    <StarOutlineIcon />
                                </TableCell>
                                <TableCell align="center" dir="ltr" style={handleColorPercent(row.percent)}>{`${row.percent}%`}</TableCell>
                                <TableCell align="center" >
                                </TableCell>
                                <TableCell align="center" dir="ltr">
                                    {
                                        filterPrice === filterPriceType.ttr ?
                                            `${handleNumber(row.quote)} USDT` :
                                            handleDataPriceSell(row.price)
                                    }
                                </TableCell>
                                <TableCell align="center" dir="ltr">
                                    {
                                        filterPrice === filterPriceType.ttr ?
                                            <span className={classes.bolder}>{handleNumber(row.price)}</span> :
                                            handleDataPriceBuy(row.price)
                                    }
                                </TableCell>
                                <TableCell align="center">
                                    <Box display="flex" alignItems="center" justifyContent={"right"} pr="15px">
                                        <Box mr="5px">
                                            <p>{row.enName}</p>
                                            <p>
                                                <span className={classes.textMuted}>
                                                    {row.coin}
                                                </span>
                                                <span className={classes.number}>{ind + 1}</span>
                                            </p>
                                        </Box>

                                        <img width="36px" height="36px" src={row.icon} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </InfiniteScroll>
    );
}
