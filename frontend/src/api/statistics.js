import client from "./client"

export const getAvgTimePerStatus = () =>
    client.get("/statistics/avg-time-per-status").then((r) => r.data)

export const getTopProductiveUsers = () =>
    client.get("/statistics/top-productive-users").then((r) => r.data)
