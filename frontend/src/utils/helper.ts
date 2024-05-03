/**
 * | Author- Sanjiv Kumar
 * | Created On- 08-02-2024
 * | Created for- Input Field
 * | Status- done
 */

export default function goBack() {
  // Use the history object to navigate back
  window.history.back();
}

export function DateFormatter(date: string) {
  if(!date) return "";
  
  return new Date(date).toISOString().split("T")[0];
}

/**
 * | Author- Krish
 * | Created On- 09-02-2024
 * | Created for- Format String
 * | Status- closed
 */
export function formatString(input: string): string {
  const regex = /(?:^|-)([a-z])/g;
  const result = input?.replace(regex, (_, match) => ` ${match.toUpperCase()}`);
  return result;
}

/// Filtering unnecssary field before stroring
export const filterValBefStoring = (values: any) => {
  function mapingObject(obj: any) {
    const modifiedObj = {...obj};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(modifiedObj, key)) {

        if(!modifiedObj[key] || modifiedObj[key] === "" || modifiedObj[key] === undefined){
          delete modifiedObj[key];
        }
        if (key.toLowerCase().endsWith("id_name") || key === "id" || key.toLowerCase().startsWith("del_")) {
          delete modifiedObj[key];
        } else if (key.toLowerCase().endsWith("date")) {
          if(modifiedObj[key]){
            modifiedObj[key] = `${new Date(modifiedObj[key])?.toISOString()}`;
          }
        }
      }
    }
    return modifiedObj;
  }

  if (values.length > 0) {
    return values.map((item: any) => {
      return mapingObject(item); // Return the modified item
    });
  } else {
    return mapingObject(values); // Return the modified values
  }
};


  // format currency: Bijoy Paitandi
  export const fc = (n: number) => {
    // if(n == undefined || n == null)
    //   return  "";
    return n.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: 'currency',
      currency: 'INR'
    });
  }


