import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { CustomError } from "../helpers";
import { UserRepo } from "../repositories";

//MM-3
const login = async (body: any) => {
  try {
    const { email, password } = body;
    const user = await UserRepo.findOneOrFail({ where: { email: email } });
    // verify password
    if (!(await compare(password, user.password)))
      throw new CustomError({ status: 401, message: "Password is invalid." });
    // generate JWT tokens
    const payload = { userId: user.id, type: user.type };
    const access_token = sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_expiresIn });
    const refresh_token = sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_expiresIn,
    });

    return {
      access_token,
      refresh_token,
    };
  } catch (err) {
    if (err.name == "EntityNotFound") throw new CustomError({ status: 401, message: "Email is invalid." });
    throw err;
  }
};

//MM-3
const signup = async (body: any) => {
  try {
    const user = UserRepo.create();
    user.first_name = body.first_name;
    user.last_name = body.last_name;
    user.email = body.email;
    user.password = await hash(body.password, Number(process.env.BCRYPT_ROUNDS));
    user.type = body.type;
    user.birthdate = body.birthdate;
    await UserRepo.save(user);
    return "Signed up Successfully";
  } catch (err) {
    if (err.code == "ER_DUP_ENTRY") throw new CustomError({ status: 409, message: "Email already exist." });
    throw err;
  }
};

//MM-3
const refreshToken = async (body: any) => {
  try {
    const rToken = body.refresh_token;
    const { userId, type } = <any>verify(rToken, process.env.JWT_REFRESH_SECRET);
    const payload = { userId, type };
    const access_token = sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_expiresIn });
    const refresh_token = sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_expiresIn,
    });
    return {
      access_token,
      refresh_token,
    };
  } catch (err) {
    if (err.name == "TokenExpiredError")
      throw new CustomError({ status: 401, message: "RefreshToken has been expired." });
    if (err.name == "JsonWebTokenError") throw new CustomError({ status: 401, message: "RefreshToken is invalid." });

    throw err;
  }
};

export default { login, signup, refreshToken };
