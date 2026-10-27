export class APIUtils {
    constructor(request) {
        this.request = request;
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

    async updatingBooking(info, id, token){
        return await this.request.put(`/booking/${id}`, {
            data: info,
            headers: {'Cookie' : `token=${token}`}
        })
    }
}