export interface IStoreObject {
    Products: IProduct[];
    ClubMembers: IClubMember[];
    CasualCustomers: ICasualCustomer[];
    Prices: IPrice[];
}

export interface IProduct {
    ProductId: number;
    CategoryId: number;
    Author: IAuthor;
    Title: string;
    PublicationDate: Date;
    ProductAbstract: string;
    Price: number;
}

export interface IPurchasedProduct {
    CustomerId: number;
    TransactionId: number;
    ProductId: number;
    PurchasedDate: Date;
    PurchaseBasicCost: number;
    Vat: number;
}

export interface ICategory {
    CategoryId: number;
    CategoryType: CategoryType;
}

export interface IClubMember {
    UserId: number;
    LoginName: string;
    Password: string;
    Address: string;
    Phone: string;
    FirstRegistration: Date;
}

export interface ICasualCustomer {
    CustomerId: number;
    Name: string;
    Address: string;
    Email: string;
    FirstPurchase: Date;
}

export interface IPersonnel {
    UserId: number;
    LoginName: string;
    Password: string;
    UserType: UserType;
}

export interface IPrice {
    ProductId: number;
    ProductPrice: number;
}

export interface IBogo {
    ProductId: number;
    BogoLevel: number;
}

export interface ITransaction {
    TransactionId: number;
    CreditCardType: CreditCardType;
    DeliveryMode: DeliveryMode;
    DeliveryDate: Date;
    ShipmentOption: ShipmentOption;
    ShipmentCost: number;
    TotalCost: number;
    Owner: string;
    ShipmenAddress: string;
    Company: ICompany;
}

export interface ICompany {
    CompanyId: number;
    CompanyName: string;
}

export interface IShipmentDetails {
    TransactionId: number;
    Country: ICountry;
    State: string;
    City: string;
    ZipCode: number;
    Street: string;
    HouseNumber: number;
    Pob: number;
    Email: string;
}

export interface IAuthor {
    AuthorId: number;
    AuthorName: string;
}

export interface IDelivery {
    DeliveryId: number;
    DeliveryMode: DeliveryMode;
}

export interface ICountry {
    CountryId: number;
    Country: string;
    ShipmentArea: IShipmentArea;
}

export interface IShipmentArea {
    AreaId: number;
    AreaName: string;
}

enum UserType {
    Marketing, Financial, Administrator
}

export enum CreditCardType {
    Visa, Mastercard, AmericanExpress
}
export enum DeliveryMode {
    electronically, hard
}
export enum ShipmentOption {
    AirStandard, AirExpress, Boat
}

export enum CategoryType {
    Book, Magazine, Newspaper, Article
}