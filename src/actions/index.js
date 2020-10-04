import axios from 'axios'

export function fetchResource() {
    return axios.get("/api/resources").then(res => res.data)
}

export function updateResource(id, resource) {
    return axios.patch(`/api/resources/${id}`, resource).then(res => res.data).catch(err => Promise.reject(err?.response?.data))
}

export function deleteResource(id) {
    return axios.delete(`/api/resources/${id}`).then(res => res.data).catch(err => Promise.reject(err?.response?.data))
}

export function createResource(resource) {
    return axios.post(`/api/resources`,resource).then(res => res.data).catch(err => Promise.reject(err?.response?.data))
}