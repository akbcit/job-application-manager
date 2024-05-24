/* eslint-disable @typescript-eslint/no-unused-vars */
import { Paper } from "@mui/material";
import { JobQuery } from "../clientModels/jobQuery.model";
import { CitySelect } from "./CitySelect";
import { City } from "../clientModels/city.model";
import { useState } from "react";

interface JobQueriesEditorProps {
    onQueriesSave: (jobQueries: Array<JobQuery>) => void;
}

export const JobQueriesEditor: React.FC<JobQueriesEditorProps> = () => {

    const [selectedCity,setSelectedCity] = useState<City | null>(null);

    const onSelectedCityChange = (newCity:City | null)=>{
        setSelectedCity(newCity);
    }

    return (
        <Paper elevation={3} id="add-queries-container">
            <CitySelect onCitySelect={onSelectedCityChange}/>
        </Paper>
    )
}