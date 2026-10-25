export class APIUtils {
    constructor(request, token) {
        this.request = request;
        this.token = token;
    }

    async login(data){
        return await this.request.post('/auth',{
        data: data
        })
    }

    async createBooking(info){
        return await this.request.post('/booking', {
         data: info
        })
    }
<<<<<<< HEAD

    async test(){
        
    }
=======
>>>>>>> 4f5d297a4490192ceb9018ce732e30b8f62c0886
}