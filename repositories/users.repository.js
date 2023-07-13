const { Users } = require('../models');

class UserRepository {
  //중복 닉네임 확인
  findSameNickname = async (nickname) => {
    const findSameNicknameData = await Users.findOne({ where: { nickname } });

    return findSameNicknameData;
  };

  //회원가입
  userSignUp = async (nickname, password) => {
    const userSignUpData = await Users.create({ nickname, password });

    return userSignUpData;
  };

  //로그인
  userLogin = async (nickname) => {
    const userLoginData = await Users.findOne({ where: { nickname } });

    return userLoginData;
  };
}

module.exports = UserRepository;
