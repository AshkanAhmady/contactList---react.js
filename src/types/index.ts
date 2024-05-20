export type ContactType = {
    name: string;
    email: string;
    gender: "male" | "female";
    phone: number;
    emailPhoneShow: "email" | "phone";
    id?: number
}