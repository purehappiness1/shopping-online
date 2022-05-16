import { createClient } from "@supabase/supabase-js";
import env from "react-dotenv";

const supabaseUrl = "https://dodcqepndagqxiaqigbt.supabase.co";
const supabaseKey = env.REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchCarsStock() {
    return supabase.from("Cars").select("*");
}

export async function updateDatabaseQuantity(cars) {
    const updateRequests = cars.map(({title, quantity, id}) => supabase
        .from("Cars")
        .update([{title, quantity: quantity - 1}]).match({id}))
    await Promise.all(updateRequests)
}