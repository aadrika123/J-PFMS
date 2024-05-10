
class ViizzDevTestDao {
  async get() : Promise<any>{
    return new Promise((resolve) => {
      const data =  [
        {'name': 432423}
      ];  
      resolve(data);
    });
  }
}

export default ViizzDevTestDao;
