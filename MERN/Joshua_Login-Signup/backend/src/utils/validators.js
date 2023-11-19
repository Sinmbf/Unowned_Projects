import { body, validationResult } from "express-validator";
export const validate = (validations) => {
  return async function (req, res, next) {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    // Check if there are any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    // If no errors then move on to next function
    next();
  };
};

export const loginValidator = [
  body("username", "Please enter a valid username/email").trim().isEmail(),
  body("password", "Passwords must be minimum 6 characters")
    .trim()
    .isLength({ min: 6 }),
  body("userType", "Please enter a valid user type").trim().notEmpty(),
];

export const signupValidator = [...loginValidator];
