import { test, expect } from "@playwright/test";
import { APIUtils } from "../utils/APIUtils";
let token;
let updatedData = {
    firstname : "Mark",
    lastname : "White",
    totalprice : 111,
    depositpaid : true,
    bookingdates : {
        checkin : "2026-01-01",
        checkout : "2019-01-01"
    },
    additionalneeds : "Breakfast"
}

test.describe('Booking Service', () => {

    test.beforeAll('Getting Auth Token', async ({request}) => {
    const apiUtils = new APIUtils(request);
    const loginResponse = await apiUtils.login({username: 'admin', password: 'password123' });
    await expect(loginResponse).toBeOK();
    const response = await loginResponse.json();
    token = response.token;
    console.log(token);
    })

    test('Invalid Login Credential', async ({request}) => {
        const apiUtils = new APIUtils(request);
        const loginResponse = await apiUtils.login({username: 'admin1', password: 'password1234' });
        expect(loginResponse).toBeOK();
        const response = await loginResponse.json();
        expect (response).toHaveProperty('reason','Bad credentials');
    })

    test('Creating Booking', async ({request}) => {
        const apiUtils = new APIUtils(request);
        const bookingResponse = await apiUtils.createBooking({
            firstname : "James",
            lastname : "Brown",
            totalprice : 111,
            depositpaid : true,
            bookingdates : {
                checkin : "2018-01-01",
                checkout : "2019-01-01"
            },
            additionalneeds : "Breakfast"
        })
        expect(bookingResponse.status()).toBe(200);
        const response = await bookingResponse.json();
        expect (response.firstname).toBe('James');
        expect (response.lastname).toBe('Brown');
    })

    test.only('Updating the Booking', async ({page, request}) => {
        const apiUtils = new APIUtils(request);
        const { bookingid } = await (await apiUtils.createBooking({
            firstname : "James",
            lastname : "Brown",
            totalprice : 111,
            depositpaid : true,
            bookingdates : {
                checkin : "2018-01-01",
                checkout : "2019-01-01"
            },
            additionalneeds : "Breakfast"
        })).json();

        const updatedResponse = await apiUtils.updatingBooking(updatedData, bookingid, token);
        expect(updatedResponse.status()).toBe(200);
        const response = await updatedResponse.json();
        expect (response.firstname).toBe('Mark');
        expect (response.lastname).toBe('White');
    })
})

