import dayjs from "dayjs";
import React, { useState } from "react";
import axios from "axios";
import Routes from "@/json/routes.json";
import { useQuery } from "react-query";
import BackButton from "../atoms/BackButton";
import PrintButton from "../atoms/PrintButton";
import Loader from "../atoms/Loader";
import Input from "../atoms/Input";

interface DropDownListItem{
    caption: string;
    value: number | string;
}

interface FieldProps{
    name: string;
    caption: string;
    type?: 'date';
    options?: DropDownListItem [];
}

interface DataViewFormProps{
    api: string;
    title: string;
    fields: Array<FieldProps>
    onBack?: () => void;
}

const DataViewForm = <T, >({title, fields, api, onBack}: DataViewFormProps) => {
    const [data, setData] = useState<T[]>([]);

       // ----- FETCH DATA ------////
   const fetchData = async (): Promise<T []> => {
    const res = await axios({
      url: api,
      method: "GET",
    });
    
    const data = res.data.data;

    if(!data){
      window.alert("The Receipt record not found");
      window.open(Routes.receipt_entry, "_self");
    }
    setData(data);

    console.log(data);
    return data;
  };


  const {
    isError: fetchingError,
    isLoading: isFetching,
  } = useQuery([], fetchData);

  if (fetchingError) {
    console.log(fetchingError);
    window.alert("some error occurred");
  }  




    const fieldSet = fields.map((field, index) => {
        const value = data[field.name as keyof typeof data];
        
        if (field.type != undefined){
            if(field.type == "date"){
                const value1 = dayjs(new Date(value as string)).format("DD MMM YYYY");
                return (
                    <Input readonly key={`field-${index}`} label={field.caption} value={value1}/>
                );
            }
        }

        else if(typeof value == "string"){
            return (
                <Input readonly key={`field-${index}`} label={field.caption} value={value}/>
            );
        }else if(typeof value ==  "number"){
            return (
                <Input readonly key={`field-${index}`} label={field.caption} value={value}/>
            );
        }
        else{
            return (
                <div key={`field-${index}`}>Unknown</div>
            );
        }
        
    });
    
    return(
        <>
        <section className="border rounded-lg border-zinc-300 p-6 px-10">
            <div className="flex justify-between">
                <div className="text-secondary text-sub_head font-semibold">{title}</div>
            </div>

            {isFetching ? (<Loader/>) : (
                <>
                <div className="mt-8">
                    <form>
                        <div className="grid grid-cols-2 gap-x-6 gap-4 ">
                            {fieldSet}
                        </div>
                    </form>
                </div>

                <div className="mt-4 flex items-center gap-5 justify-end">
                    <BackButton onClick={onBack} />
                    <PrintButton onClick={() => window.alert("coming soon")}/>
                </div>
                </>
                
            )}
            
        </section>
        </>
    );
}

export default DataViewForm;