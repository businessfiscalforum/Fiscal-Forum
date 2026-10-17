import { relations } from "drizzle-orm/relations";
import { users, carInsuranceRequests, healthInsuranceRequests, lifeInsuranceRequests, propertyInsuranceRequests, personalAccidentInsuranceRequests, twoWheelerInsuranceRequests, commercialVehicleInsuranceRequests, withdrawalRequests, travelInsuranceRequests } from "./schema";

export const carInsuranceRequestsRelations = relations(carInsuranceRequests, ({one}) => ({
	user: one(users, {
		fields: [carInsuranceRequests.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	carInsuranceRequests: many(carInsuranceRequests),
	healthInsuranceRequests: many(healthInsuranceRequests),
	lifeInsuranceRequests: many(lifeInsuranceRequests),
	propertyInsuranceRequests: many(propertyInsuranceRequests),
	personalAccidentInsuranceRequests: many(personalAccidentInsuranceRequests),
	twoWheelerInsuranceRequests: many(twoWheelerInsuranceRequests),
	commercialVehicleInsuranceRequests: many(commercialVehicleInsuranceRequests),
	withdrawalRequests: many(withdrawalRequests),
	travelInsuranceRequests: many(travelInsuranceRequests),
}));

export const healthInsuranceRequestsRelations = relations(healthInsuranceRequests, ({one}) => ({
	user: one(users, {
		fields: [healthInsuranceRequests.userId],
		references: [users.id]
	}),
}));

export const lifeInsuranceRequestsRelations = relations(lifeInsuranceRequests, ({one}) => ({
	user: one(users, {
		fields: [lifeInsuranceRequests.userId],
		references: [users.id]
	}),
}));

export const propertyInsuranceRequestsRelations = relations(propertyInsuranceRequests, ({one}) => ({
	user: one(users, {
		fields: [propertyInsuranceRequests.userId],
		references: [users.id]
	}),
}));

export const personalAccidentInsuranceRequestsRelations = relations(personalAccidentInsuranceRequests, ({one}) => ({
	user: one(users, {
		fields: [personalAccidentInsuranceRequests.userId],
		references: [users.id]
	}),
}));

export const twoWheelerInsuranceRequestsRelations = relations(twoWheelerInsuranceRequests, ({one}) => ({
	user: one(users, {
		fields: [twoWheelerInsuranceRequests.userId],
		references: [users.id]
	}),
}));

export const commercialVehicleInsuranceRequestsRelations = relations(commercialVehicleInsuranceRequests, ({one}) => ({
	user: one(users, {
		fields: [commercialVehicleInsuranceRequests.userId],
		references: [users.id]
	}),
}));

export const withdrawalRequestsRelations = relations(withdrawalRequests, ({one}) => ({
	user: one(users, {
		fields: [withdrawalRequests.userId],
		references: [users.id]
	}),
}));

export const travelInsuranceRequestsRelations = relations(travelInsuranceRequests, ({one}) => ({
	user: one(users, {
		fields: [travelInsuranceRequests.userId],
		references: [users.id]
	}),
}));