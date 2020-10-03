import axios from 'axios'

export function fetchResource() {
    return axios.get("/api/resources").then(res => res.data)
}

export function updateResource(id, resource) {
    return axios.patch(`/api/resources/${id}`, resource).then(res => res.data).catch(err => Promise.reject(err?.response?.data))
}
