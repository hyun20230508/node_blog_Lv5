const UserRepository = require('../repositories/users.repository');
const jwt = require('jsonwebtoken');

class UserService {
  userRepository = new UserRepository();

  //회원가입
  userSignUp = async (nickname, password) => {
    const findSameNicknameData = await this.userRepository.findSameNickname(
      nickname
    );

    if (findSameNicknameData) {
      return '중복된 닉네임입니다.';
    }

    const userSignUpData = await this.userRepository.userSignUp(
      nickname,
      password
    );

    return {
      nickname: `${userSignUpData.nickname}으로 회원가입이 완료되었습니다.`,
    };
  };

  //로그인
  userLogin = async (nickname, password) => {
    const userLoginData = await this.userRepository.userLogin(nickname);

    if (!userLoginData) {
      return { message: '존재하지 않는 닉네임입니다.' };
    } else if (userLoginData.password !== password) {
      return { message: '비밀번호가 일치하지 않습니다.' };
    }

    const token = jwt.sign(
      {
        userId: userLoginData.userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    return token;
  };
}

module.exports = UserService;
