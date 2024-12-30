import Joi from 'joi';

export const Schemas = {
  LibraryCard: {
    create: Joi.object({
      user: Joi.string().regex(/[0-9a-fA-F]{24}$/).required(),
    }),
    get: Joi.object({
      cardId: Joi.string().regex(/[0-9a-fA-F]{24}$/).required(),
    }),
  },
  Loan: {
    create: Joi.object({
      status: Joi.string().valid("AVAILABLE", "LOANED").required(),
      loanedDate: Joi.date().required(),
      dueDate: Joi.date().required(),
      returnedDate: Joi.date(),
      patron: Joi.string().regex(/[0-9a-fA-F]{24}$/).required(),
      employeeOut: Joi.string().regex(/[0-9a-fA-F]{24}$/).required(),
      employeeIn: Joi.string().regex(/[0-9a-fA-F]{24}$/),
      item: Joi.string().regex(/[0-9a-fA-F]{24}$/).required(),
    }),
    update: Joi.object({
      _id: Joi.string().regex(/[0-9a-fA-F]{24}$/).required(),
      status: Joi.string().valid("AVAILABLE", "LOANED").required(),
      loanedDate: Joi.date().required(),
      dueDate: Joi.date().required(),
      returnedDate: Joi.date(),
      patron: Joi.string().regex(/[0-9a-fA-F]{24}$/).required(),
      employeeOut: Joi.string().regex(/[0-9a-fA-F]{24}$/).required(),
      employeeIn: Joi.string().regex(/[0-9a-fA-F]{24}$/),
      item: Joi.string().regex(/[0-9a-fA-F]{24}$/).required(),
    }),
    query: Joi.object({
      property: Joi.string()
        .valid("_id", "status", "loanedDate", "dueDate", "returnedDate", "patron", "employeeOut", "employeeIn", "item")
        .required(),
      value: Joi.alternatives().try(Joi.string(), Joi.date()).required(),
    }),
  },
};
