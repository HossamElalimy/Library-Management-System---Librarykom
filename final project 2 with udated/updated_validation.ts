
import Joi from 'joi';

export const validationSchemas = {
    user: {
        create: Joi.object({
            type: Joi.string().valid('ADMIN', 'EMPLOYEE', 'PATRON').required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().regex(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
            password: Joi.string().required(),
        }),
        update: Joi.object({
            _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            type: Joi.string().valid('ADMIN', 'EMPLOYEE', 'PATRON').required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().regex(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
            password: Joi.string().required(),
        }),
    },
    book: {
        create: Joi.object({
            barcode: Joi.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)\D*\d+$/).required(),
            cover: Joi.string().required(),
            title: Joi.string().required(),
            authors: Joi.array().required(),
            description: Joi.string().required(),
            subjects: Joi.array().required(),
            publicationDate: Joi.date().required(),
            publisher: Joi.string().required(),
            pages: Joi.number().required(),
            genre: Joi.string().required(),
        }),
        update: Joi.object({
            _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            barcode: Joi.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)\D*\d+$/).required(),
            cover: Joi.string().required(),
            title: Joi.string().required(),
            authors: Joi.array().required(),
            description: Joi.string().required(),
            subjects: Joi.array().required(),
            publicationDate: Joi.date().required(),
            publisher: Joi.string().required(),
            pages: Joi.number().required(),import Joi, { ObjectSchema } from 'joi';
            import { NextFunction, Response, Request } from 'express';
            import { IUser } from '../models/User';
            
            export function ValidateSchema(schema: ObjectSchema, property: string) {
              return async (req: Request, res: Response, next: NextFunction) => {
                try {
                  switch (property) {
                    case 'query':
                      await schema.validateAsync(req.query);
                      break;
                    case 'params':
                      await schema.validateAsync(req.params);
                      break;
                    default:
                      await schema.validateAsync(req.body);
                  }
                  next();
                } catch (error) {
                  return res
                    .status(422)
                    .json({ message: 'Object validation failed, please include a valid object' });
                }
              };
            }
            
            export const Schemas = {
              user: {
                create: Joi.object<IUser>({
                  type: Joi.string().valid('ADMIN', 'EMPLOYEE', 'PATRON').required(),
                  firstName: Joi.string().required(),
                  lastName: Joi.string().required(),
                  email: Joi.string().regex(/[^@ \t\r\n]+@[^@ t\r\n]+•[^@ t\r\n]+/).required(),
                  password: Joi.string().required(),
                }),
                login: Joi.object<{ email: string; password: string }>({
                    email: Joi.string().regex(/[^@ \t\r\n]+@[^@ t\r\n]+•[^@ t\r\n]+/).required(),
                  password: Joi.string().required(),
                }),
                userId: Joi.object<{ userId: string }>({
                  userId: Joi.string()
                    .regex(/^[0-9a-fA-F]{24}$/)
                    .required(),
                }),
                update: Joi.object<IUser>({
                  _id: Joi.string()
                    .regex(/^[0-9a-fA-F]{24}$/)
                    .required(),
                  type: Joi.string().valid('ADMIN', 'EMPLOYEE', 'PATRON').required(),
                  firstName: Joi.string().required(),
                  lastName: Joi.string().required(),
                  email: Joi.string()
                    .regex(/[^@ \t\r\n]+@[^@ t\r\n]+•[^@ t\r\n]+/)
                    .required(),
                  password: Joi.string(),
                }),
              },
              book: {
                create: Joi.object({
                    barcode: Joi.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)\D*\d+$/).required(),
                    cover: Joi.string().required(),
                    title: Joi.string().required(),
                    authors: Joi.array().required(),
                    description: Joi.string().required(),
                    subjects: Joi.array().required(),
                    publicationDate: Joi.date().required(),
                    publisher: Joi.string().required(),
                    pages: Joi.number().required(),
                    genre: Joi.string().required(),
                }),
                update: Joi.object({
                    _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
                    barcode: Joi.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)\D*\d+$/).required(),
                    cover: Joi.string().required(),
                    title: Joi.string().required(),
                    authors: Joi.array().required(),
                    description: Joi.string().required(),
                    subjects: Joi.array().required(),
                    publicationDate: Joi.date().required(),
                    publisher: Joi.string().required(),
                    pages: Joi.number().required(),
                    genre: Joi.string().required(),
                }),
                delete: Joi.object({
                    barcode: Joi.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)\D*\d+$/).required(),
                }),
            },
            };
            
            genre: Joi.string().required(),
        }),
        delete: Joi.object({
            barcode: Joi.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)\D*\d+$/).required(),
        }),
    },
};
//in middleware