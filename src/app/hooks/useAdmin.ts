import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAdminByEmail = async () => {
    const response = await axios.get("/api/admin");
    return response.data;
};


export const useAdmin = () => {
    return useQuery({
        queryKey: ["admin"],
        queryFn: () => getAdminByEmail(),
    });
}
