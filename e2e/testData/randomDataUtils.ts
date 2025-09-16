import { faker } from '@faker-js/faker';
import { OrderDetails } from './orderDetailsInterface';

export function getOrderDetailsRandomData(): OrderDetails {
    return {
        name: faker.person.firstName() + ' ' + faker.person.lastName(),
        country: faker.location.country(),
        city: faker.location.city(),
        creditCard: faker.finance.creditCardNumber(),
        month: faker.date.month(),
        year: faker.date.future({ years: 10 }).getFullYear().toString(),
    };
}