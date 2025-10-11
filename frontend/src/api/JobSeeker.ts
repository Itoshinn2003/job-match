import axios from axios;

export const create = async (params: {
    email: String,
    password: String
}) => {
    const response = await axios.post("/api/v1/companies", params);
    return response.data as { id: number, message: string };
}

