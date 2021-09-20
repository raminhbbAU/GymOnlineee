const login = async(userName,password,type) => {
    switch(type){
        case "Gym":
            return await gymLogin(userName,password);
            break;
        case "Trainer":
            return await trainerLogin(userName,password);
            break;
        case "Athlete":
            return await athleteLogin(userName,password);
            break;
        default:
            throw 'The usertype is not defined';
            break;
    }
}

const gymLogin =  async(userName,password) => {
    console.log("gymLogin called");
    return 1;
}

const trainerLogin =  async(userName,password) => {
    throw 'this service is unreachable now.'
    return 1;
}

const athleteLogin =  async(userName,password) => {
    throw 'this service is unreachable now.'
    return 1;
}

export default {login};