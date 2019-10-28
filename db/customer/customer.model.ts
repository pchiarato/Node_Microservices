import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
    firstName: string;
    lastName: string;
    email: string;
    dateCreated: Date;
}

const validateEmail = (email: string): boolean => {
    return /\w+\.?_?\w+@\.?_?\w+\.\w{2,}/.test(email);
};
const emailValidation = {validator: validateEmail,
     message: (props: any) => `${props.value} is not a valid email!`};
const customerSchema: Schema = new Schema({
    firstName: {type: String, required: true, minlength: 2},
    lastName: {type: String, required: true, minlength: 2},
    email: {type: String, required: true, unique: true,
        validate: emailValidation},
    dateCreated: {type: Date, required: true, default: new Date().toLocaleString()},
});


export default mongoose.model<ICustomer>('customers', customerSchema);
