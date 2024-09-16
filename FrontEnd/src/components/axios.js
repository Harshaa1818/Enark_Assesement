import axios from "axios"

const apiInstance = () => {
    axios.create({
        baseURL: 'https://api.webfuze.in/api/v1',
        headers: {
            'Authorization': 'Bearer ' + document.cookie.split('=')[1],
        },
    })
}

export { apiInstance }