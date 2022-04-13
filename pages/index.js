import { makeStyles } from "@mui/styles"
import { useEffect , useState } from "react"
import AxiosCustom from "../components/common/apiConfig"
import Filter from "../components/home/filter"
import Header from "../components/home/header"
import Table from "../components/home/table"


const useStyles = makeStyles({
  container: {
    backgroundColor: "#fafafa",
    padding: "100px 32px 32px",
  },
  root: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 32,
    boxShadow: "0 40px 72px rgb(179 179 179 / 8%)",
    maxWidth: 1200,
    margin: "auto"
  },
})

export const filterPriceType = {
  toman: "TOMAN",
  ttr: "TTR"
}

const typeApiCall = {
  more: "MORE",
  change_filter: "CHANGE_FILTER"
}

export default function Home({ result }) {
  const classes = useStyles()
  const [filterPrice, setfilterPrice] = useState(filterPriceType.ttr)
  const [data, setdata] = useState(result)
  const [page, setpage] = useState(1)
  const [didMount, setdidMount] = useState(false)
  const [search, setsearch] = useState("")
  const [sort, setsort] = useState(null)  /// 0 => default , 1 => lowest price , 2 => highest price

  const apiCall = async (typeApi) => {
    let config = {
      url: `currencies?page=${typeApi === typeApiCall.more ? page : 1}&q=${search.trim()}&sort=${sort ? sort.value : ""}`,
      method: "get"
    }

    await AxiosCustom(config)
      .then(res => {
        if (res.data.success) {
          let { result } = res.data
          if (typeApi === typeApiCall.more) {
            setdata(prev => ({
              ...result,
              items: [...prev.items, ...result.items],
            }))
          } else {
            setdata(result)
          }
        }
      })
  }

  const fetchMoreData = () => {
    setpage(prev => prev + 1)
  }

  useEffect(() => {
    if (page !== 1) {
      apiCall(typeApiCall.more)
    }
  }, [page])


  useEffect(() => {
    if (didMount) {
      setpage(1)
      apiCall(typeApiCall.change_filter)
    }
    setdidMount(true)
  }, [search, sort])


  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <Header
          data={data}
        />
        <Filter
          filterPrice={filterPrice}
          setfilterPrice={setfilterPrice}
          search={search}
          setsearch={setsearch}
          sort={sort}
          setsort={setsort}
        />
        <Table
          data={data}
          filterPrice={filterPrice}
          fetchMoreData={fetchMoreData}
          page={page}
        />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  let config = {
    url: "currencies",
    method: "get"
  }

  let result = {}

  await AxiosCustom(config)
    .then(res => {
      if (res.data.success) {
        result = res.data.result
      }
    })

  return {
    props: {
      result
    }
  }
}