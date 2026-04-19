import client from "./client"

export const getTasks = (params) =>
    client.get("/tasks", { params }).then((r) => r.data)

export const createTask = (data) =>
    client.post("/tasks", data).then((r) => r.data)

export const updateTask = (id, data, changedById) =>
    client.patch(`/tasks/${id}`, data, {
        params: { changed_by_id: changedById }
    }).then((r) => r.data)

export const deleteTask = (id) =>
    client.delete(`/tasks/${id}`)
