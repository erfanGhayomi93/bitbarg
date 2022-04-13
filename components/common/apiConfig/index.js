import axios from "axios";


const AxiosCustom = (_config = {}, _data = {}) => {
    let config = {
        baseURL: "https://api.bitbarg.me/api/v1/",
        headers: { "content-type": "application/json", "Access-Control-Allow-Origin": "*" },
        ..._config,
        data: _data
    }

    return (
        axios(config)
    )
}


export default AxiosCustom;