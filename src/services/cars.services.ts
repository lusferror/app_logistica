import axios from "axios";

export const carsInstance = axios.create({
    baseURL: "https://api.api-ninjas.com/v1",
    headers: {
        "X-Api-Key": import.meta.env.VITE_API_KEY,
        "Content-Type": "application/json"
    }
});

export async function getCars(params:string = ''): Promise<any> {
    try{
        const response = await carsInstance.get('/cars?limit=50' + params);
        return response.data;
    }
    catch(e){
        console.error(e);
    }
}