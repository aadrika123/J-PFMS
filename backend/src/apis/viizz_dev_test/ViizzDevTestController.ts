
import { APIv1Response } from "../APIv1";
import ViizzDevTestDao from "./ViizzDevTestDao";


class ViizzDevTestController {
  private dao: ViizzDevTestDao;
  constructor() {
    this.dao = new ViizzDevTestDao();
  }

  get = async () : Promise<APIv1Response> => {

    return new Promise((resolve, reject) => {
      // call dao
      this.dao.get().then((data: any) => {

        if (!data){
          const result =  { status: true, code: 200, message: "Not Found", data: data };
          resolve(result);
        }else{
          const result = { status: true, code: 200, message: "Found", data: data };
          resolve(result);  
        }
      }).catch((error) => {
        reject(error);
      })
    });
  };


}

export default ViizzDevTestController;
