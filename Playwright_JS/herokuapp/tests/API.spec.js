import { test, expect } from "@playwright/test";
import { APIUtils } from "../utils/APIUtils";
let token;

test('Getting Login Token', async ({request}) => {
    const apiUtils = new APIUtils(request);
    const loginResponse = await apiUtils.login({username: 'admin', password: 'password123' });
    await expect(loginResponse).toBeOK();
    token = await loginResponse.json();
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
    expect (response.booking.firstname).toBe('James');
    expect (response.booking.lastname).toBe('Brown');
})