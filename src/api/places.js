import axios from "axios";

const host = "http://localhost:3001";

export async function postPlace(payload, signal) {
  return axios.post(`${host}/places`, payload, {
    signal,
  });
}

export async function getPlaces(signal) {
  return axios.get(`${host}/places`, {
    signal,
  });
}

export async function getPlace(id, signal) {
  return axios.get(`${host}/places/${id}`, {
    signal,
  });
}

export async function patchPlace(id, payload, signal) {
  return axios.patch(`${host}/places/${id}`, payload, {
    signal,
  });
}

export async function putPlace(id, payload, signal) {
  return axios.put(`${host}/places/${id}`, payload, {
    signal,
  });
}

export async function deletePlace(id, signal) {
  return axios.delete(`http://localhost:3001/places/${id}`, {
    signal,
  });
}
